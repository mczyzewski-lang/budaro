// Jedno źródło prawdy o firmie i ofercie. Liczby pochodzą ze starej strony budaro.pl i obecnego landingu.
export const site = {
  name: 'Budaro',
  url: 'https://budaro.pl',
  legalName: 'AV Modules Sp. z o.o.',
  nip: '7831874633',
  street: 'ul. Szewska 7',
  city: 'Gowarzewo',
  postal: '63-004 Tulce',
  region: 'Wielkopolskie',
  // hala produkcyjna / siedziba — punkt odniesienia dla odległości transportu
  geo: { lat: 52.372, lon: 17.103 },
  phone: '+48 736 441 555',
  phoneHref: '+48736441555',
  email: 'l.gruszkiewicz@budaro.pl',
  advisor: { name: 'Łukasz Gruszkiewicz', role: 'Specjalista ds. domów modułowych' },
  stats: {
    houses: '200+',
    rating: '5,0',
    warrantyYears: 25,
    assemblyDays: '3–4',
    prefab: '95%',
  },
  guarantee: {
    days: 90,
    penalty: '1000 zł',
    short: '90 dni albo 1000 zł za każdy dzień opóźnienia',
    long: 'Dom oddajemy w 90 dni od skompletowania formalności. Za każdy dzień opóźnienia płacimy 1000 zł.',
  },
  // AKTUALIZUJ RĘCZNIE: najbliższy miesiąc z wolnymi terminami realizacji. Musi być prawdziwy.
  nextSlot: 'styczeń 2027',
  // założenie do kalkulatora czynszu: typowa budowa tradycyjna vs nasz termin (w miesiącach)
  traditionalMonths: 18, ourMonths: 5,
  priceFrom: 229635,
  vat: 0.08,
};

export const zl = (n: number) => n.toLocaleString('pl-PL').replace(/ /g, ' ') + ' zł';
export const brutto = (n: number) => Math.round(n * (1 + site.vat));
