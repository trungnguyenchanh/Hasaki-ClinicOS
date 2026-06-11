/* ===== Hasaki Clinic Suite — shared layout & helpers ===== */

/* --- shared helpers (gom về 1 chỗ, đừng định nghĩa lại trong từng trang) --- */
// Che SĐT chừa 4 số cuối → "••• ••• 3456"
function maskPhone(p){ return '\u2022\u2022\u2022 \u2022\u2022\u2022 ' + String(p||'').slice(-4); }
// Đọc tham số URL, vd getParam('id') cho trang ?id=C-1042
function getParam(name, fallback){
  try { const v = new URLSearchParams(location.search).get(name); return (v===null||v==='') ? (fallback ?? null) : v; }
  catch(e){ return fallback ?? null; }
}
// Nhân viên đang đăng nhập (mock — sau này lấy từ phiên đăng nhập thật)
const CURRENT_USER = { name:'Mai Anh', initials:'MA', role:'Quản lý CN', branch:'CN Quận 1' };

// Cụm điều hướng nghiệp vụ chung (ý 4): mọi trang cashier đi được tới
// Tư vấn · Pick thuốc · Gặp bác sĩ · Ra phiếu tổng hợp DV
function navCluster(cust){
  const q = cust ? ('?id='+encodeURIComponent(cust.id)) : '';
  const item = (href,label,path)=>`<a class="navc-item" href="${href}${q}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">${path}</svg>${label}</a>`;
  return `<div class="navc">
    ${item('consultant-survey.html','Trang tư vấn','<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>')}
    ${item('pharmacy-dispense.html','Pick thuốc','<rect x="3" y="4" width="18" height="14" rx="2"/><circle cx="9" cy="10" r="1.5"/><path d="M13 9h4M13 12h4"/>')}
    ${item('doctor.html','Gặp bác sĩ','<path d="M8 2v4M16 2v4M3 10h18"/><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M12 13v4M10 15h4"/>')}
    ${item('service-ticket.html','Phiếu tổng hợp DV','<path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>')}
  </div>`;
}

const NAV = [
  { group: "Tổng quan", items: [
    { id:"dashboard", label:"Dashboard", href:"../index.html", icon:'<rect x="3" y="3" width="7" height="9"/><rect x="14" y="3" width="7" height="5"/><rect x="14" y="12" width="7" height="9"/><rect x="3" y="16" width="7" height="5"/>' },
    { id:"booking", label:"Lịch & Booking", href:"booking.html", badge:"14", icon:'<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>' },
    { id:"customers", label:"Khách hàng", href:"customers.html", icon:'<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/>' },
  ]},
  { group: "Nghiệp vụ", items: [
    { id:"doctor", label:"Bác sĩ · Khám", href:"doctor-cn.html", badge:"6", icon:'<rect x="3" y="4" width="18" height="14" rx="2"/><path d="M8 21h8M12 18v3"/><circle cx="9" cy="10" r="1.5"/><path d="M13 9h4M13 12h4"/>' },
    { id:"consultant", label:"Tư vấn viên", href:"consultant-cn.html", icon:'<path d="M10 2v6l-3 3 3 3v6M14 2v6l3 3-3 3v6"/>' },
    { id:"cashier", label:"Cashier · Thu ngân", href:"cashier-cn.html", icon:'<rect x="2" y="6" width="20" height="13" rx="2"/><path d="M2 10h20M6 15h4"/>' },
    { id:"treatment", label:"Liệu trình", href:"treatment.html", icon:'<path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>' },
    { id:"warranty", label:"Bảo hành dịch vụ", href:"warranty.html", icon:'<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>' },
    { id:"dispatch", label:"Điều phối tua", href:"dispatch.html", badge:"5", icon:'<path d="M20 7l-8-4-8 4 8 4 8-4z"/><path d="M4 7v10l8 4 8-4V7"/>' },
    { id:"inventory", label:"Kho & Pha chế", href:"inventory.html", icon:'<path d="M3 3h18v4H3zM5 7v14h14V7M9 11h6"/>' },
    { id:"pharmacy", label:"Đơn thuốc · GPP", href:"pharmacy.html", badge:"3", icon:'<rect x="3" y="4" width="18" height="14" rx="2"/><path d="M8 21h8M12 18v3"/><circle cx="9" cy="10" r="1.5"/><path d="M13 9h4M13 12h4"/>' },
  ]},
  { group: "Quy trình tiếp khách", items: [
    { id:"reception", label:"Tiếp nhận khách", href:"reception.html", icon:'<path d="M3 21h18M5 21V7l8-4v18M19 21V11l-6-4"/><path d="M9 9v0M9 13v0M9 17v0"/>' },
    { id:"flow-tracking", label:"Tracking flow trong ngày", href:"flow-queue.html", badge:"12", icon:'<path d="M3 12h4l3-8 4 16 3-8h4"/>' },
  ]},
  { group: "Danh mục (Catalog)", items: [
    { id:"protocol-catalog", label:"Danh mục phác đồ", href:"protocol-catalog.html", icon:'<path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>' },
    { id:"catalog-service", label:"Dịch vụ", href:"catalog-service.html", icon:'<path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>' },
    { id:"catalog-machine", label:"Máy móc · Thiết bị", href:"catalog-machine.html", icon:'<rect x="4" y="4" width="16" height="16" rx="2"/><path d="M9 9h6v6H9z"/><path d="M9 2v2M15 2v2M9 20v2M15 20v2M2 9h2M2 15h2M20 9h2M20 15h2"/>' },
    { id:"catalog-skill", label:"Kỹ năng (Skill)", href:"catalog-skill.html", icon:'<path d="M12 2 2 7l10 5 10-5z"/><path d="M2 17l10 5 10-5M2 12l10 5 10-5"/>' },
    { id:"catalog-step", label:"Bước liệu trình", href:"catalog-step.html", icon:'<path d="M4 6h16M4 12h16M4 18h10"/>' },
    { id:"catalog-material", label:"Định biên NVL", href:"catalog-material.html", icon:'<path d="M9 3h6v4l4 9a3 3 0 0 1-3 4H8a3 3 0 0 1-3-4l4-9z"/><path d="M7 14h10"/>' },
  ]},
  { group: "Quản trị", items: [
    { id:"reports", label:"Báo cáo & KPI", href:"reports.html", icon:'<path d="M18 20V10M12 20V4M6 20v-6"/>' },
    { id:"staff", label:"Nhân sự & Học việc", href:"staff.html", icon:'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13A4 4 0 0 1 16 11"/>' },
    { id:"sitemap", label:"Sơ đồ trang (Sitemap)", href:"sitemap.html", icon:'<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>' },
  ]},
];

