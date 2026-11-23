// Wysyłka leadów do CRM (lead-intake). Kształt payloadu zgodny z dotychczasowym kontraktem
// (form_key / contact / answers / attribution / consents / is_test / hp) + pole event_id jako klucz idempotencji.
// Nowe wartości form_key i nowe klucze w `answers` trzeba dodać po stronie crm.budaro.pl przed uruchomieniem.

const ENDPOINT = import.meta.env.PUBLIC_LEAD_ENDPOINT as string | undefined;
const KEY = import.meta.env.PUBLIC_LEAD_KEY as string | undefined;

export type LeadInput = {
  formKey: string;
  contact: { first_name: string; phone?: string | null; email?: string | null; postal_code?: string | null; city?: string | null };
  answers: Record<string, unknown>;
  segment?: 'hot' | 'warm' | 'nurture';
  consentText: string;
  hp?: string;
};

export function normalizePhone(raw: string): string | null {
  let d = raw.replace(/[^\d+]/g, '');
  if (d.startsWith('00')) d = '+' + d.slice(2);
  if (d.startsWith('+')) return /^\+\d{9,14}$/.test(d) ? d : null;
  if (/^48\d{9}$/.test(d)) return '+' + d;
  return /^[4-8]\d{8}$/.test(d) ? '+48' + d : null;
}
export const validEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e.trim());

function cookie(name: string) {
  const m = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'));
  return m ? decodeURIComponent(m[1]) : null;
}

function attribution() {
  let a: Record<string, unknown> = {};
  try { a = JSON.parse(sessionStorage.getItem('budaro_attr') || '{}'); } catch {}
  return {
    ...a,
    page_url: location.origin + location.pathname, // bez parametrów: w URL nigdy nie ma danych osobowych
    fbp: cookie('_fbp'), fbc: cookie('_fbc'),
    session_id: sessionStorage.getItem('budaro_session_id'),
  };
}

async function post(body: unknown, timeout = 8000) {
  const ctl = new AbortController();
  const t = setTimeout(() => ctl.abort(), timeout);
  try {
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    if (KEY) { headers.apikey = KEY; headers.Authorization = `Bearer ${KEY}`; }
    return await fetch(ENDPOINT!, { method: 'POST', headers, body: JSON.stringify(body), signal: ctl.signal });
  } finally { clearTimeout(t); }
}

export type LeadResult = { ok: true; eventId: string; demo: boolean } | { ok: false; reason: 'rejected' | 'network'; eventId: string };

/** Zwraca ok dopiero wtedy, gdy CRM potwierdził przyjęcie (2xx). 4xx = odrzucenie, nie sukces. */
export async function sendLead(input: LeadInput): Promise<LeadResult> {
  const eventId = 'lead_' + Date.now() + '_' + Math.random().toString(36).slice(2, 10);
  const payload = {
    form_key: input.formKey,
    event_id: eventId,
    contact: { ...input.contact, preferred_channel: input.contact.phone ? 'phone' : 'email' },
    answers: { ...input.answers, segment: input.segment ?? null },
    attribution: attribution(),
    consents: [{ key: 'contact', granted: true, text_version: '2026-11', text: input.consentText }],
    is_test: !/(^|\.)budaro\.pl$/.test(location.hostname),
    hp: input.hp ?? '',
  };
  if (input.hp) return { ok: true, eventId, demo: true }; // pole-pułapka wypełnione = bot, nic nie wysyłamy
  if (!ENDPOINT) {
    console.info('[budaro] tryb demo, lead nie został wysłany:', payload);
    return { ok: true, eventId, demo: true };
  }
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const r = await post(payload);
      if (r.ok) return { ok: true, eventId, demo: false };
      if (r.status >= 400 && r.status < 500 && r.status !== 429) return { ok: false, reason: 'rejected', eventId };
    } catch {}
    await new Promise((res) => setTimeout(res, 1200 * (attempt + 1)));
  }
  return { ok: false, reason: 'network', eventId };
}

export function track(event: string, data: Record<string, unknown> = {}) {
  ((window as any).dataLayer = (window as any).dataLayer || []).push({ event, ...data });
}

/** Konwersja wysyłana dopiero po potwierdzeniu przez CRM, z segmentem — żeby reklamy uczyły się na dobrych leadach. */
export function trackLead(eventId: string, formKey: string, segment: string, value: number, demo: boolean) {
  if (demo && !/(^|\.)budaro\.pl$/.test(location.hostname)) { track('budaro_lead_test', { lead_event_id: eventId, form_key: formKey, lead_segment: segment }); return; }
  track('budaro_lead', { lead_event_id: eventId, form_key: formKey, lead_segment: segment, value, currency: 'PLN' });
  const fbq = (window as any).fbq;
  if (typeof fbq === 'function') fbq('track', segment === 'nurture' ? 'Subscribe' : 'Lead', { content_name: formKey, value, currency: 'PLN' }, { eventID: eventId });
}
