/* ===== Hasaki ClinicOS — store dữ liệu khách (đọc từ JSON) =====
   Dữ liệu thật: admin/data/customers.json
   data.js nạp JSON đó, giữ NGUYÊN API getCustomer / linkFor để các trang không phải sửa.
   Mở qua http(s):// → đọc customers.json. Mở file:// bị chặn → tự dùng FALLBACK inline.
   Nối API thật: trỏ DATA_URL sang endpoint trả JSON cùng cấu trúc.
   Khoá theo "đuôi số" trùng hệ thống mã phiếu BK/TV/KH/RC/DV.
*/
const DATA_URL = '../data/customers.json';

const CUSTOMERS_FALLBACK = {
  'C-1042': { id:'C-1042', code:'0825', name:'Tr\u1ea7n Thu H\u00e0', initials:'TH', avatarClass:'av-teal', gender:'N\u1eef', age:32, phone:'0908123456', sinceLabel:'03/2024', source:'gi\u1edbi thi\u1ec7u', tier:'VIP', rank:'H\u1ea1ng V\u00e0ng', persona:'Kh\u00e1ch d\u1ec5 t\u00ednh', allergy:'Lidocaine, h\u01b0\u01a1ng li\u1ec7u paraben', dislike:'Kh\u00f4ng th\u00edch KTV nam', spendLabel:'38,4tr', sessions:24, walletLabel:'4,5tr', consultant:'Qu\u1ef3nh Trang', consultantInit:'QT', tickets:{ bk:'BK-0825', tv:'TV-0825', kh:'KH-0825', rc:'RC-0825', dv:'DV-0825' }, todayService:'Gi\u1ea3m b\u00e9o RF b\u1ee5ng \u00b7 bu\u1ed5i 1/10', room:'Slim 1', staff:'KTV H\u1ed3ng Trang' },
  'C-1080': { id:'C-1080', code:'0830', name:'L\u00ea Minh', initials:'LM', avatarClass:'av-indigo', gender:'Nam', age:41, phone:'0912880830', sinceLabel:'06/2024', source:'Facebook Ads', tier:'Th\u00e2n thi\u1ebft', rank:'H\u1ea1ng B\u1ea1c', persona:'C\u1ea9n th\u1eadn, h\u1ecfi k\u1ef9', allergy:'Kh\u00f4ng ghi nh\u1eadn', dislike:'Ng\u1ea1i \u0111\u00f4ng ng\u01b0\u1eddi', spendLabel:'17,2tr', sessions:11, walletLabel:'1,0tr', consultant:'Qu\u1ef3nh Trang', consultantInit:'QT', tickets:{ bk:'BK-0830', tv:'TV-0830', kh:'KH-0830', rc:'RC-0830', dv:'DV-0830' }, todayService:'Tri\u1ec7t l\u00f4ng Diode \u00b7 bu\u1ed5i 1/8', room:'Laser 2', staff:'KTV Thanh Mai' },
  'C-1136': { id:'C-1136', code:'0836', name:'Ng\u00f4 Kh\u00e1nh', initials:'NK', avatarClass:'av-gold', gender:'N\u1eef', age:28, phone:'0987650836', sinceLabel:'01/2025', source:'walk-in', tier:'M\u1edbi', rank:'H\u1ea1ng \u0110\u1ed3ng', persona:'C\u1ea7n t\u01b0 v\u1ea5n nhi\u1ec1u', allergy:'Da nh\u1ea1y c\u1ea3m v\u00f9ng m\u1eb7t', dislike:'\u2014', spendLabel:'6,4tr', sessions:3, walletLabel:'0\u0111', consultant:'Qu\u1ef3nh Trang', consultantInit:'QT', tickets:{ bk:'BK-0836', tv:'TV-0836', kh:'KH-0836', rc:'RC-0836', dv:'DV-0836' }, todayService:'T\u01b0 v\u1ea5n \u2014 ch\u1edd g\u1eb7p b\u00e1c s\u0129 tr\u01b0\u1edbc', room:'\u2014', staff:'\u2014' },
};

let CUSTOMERS;
(function loadCustomers(){
  try {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', DATA_URL, false);
    xhr.send(null);
    if (xhr.status === 200 || xhr.status === 0) { CUSTOMERS = JSON.parse(xhr.responseText); }
    else { CUSTOMERS = CUSTOMERS_FALLBACK; }
  } catch (e) { CUSTOMERS = CUSTOMERS_FALLBACK; }
  if (!CUSTOMERS || !CUSTOMERS['C-1042']) CUSTOMERS = CUSTOMERS_FALLBACK;
})();

// Tra khách theo ?id= (mặc định Trần Thu Hà nếu thiếu/không khớp → giữ tương thích trang cũ)
function getCustomer(){
  const id = (typeof getParam==='function') ? getParam('id') : null;
  return (id && CUSTOMERS[id]) ? CUSTOMERS[id] : CUSTOMERS['C-1042'];
}
// Sinh href gắn ?id= để các trang "đi xuyên" theo cùng 1 khách
function linkFor(page, cust){
  const c = cust || getCustomer();
  return page + '?id=' + encodeURIComponent(c.id);
}