function renderLayout(activeId, opts = {}) {
  const fromRoot = opts.fromRoot; // index.html at root
  const sidebar = document.querySelector('.sidebar');
  const fix = h => fromRoot ? h.replace('../index.html','index.html').replace(/href="([a-z])/g,'href="pages/$1') : h;

  let html = `
    <div class="brand">
      <div class="logo"><svg viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="20" stroke="currentColor" stroke-width="2"/><path d="M17 15v18M31 15v18M17 24h14" stroke="currentColor" stroke-width="3" stroke-linecap="round"/><path d="M24 16c3 0 4 2 4 4M24 32c-3 0-4-2-4-4" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg></div>
      <div><div class="brand-name">HASAKI</div><div class="brand-sub">Clinic</div></div>
    </div>`;
  NAV.forEach(sec => {
    html += `<div class="nav-label">${sec.group}</div>`;
    sec.items.forEach(it => {
      const cls = it.id === activeId ? 'nav-item active' : 'nav-item';
      const badge = it.badge ? `<span class="nav-badge">${it.badge}</span>` : '';
      html += `<a class="${cls}" href="${it.href}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">${it.icon}</svg>${it.label}${badge}</a>`;
    });
  });
  html += `<div class="side-foot"><b>Hasaki Clinic Suite</b><br>v1.0 · multi-tenant<br>VN / US ready · 2026</div>`;
  sidebar.innerHTML = fromRoot ? fix(html) : html;
}

function topbar(eyebrow, title, opts = {}) {
  const right = opts.right || '';
  return `<div class="topbar">
    <div><div class="page-eyebrow">${eyebrow}</div><h1 class="page-title">${title}</h1></div>
    <div class="tenant"><span class="flag"></span> Việt Nam · ${opts.branch || 'Tất cả CN'}
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg></div>
    ${right}
    <div class="search"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4-4"/></svg><input placeholder="Tìm kiếm…"></div>
    <div class="avatar">${opts.who || 'MA'}</div>
  </div>`;
}

// bar chart helper
function drawBars(el, data, max){
  const m = max || Math.max(...data.map(x=>x.svc+(x.prod||0)));
  data.forEach((x,i)=>{
    const wrap=document.createElement('div');wrap.className='bar-wrap';
    const col=document.createElement('div');col.className='bar-col';
    if(x.prod!=null){const p=document.createElement('div');p.className='bar prod';p.style.height='0';col.appendChild(document.createElement('div'));
      const s=document.createElement('div');s.className='bar svc';s.style.height='0';col.appendChild(s);col.appendChild(p);
      setTimeout(()=>{s.style.height=(x.svc/m*100)+'%';p.style.height=(x.prod/m*100)+'%';},100+i*60);}
    else{const s=document.createElement('div');s.className='bar svc';s.style.height='0';col.appendChild(s);
      setTimeout(()=>{s.style.height=(x.svc/m*100)+'%';},100+i*60);}
    const xl=document.createElement('div');xl.className='bar-x';xl.textContent=x.d;
    wrap.appendChild(col);wrap.appendChild(xl);el.appendChild(wrap);
  });
}

// generic interactions
function wireUI(){
  document.querySelectorAll('.pill-tabs').forEach(g=>g.querySelectorAll('button').forEach(b=>{
    if(b.getAttribute('onclick')) return; // nút điều hướng (location.href) — không ghi đè
    b.onclick=()=>{ g.querySelectorAll('button').forEach(x=>x.classList.remove('on'));b.classList.add('on'); };
  }));
  document.querySelectorAll('[data-pay]').forEach(o=>o.onclick=()=>{
    document.querySelectorAll('[data-pay]').forEach(x=>x.classList.remove('sel'));o.classList.add('sel');});
}
