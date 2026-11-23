# Budaro — strona www

Statyczny serwis (Astro + Tailwind): strona główna, modele z cenami, quiz wyceny, poradnik, lead magnety i strony lokalne „Domy modułowe {miasto}”.

## Uruchomienie

```bash
npm install
npm run dev        # podgląd na http://localhost:4321
npm run build      # gotowa strona w dist/
npm run pdf        # po buildzie: generuje PDF-y lead magnetów do public/pdf/ (potem ponownie build)
```

## Konfiguracja (`.env`, wzór w `.env.example`)

- `PUBLIC_LEAD_ENDPOINT` — adres funkcji `lead-intake` w CRM. **Bez niego formularze działają w trybie demo i nie wysyłają leadów.**
- `PUBLIC_LEAD_KEY` — opcjonalny klucz publiczny endpointu.
- `PUBLIC_GTM_ID` — kontener GTM.

## Gdzie co zmienić

| Co | Plik |
|---|---|
| Telefon, dane firmy, gwarancja, liczby | `src/data/site.ts` |
| Modele, ceny, pakiety | `src/data/models.ts` |
| Miasta i urzędy (nowe miasto = nowy wiersz) | `src/data/cities.ts` |
| Realizacje (podstawa „najbliższa realizacja X km”) | `src/data/realizations.ts` |
| Opinie, zespół, proces, FAQ | `src/data/proof.ts` |
| Artykuły (nowy plik `.md` = nowy artykuł) | `src/content/poradnik/` |
| Lead magnety: opisy / treść PDF | `src/data/magnets.ts`, `src/pages/druk/[slug].astro` |
| Quiz | `src/components/Quiz.astro`, wysyłka: `src/scripts/lead.ts` |
| Landingi reklamowe | `src/pages/lp/google.astro`, `src/pages/lp/meta.astro` |

## Leady i pomiar

- Formularze: `quiz-v2` oraz `lead-magnet-{slug}` (pole `form_key`). Payload ma kształt dotychczasowego kontraktu CRM plus `event_id` i `answers.segment` (`hot` / `warm` / `nurture`).
- Sukces pokazujemy dopiero po odpowiedzi 2xx z CRM. Odpowiedź 4xx to błąd widoczny dla klienta.
- `dataLayer`: `quiz_start`, `quiz_step`, `quiz_complete`, `budaro_lead` (z `lead_segment` i `value`), `magnet_download`, `video_play`. Poza domeną budaro.pl w trybie demo leci `budaro_lead_test`.
