/* ===== Hasaki Clinic Suite — store dữ liệu khách (mock tập trung) =====
   Mục tiêu ver 2: mọi trang đọc CÙNG nguồn này thay vì hardcode lặp.
   Nối API thật = thay object CUSTOMERS bằng fetch().
   Khoá theo "đuôi số" trùng với hệ thống mã phiếu BK/TV/KH/RC/DV.
*/
const CUSTOMERS = {
  // Trần Thu Hà — đuôi 0825 (khách mặc định, VIP)
  'C-1042': {
    id:'C-1042', code:'0825', name:'Trần Thu Hà', initials:'TH', avatarClass:'av-teal',
    gender:'Nữ', age:32, phone:'0908123456', sinceLabel:'03/2024', source:'giới thiệu',
    tier:'VIP', rank:'Hạng Vàng', persona:'Khách dễ tính',
    allergy:'Lidocaine, hương liệu paraben', dislike:'Không thích KTV nam',
    spendLabel:'38,4tr', sessions:24, walletLabel:'4,5tr', consultant:'Quỳnh Trang', consultantInit:'QT',
    tickets:{ bk:'BK-0825', tv:'TV-0825', kh:'KH-0825', rc:'RC-0825', dv:'DV-0825' },
    todayService:'Giảm béo RF bụng · buổi 1/10', room:'Slim 1', staff:'KTV Hồng Trang',
  },
  // Lê Minh — đuôi 0830
  'C-1080': {
    id:'C-1080', code:'0830', name:'Lê Minh', initials:'LM', avatarClass:'av-indigo',
    gender:'Nam', age:41, phone:'0912880830', sinceLabel:'06/2024', source:'Facebook Ads',
    tier:'Thân thiết', rank:'Hạng Bạc', persona:'Cẩn thận, hỏi kỹ',
    allergy:'Không ghi nhận', dislike:'Ngại đông người',
    spendLabel:'17,2tr', sessions:11, walletLabel:'1,0tr', consultant:'Quỳnh Trang', consultantInit:'QT',
    tickets:{ bk:'BK-0830', tv:'TV-0830', kh:'KH-0830', rc:'RC-0830', dv:'DV-0830' },
    todayService:'Triệt lông Diode · buổi 1/8', room:'Laser 2', staff:'KTV Thanh Mai',
  },
  // Ngô Khánh — đuôi 0836
  'C-1136': {
    id:'C-1136', code:'0836', name:'Ngô Khánh', initials:'NK', avatarClass:'av-gold',
    gender:'Nữ', age:28, phone:'0987650836', sinceLabel:'01/2025', source:'walk-in',
    tier:'Mới', rank:'Hạng Đồng', persona:'Cần tư vấn nhiều',
    allergy:'Da nhạy cảm vùng mặt', dislike:'—',
    spendLabel:'6,4tr', sessions:3, walletLabel:'0đ', consultant:'Quỳnh Trang', consultantInit:'QT',
    tickets:{ bk:'BK-0836', tv:'TV-0836', kh:'KH-0836', rc:'RC-0836', dv:'DV-0836' },
    todayService:'Tư vấn — chờ gặp bác sĩ trước', room:'—', staff:'—',
  },
};

// Tra khách theo ?id=  (mặc định Trần Thu Hà nếu thiếu/không khớp → giữ tương thích trang cũ)
function getCustomer(){
  const id = (typeof getParam==='function') ? getParam('id') : null;
  return (id && CUSTOMERS[id]) ? CUSTOMERS[id] : CUSTOMERS['C-1042'];
}
// Sinh href có gắn ?id= để các trang "đi xuyên" theo cùng 1 khách
function linkFor(page, cust){
  const c = cust || getCustomer();
  return page + '?id=' + encodeURIComponent(c.id);
}
