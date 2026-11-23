// Lead magnety. Nowy materiał: dopisz wpis tutaj i treść w magnetContent.ts, potem `npm run build && npm run pdf && npm run build`.
export type Stage = 'dzialka' | 'wybor' | 'finanse';
export const stages: Record<Stage, { title: string; lead: string }> = {
  dzialka: { title: 'Szukam działki albo ją przygotowuję', lead: 'Zanim kupisz grunt i zanim przyjedzie dźwig.' },
  wybor: { title: 'Wybieram dom i wykonawcę', lead: 'Żeby porównać oferty i nie przepłacić.' },
  finanse: { title: 'Formalności, umowa i finansowanie', lead: 'Papier, bank i urząd.' },
};
type Magnet = { title: string; pitch: string; bullets: string[]; stage: Stage; featured?: boolean };
const m = (x: Magnet) => x;

const list = {
  'checklista-dzialki': m({
    stage: 'dzialka', featured: true,
    title: 'Checklista: 12 rzeczy do sprawdzenia przed zakupem działki',
    pitch: 'Jedna strona, którą bierzesz na oglądanie działki. Plan miejscowy, dojazd, media, grunt i pułapki, przez które zgłoszenie się nie uda.',
    bullets: ['Co sprawdzić w planie miejscowym lub warunkach zabudowy', 'Jak ocenić dojazd dla transportu modułów i dźwigu', 'Media: co musi być przy granicy działki, a co da się obejść', 'Sygnały ostrzegawcze, przy których lepiej odpuścić zakup'],
  }),
  'przygotowanie-dzialki-do-montazu': m({
    stage: 'dzialka',
    title: 'Działka gotowa na montaż: lista przed przyjazdem dźwigu',
    pitch: 'Co musi być zrobione na działce, zanim przyjedzie transport z domem. Dojazd, miejsce na dźwig, prąd, woda i sąsiedzi.',
    bullets: ['Wymagania dla dojazdu ciężarówki i ustawienia dźwigu', 'Prąd i woda na czas budowy', 'Co uzgodnić z gminą i sąsiadami', 'Lista na dzień montażu'],
  }),
  'katalog-z-cenami': m({
    stage: 'wybor', featured: true,
    title: 'Katalog domów Budaro z cenami',
    pitch: 'Pięć modeli od 40 do 115 m², rzuty, parametry, zakres trzech pakietów i ceny netto oraz brutto w jednym pliku.',
    bullets: ['Ceny „od” wszystkich modeli, netto i brutto', 'Rzuty parteru i piętra', 'Co wchodzi w pakiet Podstawowy, Deweloperski i Deweloperski Plus', 'Warianty elewacji'],
  }),
  'rzuty-domow': m({
    stage: 'wybor',
    title: 'Rzuty wszystkich domów Budaro w jednym pliku',
    pitch: 'Dziesięć rzutów w dużym formacie do wydrukowania. Porównaj układy, narysuj meble i sprawdź, który dom pasuje do Twojej rodziny.',
    bullets: ['Rzuty parteru i piętra pięciu modeli', 'Powierzchnie i liczba pomieszczeń obok każdego rzutu', 'Miejsce na własne notatki', 'Format A4 do wydruku'],
  }),
  'pytania-do-wykonawcy': m({
    stage: 'wybor', featured: true,
    title: '15 pytań, które zadaj każdej firmie od domów modułowych',
    pitch: 'Tabela do porównania trzech ofert. Pytania o cenę, termin, jakość i formalności, po których widać, kto ukrywa koszty.',
    bullets: ['Pytania, które odróżniają cenę „od” od ceny końcowej', 'Jak sprawdzić termin i karę za opóźnienie', 'Na co patrzeć w konstrukcji i ociepleniu', 'Trzy kolumny na odpowiedzi: porównasz oferty na jednej kartce'],
  }),
  'budzet-inwestycji': m({
    stage: 'wybor',
    title: 'Budżet całej inwestycji: 27 pozycji, o których zapominają oferty',
    pitch: 'Arkusz do wypełnienia. Od notariusza po ogrodzenie, z zaznaczeniem, co jest w cenie domu Budaro, a co musisz doliczyć.',
    bullets: ['Koszty przed budową, przyłącza, budynek, otoczenie, po budowie', 'Kolumna „w cenie Budaro” przy każdej pozycji', 'Miejsce na Twoje kwoty i sumę', 'Pozycje, które najczęściej rozbijają budżet'],
  }),
  'formalnosci-krok-po-kroku': m({
    stage: 'finanse',
    title: 'Formalności krok po kroku: dom na zgłoszenie do 70 m²',
    pitch: 'Lista dokumentów, kolejność działań i terminy urzędowe. Od wypisu z planu miejscowego po zawiadomienie o zakończeniu budowy.',
    bullets: ['Jakie dokumenty składasz i w którym urzędzie', 'Kiedy potrzebne są warunki zabudowy', 'Ile realnie trwa każdy etap', 'Co bierzemy na siebie, a co musisz podpisać sam'],
  }),
  'umowa-z-wykonawca': m({
    stage: 'finanse',
    title: '10 zapisów, które musi mieć umowa na budowę domu',
    pitch: 'Lista kontrolna do przeczytania przed podpisem. Cena, termin, kary, odbiory, gwarancja i zwrot zaliczki.',
    bullets: ['Jak zapisać cenę, żeby nie rosła w trakcie', 'Termin i kary umowne, które da się wyegzekwować', 'Odbiory, gwarancja i usuwanie usterek', 'Kiedy możesz odstąpić i odzyskać zaliczkę'],
  }),
  'dokumenty-do-kredytu': m({
    stage: 'finanse',
    title: 'Kredyt na dom modułowy: lista dokumentów do banku',
    pitch: 'Komplet papierów, o które poprosi bank, w podziale na Ciebie, działkę i budowę. Z uwagami o transzach przy krótkiej budowie.',
    bullets: ['Dokumenty dochodowe, działki i budowy', 'Które z nich przygotowujemy za Ciebie', 'Jak ułożyć transze pod budowę trwającą tygodnie', 'Pytania do doradcy kredytowego'],
  }),
};

export type MagnetSlug = keyof typeof list;
export const magnets = Object.fromEntries(
  Object.entries(list).map(([slug, x]) => [slug, { ...x, file: `/pdf/budaro-${slug}.pdf` }]),
) as Record<MagnetSlug, Magnet & { file: string }>;
export const magnetSlugs = Object.keys(list) as MagnetSlug[];
