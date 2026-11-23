// Realizacje wymienione na budaro.pl/realizacje. Współrzędne przybliżone (środek miejscowości).
// geo: null = nazwa miejscowości niejednoznaczna, wymaga potwierdzenia gminy przed użyciem w wyliczeniach.
export const realizations = [
  { model: 'Heaven', place: 'Legnica', loc: 'w Legnicy', woj: 'dolnośląskie', geo: { lat: 51.207, lon: 16.155 } },
  { model: 'Family', place: 'Skwierzyna', loc: 'w Skwierzynie', woj: 'lubuskie', geo: { lat: 52.599, lon: 15.505 } },
  { model: 'Heaven', place: 'Człuchów', loc: 'w Człuchowie', woj: 'pomorskie', geo: { lat: 53.667, lon: 17.359 } },
  { model: 'Heaven', place: 'Grodków', loc: 'w Grodkowie', woj: 'opolskie', geo: { lat: 50.698, lon: 17.384 } },
  { model: 'Heaven', place: 'Zamienice', loc: 'w Zamienicach', woj: 'dolnośląskie', geo: { lat: 51.333, lon: 15.983 } },
  { model: 'Family', place: 'Parlin', loc: 'w Parlinie', woj: '', geo: null },
  { model: 'Heaven', place: 'Trzebnica', loc: 'w Trzebnicy', woj: 'dolnośląskie', geo: { lat: 51.310, lon: 17.063 } },
  { model: 'Heaven', place: 'Leoncin', loc: 'w Leoncinie', woj: 'mazowieckie', geo: { lat: 52.397, lon: 20.553 } },
  { model: 'Oasis', place: 'Czerwonak', loc: 'w Czerwonaku', woj: 'wielkopolskie', geo: { lat: 52.464, lon: 16.981 } },
  { model: 'Heaven', place: 'Waplewo', loc: 'w Waplewie', woj: '', geo: null },
  { model: 'Oasis', place: 'Jeżów Sudecki', loc: 'w Jeżowie Sudeckim', woj: 'dolnośląskie', geo: { lat: 50.940, lon: 15.741 } },
];

export function km(a: { lat: number; lon: number }, b: { lat: number; lon: number }) {
  const R = 6371, r = Math.PI / 180;
  const dLat = (b.lat - a.lat) * r, dLon = (b.lon - a.lon) * r;
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(a.lat * r) * Math.cos(b.lat * r) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

export function nearestRealization(p: { lat: number; lon: number }) {
  return realizations
    .filter((r) => r.geo)
    .map((r) => ({ ...r, km: Math.round(km(p, r.geo!)) }))
    .sort((a, b) => a.km - b.km)[0];
}
