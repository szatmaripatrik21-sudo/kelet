export const SITE = {
  name: 'Kelet Kávézó és Galéria',
  shortName: 'Kelet',
  tagline: 'Kávézó · Galéria · Brunch',
  address: '1114 Budapest, Bartók Béla út 29',
  phone: '+36201111111',
  phoneHref: 'tel:+36201111111',
  facebook: 'https://www.facebook.com/keletkavezo',
  googleMaps:
    'https://www.google.com/maps/search/?api=1&query=Kelet%20K%C3%A1v%C3%A9z%C3%B3%20%C3%A9s%20Gal%C3%A9ria%20Budapest%20Bart%C3%B3k%20B%C3%A9la%20%C3%BAt%2029',
  rating: '4.8',
  reviewCount: 72,
};

export const HOURS = [
  { days: 'Hétfő–szerda', hours: '7:30–22:00' },
  { days: 'Csütörtök–péntek', hours: '7:30–23:00' },
  { days: 'Szombat', hours: '9:00–23:00' },
  { days: 'Vasárnap', hours: '9:00–22:00' },
];

export const TRUST_CHIPS = [
  { label: `${SITE.rating} ★`, sub: `${SITE.reviewCount} értékelés` },
  { label: 'Nyitva késő estig', sub: 'Hétköznap 22:00-ig' },
  { label: 'Pet friendly', sub: 'Kisállat hozható' },
  { label: 'Vegán opciók', sub: 'Vegetáriánus is' },
];

export const MENU_CATEGORIES = [
  {
    id: 'kavek',
    label: 'Kávék',
    items: [
      { name: 'Espresso', price: '750 Ft' },
      { name: 'Dupla espresso', price: '1100 Ft' },
      { name: 'Hosszú kávé', price: '900 Ft' },
      { name: 'Cappuccino', price: '1300 Ft' },
      { name: 'Latte', price: '1450 Ft' },
      { name: 'Flat White', price: '1550 Ft' },
      { name: 'Cold Brew', price: '1000 Ft' },
      { name: 'Espresso Tonic', price: '1700 Ft' },
      { name: 'Matcha Latte', price: '1450 Ft' },
      { name: 'Chai Latte', price: '2200 Ft' },
    ],
  },
  {
    id: 'reggeli',
    label: 'Reggeli & brunch',
    items: [
      { name: 'Házi granola joghurttal', price: '2200 Ft' },
      { name: 'Indonéz mogyoróvajas grillszendvics', price: '2000 Ft' },
      { name: 'Füstölt harcsás grillszendvics', price: '2000 Ft' },
    ],
  },
  {
    id: 'foetelek',
    label: 'Főételek',
    items: [
      { name: 'Brokkolis cukkinikrémleves', price: '2350 Ft' },
      { name: 'Vöröslencse dahl', price: '4400 Ft' },
      { name: 'Laskagombás curry jázminrizzsel', price: '4500 Ft' },
    ],
  },
  {
    id: 'sutemenyek',
    label: 'Sütemények',
    items: [
      { name: 'Csokis banánkenyér', price: '1450 Ft' },
      { name: 'Áfonyás sajttorta', price: '1550 Ft' },
      { name: 'Túrókrémes máktorta', price: '1550 Ft' },
      { name: 'Maracujás torta', price: '1550 Ft' },
    ],
  },
];

export const BRAND_CARDS = [
  {
    eyebrow: '01',
    title: 'Kávé & reggeli',
    body: 'Espresso, flat white, matcha, házi granola és friss reggeli hangulat a nap indításához.',
    accent: '#C75B22',
  },
  {
    eyebrow: '02',
    title: 'Könyvek & galéria',
    body: 'Könyvespolcok, művészeti hangulat és nyugodt belső tér olvasáshoz, munkához vagy találkozókhoz.',
    accent: '#6F7755',
  },
  {
    eyebrow: '03',
    title: 'Esti borok & beszélgetések',
    body: 'Természetes borok, sütemények és hosszabb nyitvatartás azoknak, akik nem sietnek haza.',
    accent: '#E9A43A',
  },
];

// `img` is a real photo from /public; `gradient` stays as a graceful fallback
// tint behind the image (and while it loads).
export const GALLERY_CARDS = [
  { label: 'Terasz a Bartókon', sublabel: 'Utcai ülőhelyek', img: '/hero-01-exterior-sign.jpg', gradient: 'linear-gradient(145deg, #C75B22, #E9A43A)' },
  { label: 'Könyves belső tér', sublabel: 'Polcok & meleg fény', img: '/hero-02-book-wall-interior.jpg', gradient: 'linear-gradient(145deg, #2C1810, #6B4226)' },
  { label: 'Specialty kávé', sublabel: 'Flat white & matcha', img: '/hero-03-coffee-latte.jpg', gradient: 'linear-gradient(145deg, #8B5332, #C9956E)' },
  { label: 'Brunch & sütemények', sublabel: 'Friss fogások', img: '/hero-04-brunch-plate.jpg', gradient: 'linear-gradient(145deg, #6F7755, #C4A47A)' },
  { label: 'Esti hangulat', sublabel: 'Borok & fények', img: '/hero-05-evening-gallery.png', gradient: 'linear-gradient(145deg, #2E0E1A, #8B4A6E)' },
  { label: 'Galéria részletek', sublabel: 'Kiállítási tér', img: '/hero-02-book-wall-interior.jpg', gradient: 'linear-gradient(145deg, #3A2117, #C75B22)' },
];

export const REVIEWS = [
  {
    text: 'Nagyon hangulatos, kellemes hely. Könyvek, képek, kiváló kávé.',
    source: 'Google értékelés',
  },
  {
    text: 'Vendégek kedvence: a hangulat, a sütemények és a kávé minősége egészen kivételes.',
    source: 'Google értékelés',
  },
  {
    text: 'Bartók Béla úti találkozóhely reggeltől estig. Mindig visszatérek.',
    source: 'Google értékelés',
  },
];
