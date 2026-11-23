// Parametry i ceny "od" ze starej strony budaro.pl (pakiet Podstawowy, netto + 8% VAT).
// Dom parterowy Modern Harmony 59 pominięty celowo — pozycjonowanie: domy z piętrem / antresolą.
export type Model = {
  slug: string; name: string; size: number; type: 'pietrowy' | 'antresola';
  priceFrom: number; tagline: string; desc: string; forWhom: string;
  footprint: string; usable: string; total: string; rooms: string; height: string; roof: string;
  permit: string; images: string[]; plans: { label: string; file: string }[]; video?: string;
};

export const models: Model[] = [
  {
    slug: 'modern-oasis-40', name: 'Modern Oasis', size: 40, type: 'antresola', priceFrom: 229635,
    tagline: 'Kompaktowy dom z antresolą',
    desc: 'Ponad 5 metrów wysokości do szczytu i duże okno na antresoli sprawiają, że 35 m² zabudowy wydaje się znacznie większe. Układ w trzech wersjach: 1-pokojowy lub 2-pokojowy z antresolą.',
    forWhom: 'Dla singla lub pary, jako dom rekreacyjny albo pod wynajem.',
    footprint: 'do 35 m²', usable: '31–33 m²', total: '40,7 m²', rooms: '1–2 + antresola', height: '5,62 m', roof: '45°',
    permit: 'do 35 m² zabudowy',
    images: ['oasis-1', 'oasis-2', 'oasis-3', 'oasis-4'],
    plans: [{ label: 'Parter', file: 'modernoasis-rzut-parter' }, { label: 'Antresola', file: 'modernoasis-rzut-antresola' }],
  },
  {
    slug: 'modern-family-53', name: 'Modern Family', size: 53, type: 'pietrowy', priceFrom: 234635,
    tagline: 'Do 3 sypialni na 35 m² zabudowy',
    desc: 'Od 3 do 5 pomieszczeń na dwóch kondygnacjach. Pokoje na górze możesz przeznaczyć na pokój dziecka, gabinet albo pokój gościnny. Duże okna wpuszczają dużo światła.',
    forWhom: 'Dla pary lub małej rodziny, która potrzebuje osobnych pokoi.',
    footprint: 'do 35 m²', usable: '44–47 m²', total: '53,3 m²', rooms: '3–5', height: '6,78 m', roof: '45°',
    permit: 'do 35 m² zabudowy',
    images: ['family-1', 'family-3', 'family-2', 'family-4', 'family-5'],
    plans: [{ label: 'Parter', file: 'modernfamily-rzut-parter' }, { label: 'Poddasze', file: 'modernfamily-rzut-poddasze' }],
  },
  {
    slug: 'modern-heaven-63', name: 'Modern Heaven', size: 63, type: 'pietrowy', priceFrom: 229635,
    tagline: 'Otwarte piętro z ogromnym oknem',
    desc: 'Salon z aneksem na parterze (26 m²) i prawie 30 m² otwartej przestrzeni na piętrze. Panoramiczne drzwi tarasowe na dole, wielkie okno szczytowe na górze. Od 3 do 5 pomieszczeń.',
    forWhom: 'Dla osób, które lubią otwartą przestrzeń i dużo światła.',
    footprint: 'do 35 m²', usable: '47–49 m²', total: '63 m²', rooms: '3–5', height: '6,72 m', roof: '45°',
    permit: 'do 35 m² zabudowy',
    images: ['heaven-1', 'heaven-4', 'heaven-3', 'heaven-2', 'heaven-5'],
    plans: [{ label: 'Parter', file: 'modernheaven-rzut-parter' }, { label: 'Poddasze', file: 'modernheaven-rzut-poddasze' }],
  },
  {
    slug: 'modern-harmony-83', name: 'Modern Harmony', size: 83, type: 'pietrowy', priceFrom: 333300,
    tagline: 'Pełnowymiarowy dom dla rodziny',
    desc: 'Prawie 75 m² powierzchni użytkowej, od 6 do 9 pomieszczeń. Jasna strefa dzienna z wyjściem na taras i wydzielona część nocna na piętrze. Cztery warianty układu.',
    forWhom: 'Dla rodziny 2+1 lub 2+2 jako główny dom do życia.',
    footprint: '52,8 m²', usable: '74,65 m²', total: '83 m²', rooms: '6–9', height: '7,4 m', roof: '45°',
    permit: 'do 70 m² zabudowy',
    images: ['harmony-1', 'harmony-2', 'harmony-3', 'harmony-4'],
    plans: [{ label: 'Parter', file: 'modernharmony83-rzut-parter' }, { label: 'Piętro', file: 'modernharmony83-rzut-pietro' }],
  },
  {
    slug: 'modern-harmony-115', name: 'Modern Harmony XL', size: 115, type: 'pietrowy', priceFrom: 400500,
    tagline: 'Największy dom na zgłoszenie',
    desc: '105 m² powierzchni użytkowej przy 70 m² zabudowy, czyli maksimum tego, co można postawić na zgłoszenie. Od 8 do 10 pomieszczeń, duże przeszklenia i szerokie drzwi tarasowe.',
    forWhom: 'Dla większej rodziny, która nie chce kompromisów w metrażu.',
    footprint: '70 m²', usable: '105 m²', total: '105–115 m²', rooms: '8–10', height: '7,19 m', roof: '40°',
    permit: 'do 70 m² zabudowy',
    images: ['harmony-xl-1', 'harmony-xl-2'],
    plans: [{ label: 'Parter', file: 'modernharmony115-rzut-parter' }, { label: 'Poddasze', file: 'modernharmony115-rzut-poddasze' }],
  },
];

export const modelBySlug = (s: string) => models.find((m) => m.slug === s)!;
export const fullName = (m: Model) => `${m.name} ${m.size} m²`;

// Zakres pakietów — lista pozycji ze starej strony. DO POTWIERDZENIA: podział pozycji między pakiety
// odtworzony z kolejności tabeli, bo stara strona nie pokazuje go w tekście.
export const packages = [
  { key: 'podstawowy', name: 'Podstawowy', short: 'Dom zamknięty i wykończony z zewnątrz',
    items: ['Dokumentacja projektowa', 'Transport na terenie całej Polski', 'Płyta fundamentowa', 'Konstrukcja domu', 'Montaż', 'Pokrycie dachowe', 'Stolarka okienna', 'Drzwi wejściowe', 'Elewacja'] },
  { key: 'deweloperski', name: 'Deweloperski', short: 'Dodatkowo ściany działowe i instalacje',
    items: ['Wszystko z pakietu Podstawowego', 'Ściany działowe', 'Instalacja elektryczna', 'Instalacja wodno-kanalizacyjna', 'Płyta GK'] },
  { key: 'deweloperski-plus', name: 'Deweloperski Plus', short: 'Dodatkowo ogrzewanie, wylewka i schody',
    items: ['Wszystko z pakietu Deweloperskiego', 'Klimatyzacja', 'Maty grzewcze na parterze', 'Wylewka', 'Szpachlowanie', 'Schody'] },
];

export const facades = [
  { key: 'drewno', name: 'Świerk impregnowany', img: 'drewniana', desc: 'Naturalna deska, w cenie podstawowej.' },
  { key: 'blacha', name: 'Blacha na rąbek', img: 'blacha', desc: 'Nowoczesna, w kolorze wybranym przez Ciebie.' },
  { key: 'tynk', name: 'Tynk silikonowy', img: 'tynk', desc: 'Klasyczny, w standardzie biały.' },
];
