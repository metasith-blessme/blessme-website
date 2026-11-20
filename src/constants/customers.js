// วิธีเพิ่มร้าน: เติม object ด้านล่างเมื่อมีชื่อร้านจริงและโลโก้ที่ร้านอนุญาตให้ลง
// Do not invent a shop, a logo, or a link.
// id            slug
// nameTh        ชื่อร้าน
// nameEn        English name
// provinceTh    จังหวัด
// provinceEn    province
// address       ที่อยู่ไปรษณีย์ภาษาไทย ใช้ทั้งสองภาษา
// lat           latitude
// lng           longitude
// mapsUrl       Google Maps search URL
// logo          webp path
// logoFallback  png path
// logoWidth     pixel width
// logoHeight    pixel height
// links         { kind: facebook | website | shop, href } ป้ายชื่ออยู่ที่หน้าเพจ
export const CUSTOMERS = [
  {
    id: 'anachak-banjuphan',
    nameTh: 'อาณาจักร บรรจุภัณฑ์',
    nameEn: 'Anajak Bunjuphan',
    provinceTh: 'พิจิตร',
    provinceEn: 'Phichit',
    address: '199/1, 199/2 หมู่ที่ 8 ต.ท่าหลวง อ.เมืองพิจิตร จ.พิจิตร 66000',
    lat: 16.4285602,
    lng: 100.3612671,
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=อาณาจักร+บรรจุภัณฑ์&query_place_id=ChIJzwlPcVLl3zAREi0sblvNadA',
    logo: '/assets/customers/anachak-banjuphan.webp',
    logoFallback: '/assets/customers/anachak-banjuphan.png',
    logoWidth: 287,
    logoHeight: 320,
    links: [
      { kind: 'facebook', href: 'https://www.facebook.com/profile.php?id=100063588685227' },
    ],
  },
  {
    id: 'puenkrua-cm-bakermart',
    nameTh: 'เพื่อนครัว',
    nameEn: 'Chiangmai Bakermart',
    provinceTh: 'เชียงใหม่',
    provinceEn: 'Chiang Mai',
    address: '104/8 หมู่ 6 ถ.เชียงใหม่-ลำพูน ต.หนองหอย อ.เมืองเชียงใหม่ จ.เชียงใหม่ 50000',
    lat: 18.7554986,
    lng: 99.0082681,
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=เพื่อนครัว+Chiangmai+Bakermart&query_place_id=ChIJE1msGlUx2jARsg8JYGc538s',
    logo: '/assets/customers/puenkrua-cm-bakermart.webp',
    logoFallback: '/assets/customers/puenkrua-cm-bakermart.png',
    logoWidth: 320,
    logoHeight: 320,
    links: [
      { kind: 'facebook', href: 'https://www.facebook.com/mybakermart' },
      { kind: 'shop', href: 'https://www.cmbakermart.biz' },
    ],
  },
  {
    id: 'giveme-food',
    nameTh: 'GiveMe Food',
    nameEn: 'GiveMe Food',
    provinceTh: 'กรุงเทพฯ',
    provinceEn: 'Bangkok',
    address: '202 ถนนศาลาธรรมสพน์ แขวงศาลาธรรมสพน์ เขตทวีวัฒนา กรุงเทพฯ 10170',
    lat: 13.7974489,
    lng: 100.3831852,
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=GiveMe+Food&query_place_id=ChIJEZ1MFX6X4jARk2tXjqzh7M8',
    logo: '/assets/customers/giveme-food.webp',
    logoFallback: '/assets/customers/giveme-food.png',
    logoWidth: 320,
    logoHeight: 320,
    links: [
      { kind: 'facebook', href: 'https://www.facebook.com/givemefood.official' },
      { kind: 'website', href: 'https://givemefoodth.com/' },
    ],
  },
  {
    id: 'yok-intertrade',
    nameTh: 'หยก อินเตอร์เทรด',
    nameEn: 'YOK Intertrade',
    provinceTh: 'เชียงใหม่ (สำนักงานใหญ่)',
    provinceEn: 'Chiang Mai (HQ)',
    address: '438/2 ถ.ซุปเปอร์ไฮเวย์ เชียงใหม่-ลำปาง ต.หนองป่าครั่ง อ.เมืองเชียงใหม่ 50000',
    lat: 18.7917404,
    lng: 99.023082,
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=หยกอินเตอร์เทรด&query_place_id=ChIJdYY4708l2jARI4ZBFZ_97j8',
    logo: '/assets/customers/yok-intertrade.webp',
    logoFallback: '/assets/customers/yok-intertrade.png',
    logoWidth: 320,
    logoHeight: 320,
    links: [
      { kind: 'website', href: 'https://www.yokintertrade.co.th/' },
      { kind: 'facebook', href: 'https://www.facebook.com/yokintertrade.official' },
    ],
  },
];
