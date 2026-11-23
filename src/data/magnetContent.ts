// Treść PDF-ów zbudowanych z prostych bloków (lista do odhaczenia albo tabela).
// Trzy starsze materiały (checklista działki, katalog, formalności) mają własne układy w pages/druk/[slug].astro.
import type { MagnetSlug } from './magnets';
export type Block =
  | { kind: 'check'; title: string; items: [string, string?][] }
  | { kind: 'table'; title?: string; cols: string[]; rows: string[][]; widths?: string[] }
  | { kind: 'note'; tone: 'sun' | 'navy'; title: string; text: string };
export type Doc = { heading: string; intro: string; blocks: Block[]; footnote?: string };

const B = '✓', D = 'Dew.', P = 'Dew. Plus', N = '—';

export const magnetContent: Partial<Record<MagnetSlug, Doc>> = {
  'pytania-do-wykonawcy': {
    heading: '15 pytań, które zadaj każdej firmie od domów modułowych',
    intro: 'Zadaj te same pytania trzem firmom i wpisz odpowiedzi obok siebie. Poproś o odpowiedzi na piśmie: to, czego firma nie chce napisać, zwykle nie znajdzie się też w umowie.',
    blocks: [
      { kind: 'table', title: 'Cena', cols: ['Pytanie', 'Firma A', 'Firma B', 'Firma C'], widths: ['46%', '18%', '18%', '18%'], rows: [
        ['1. Czy cena obejmuje fundament?'], ['2. Czy cena obejmuje transport i dźwig na moją działkę?'], ['3. Czy projekt i formalności w urzędzie są w cenie?'],
        ['4. Czy cena jest stała do końca budowy? W którym punkcie umowy?'], ['5. Czego cena NIE obejmuje? Poproś o listę na piśmie.'] ] },
      { kind: 'table', title: 'Termin', cols: ['Pytanie', 'Firma A', 'Firma B', 'Firma C'], widths: ['46%', '18%', '18%', '18%'], rows: [
        ['6. Jaki termin zakończenia wpisujecie do umowy i od czego jest liczony?'], ['7. Jaką karę płacicie za każdy dzień opóźnienia?'], ['8. Ile domów oddaliście w ostatnich 12 miesiącach? Mogę zobaczyć jeden z nich?'] ] },
      { kind: 'table', title: 'Jakość', cols: ['Pytanie', 'Firma A', 'Firma B', 'Firma C'], widths: ['46%', '18%', '18%', '18%'], rows: [
        ['9. Z jakiego drewna jest konstrukcja? Jest certyfikat i suszenie komorowe?'], ['10. Jaka jest grubość i rodzaj ocieplenia ścian i dachu?'], ['11. Ile lat gwarancji na konstrukcję i co dokładnie obejmuje?'], ['12. Kto przeprowadza odbiór końcowy?'] ] },
      { kind: 'table', title: 'Formalności i płatności', cols: ['Pytanie', 'Firma A', 'Firma B', 'Firma C'], widths: ['46%', '18%', '18%', '18%'], rows: [
        ['13. Kto przygotowuje i składa zgłoszenie w urzędzie?'], ['14. Jak wygląda harmonogram płatności? Ile wynosi pierwsza wpłata?'], ['15. Co z zaliczką, jeśli urząd albo warunki działki zablokują budowę?'] ] },
      { kind: 'note', tone: 'navy', title: 'Odpowiedzi Budaro', text: 'Fundament, transport, projekt i formalności są w cenie. Cena jest stała. Termin: 90 dni od skompletowania formalności, kara 1000 zł za każdy dzień opóźnienia. Gwarancja na konstrukcję: 25 lat. Odbiór z udziałem niezależnej firmy. Pozostałe odpowiedzi podamy na piśmie: +48 736 441 555.' },
    ],
  },
  'budzet-inwestycji': {
    heading: 'Budżet całej inwestycji: 27 pozycji, o których zapominają oferty',
    intro: 'Wpisz kwoty przy każdej pozycji, także zero, jeśli Cię nie dotyczy. Kolumna „Budaro” pokazuje, co jest w cenie naszego domu: ✓ pakiet Podstawowy, Dew. pakiet Deweloperski, Dew. Plus pakiet Deweloperski Plus, — poza zakresem.',
    blocks: [
      { kind: 'table', title: 'Przed budową', cols: ['Pozycja', 'Budaro', 'Twoja kwota'], widths: ['58%', '17%', '25%'], rows: [
        ['1. Zakup działki, notariusz, podatek, wpis do księgi wieczystej', N], ['2. Wypis i wyrys z planu miejscowego lub warunki zabudowy', B], ['3. Mapa do celów projektowych', B], ['4. Badania geotechniczne gruntu', B], ['5. Projekt i adaptacja do działki', B], ['6. Wyłączenie gruntu z produkcji rolnej, jeśli dotyczy', N] ] },
      { kind: 'table', title: 'Przyłącza i dojazd', cols: ['Pozycja', 'Budaro', 'Twoja kwota'], widths: ['58%', '17%', '25%'], rows: [
        ['7. Przyłącze prądu i linia od skrzynki do domu', N], ['8. Przyłącze wody albo studnia', N], ['9. Kanalizacja, szambo albo przydomowa oczyszczalnia', N], ['10. Zjazd z drogi i utwardzenie dojazdu', N] ] },
      { kind: 'table', title: 'Budynek', cols: ['Pozycja', 'Budaro', 'Twoja kwota'], widths: ['58%', '17%', '25%'], rows: [
        ['11. Płyta fundamentowa', B], ['12. Transport i dźwig', B], ['13. Konstrukcja, dach, okna, drzwi wejściowe, elewacja', B], ['14. Ściany działowe i płyty g-k', D], ['15. Instalacja elektryczna', D], ['16. Instalacja wodno-kanalizacyjna', D], ['17. Ogrzewanie i klimatyzacja', P], ['18. Wylewka i szpachlowanie', P], ['19. Schody', P], ['20. Podłogi, drzwi wewnętrzne, malowanie', N], ['21. Łazienka: płytki i armatura', N], ['22. Kuchnia: meble i sprzęt', N] ] },
      { kind: 'table', title: 'Otoczenie i po budowie', cols: ['Pozycja', 'Budaro', 'Twoja kwota'], widths: ['58%', '17%', '25%'], rows: [
        ['23. Taras', N], ['24. Podjazd i ogrodzenie', N], ['25. Odprowadzenie wody z dachu', N], ['26. Inwentaryzacja geodezyjna powykonawcza', N], ['27. Ubezpieczenie domu', N], ['RAZEM', '', ''] ] },
      { kind: 'note', tone: 'sun', title: 'Rezerwa', text: 'Do sumy dolicz rezerwę na nieprzewidziane wydatki. Najczęściej budżet rozbijają przyłącza (pozycje 7–9) i wykończenie wnętrz (pozycje 20–22), bo rzadko są w ofertach wykonawców.' },
    ],
    footnote: 'Podział pozycji między pakiety ma charakter poglądowy. Wiążący zakres znajduje się w wycenie i umowie.',
  },
  'przygotowanie-dzialki-do-montazu': {
    heading: 'Działka gotowa na montaż: lista przed przyjazdem dźwigu',
    intro: 'Dom przyjeżdża w gotowych elementach i staje w 3–4 dni, pod warunkiem że działka jest przygotowana. Tę listę przechodzimy z każdym klientem przed ustaleniem daty montażu.',
    blocks: [
      { kind: 'check', title: 'Dojazd', items: [
        ['Droga dojazdowa przejezdna dla ciężarówki z naczepą', 'Szerokość, nośność, promienie zakrętów. Wąskie gardła zgłoś nam wcześniej ze zdjęciami.'],
        ['Mostki i przepusty wytrzymają ciężki transport', 'Jeśli nie masz pewności, zapytaj w gminie albo u zarządcy drogi.'],
        ['Nad wjazdem nie ma nisko wiszących przewodów ani gałęzi', 'Gałęzie przytnij, kolizję z linią zgłoś operatorowi.'],
        ['Wjazd na działkę jest utwardzony', 'Po deszczu ciężki sprzęt grzęźnie w świeżym nasypie.'] ] },
      { kind: 'check', title: 'Plac montażu', items: [
        ['Jest miejsce na rozstawienie dźwigu obok płyty', 'Równy, nośny teren. Dokładne wymiary podajemy po wizji lokalnej.'],
        ['Jest miejsce na odstawienie elementów', 'Jeśli brakuje miejsca, planujemy dostawy etapami.'],
        ['Płyta fundamentowa osiągnęła nośność', 'Termin montażu ustalamy po upływie czasu wiązania.'],
        ['Wokół płyty nie leżą materiały ani ziemia z wykopu'] ] },
      { kind: 'check', title: 'Media na czas budowy', items: [
        ['Prąd budowlany albo agregat', 'Skrzynka z zabezpieczeniem w zasięgu przedłużacza od budynku.'],
        ['Dostęp do wody', 'Wystarczy hydrant ogrodowy albo zbiornik.'],
        ['Przepusty na przyłącza są wykonane w płycie', 'Sprawdzamy to na etapie fundamentu.'] ] },
      { kind: 'check', title: 'Formalności i otoczenie', items: [
        ['Zgłoszenie budowy jest złożone, a budynek wytyczony przez geodetę'],
        ['Uzgodnione zajęcie drogi, jeśli dźwig lub transport muszą na niej stanąć', 'Wniosek składa się u zarządcy drogi z wyprzedzeniem.'],
        ['Sąsiedzi wiedzą o terminie montażu', 'Kilka godzin utrudnionego przejazdu łatwiej przyjąć, gdy się o nim wie.'],
        ['Ktoś z Twojej strony będzie dostępny pod telefonem w dniu montażu'] ] },
      { kind: 'note', tone: 'navy', title: 'Nie masz pewności co do dojazdu?', text: 'Wyślij nam zdjęcia drogi i wjazdu. Ocenimy je bezpłatnie przed podpisaniem umowy: +48 736 441 555.' },
    ],
  },
  'umowa-z-wykonawca': {
    heading: '10 zapisów, które musi mieć umowa na budowę domu',
    intro: 'Przeczytaj umowę z tą listą w ręku, zanim cokolwiek podpiszesz i wpłacisz. Jeśli któregoś punktu brakuje, poproś o dopisanie.',
    blocks: [
      { kind: 'check', title: 'Zakres i cena', items: [
        ['1. Szczegółowy zakres prac i materiałów jako załącznik', 'Nie „dom pod klucz”, tylko lista: co, z czego, w jakim standardzie.'],
        ['2. Cena ryczałtowa i warunki jej zmiany', 'Zmiana ceny wyłącznie pisemnym aneksem podpisanym przez obie strony.'],
        ['3. Lista prac wyłączonych z ceny', 'Przyłącza, wykończenie, taras. To, czego nie ma na liście, powinno być w cenie.'] ] },
      { kind: 'check', title: 'Termin', items: [
        ['4. Termin zakończenia z jasnym punktem startu', 'Konkretna data albo liczba dni liczona od zdarzenia, które da się udokumentować.'],
        ['5. Kara umowna za każdy dzień opóźnienia', 'Kwota w złotych i sposób wypłaty lub potrącenia.'],
        ['6. Harmonogram płatności powiązany z etapami', 'Płacisz za wykonane etapy, a nie z góry za całość.'] ] },
      { kind: 'check', title: 'Jakość i odpowiedzialność', items: [
        ['7. Procedura odbioru etapów i odbioru końcowego', 'Protokół, prawo do udziału własnego inspektora, termin usunięcia usterek.'],
        ['8. Gwarancja: okres, zakres, tryb zgłaszania', 'Osobno dla konstrukcji, osobno dla instalacji i wykończenia.'],
        ['9. Kto odpowiada za formalności i co, jeśli urząd odmówi', 'Oraz co wtedy dzieje się z wpłaconymi pieniędzmi.'],
        ['10. Warunki odstąpienia od umowy i zwrotu zaliczki', 'Dla obu stron. Sprawdź też ubezpieczenie OC wykonawcy.'] ] },
      { kind: 'note', tone: 'sun', title: 'Jak to wygląda w umowie Budaro', text: 'Stała cena z załącznikiem zakresu. Termin 90 dni od skompletowania formalności i 1000 zł kary za każdy dzień opóźnienia. 25 lat gwarancji na konstrukcję. Odbiór z udziałem niezależnej firmy. Wzór umowy wysyłamy do przeczytania przed spotkaniem.' },
    ],
    footnote: 'Materiał informacyjny, nie stanowi porady prawnej. Przy wątpliwościach daj umowę do przeczytania prawnikowi.',
  },
  'dokumenty-do-kredytu': {
    heading: 'Kredyt na dom modułowy: lista dokumentów do banku',
    intro: 'Banki różnią się szczegółami, ale ten zestaw przyda się w każdym. Zbierz go przed pierwszą rozmową z doradcą, a decyzję dostaniesz szybciej.',
    blocks: [
      { kind: 'check', title: 'Ty i Twoje dochody', items: [
        ['Dokument tożsamości wszystkich kredytobiorców'],
        ['Zaświadczenie o zatrudnieniu i dochodach na druku banku', 'Przy działalności: PIT za ostatni rok, KPiR lub ewidencja, zaświadczenia z ZUS i US.'],
        ['Wyciągi z konta z ostatnich miesięcy', 'Bank poda, z ilu.'],
        ['Informacja o innych kredytach i limitach'] ] },
      { kind: 'check', title: 'Działka', items: [
        ['Numer księgi wieczystej', 'Bank sprawdzi odpis elektronicznie.'],
        ['Akt notarialny nabycia działki'],
        ['Wypis z rejestru gruntów i wyrys z mapy ewidencyjnej'],
        ['Wypis z planu miejscowego albo decyzja o warunkach zabudowy'] ] },
      { kind: 'check', title: 'Budowa', items: [
        ['Zgłoszenie budowy z potwierdzeniem złożenia w urzędzie', 'Część banków prosi dodatkowo o zaświadczenie z urzędu. Przygotowuje Budaro.'],
        ['Projekt budowlany', 'Przygotowuje Budaro.'],
        ['Kosztorys i harmonogram na druku banku', 'Wypełnia Budaro na podstawie umowy.'],
        ['Umowa z wykonawcą'],
        ['Dziennik budowy lub inny dokument wymagany przez bank do kontroli etapów'] ] },
      { kind: 'table', title: 'Pytania do doradcy kredytowego', cols: ['Pytanie', 'Odpowiedź'], widths: ['55%', '45%'], rows: [
        ['Czy bank finansuje domy w technologii szkieletowej na zgłoszenie?'], ['Ile transz i jak szybko po zgłoszeniu etapu bank robi inspekcję?'], ['Czy działka zostanie zaliczona jako wkład własny?'], ['Czy bank wypłaci transzę na etap produkcji w hali?'], ['Jaki jest termin na zakończenie budowy i rozliczenie kredytu?'] ] },
      { kind: 'note', tone: 'navy', title: 'Krótka budowa, inne transze', text: 'Dom modułowy powstaje w tygodnie, a harmonogramy bankowe pisano pod budowy trwające lata. Etapy płatności w umowie dopasowujemy do transz banku. Zadzwoń, zanim złożysz wniosek: +48 736 441 555.' },
    ],
    footnote: 'Wymagania zależą od banku i mogą się zmieniać. Materiał nie jest ofertą ani poradą finansową.',
  },
};
