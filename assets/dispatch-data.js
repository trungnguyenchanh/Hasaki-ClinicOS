/* ===== Dữ liệu & helper điều phối — DÙNG CHUNG cho dispatch.html + dispatch-assign.html ===== */
const fmtMin = m => m>=60 ? `${Math.floor(m/60)}h${m%60?(' '+(m%60)+'p'):''}` : `${m}p`;

const QUEUE = [
  { id:'C-1042', name:'Tr\u1ea7n Thu H\u00e0', av:'av-teal', vip:true, wait:6, peakSafe:false,
    reqStaff:null, tickets:['DV-0825','DV-0826'],
    skus:[
      { n:'Gi\u1ea3m b\u00e9o RF b\u1ee5ng \u00b7 bu\u1ed5i 1/10', group:'Gi\u1ea3m b\u00e9o', mins:45, machine:'RF Slim', major:null, skill:'RF \u00b7 Senior' },
      { n:'Tri\u1ec7t l\u00f4ng Diode 2 v\u00f9ng',       group:'Tri\u1ec7t l\u00f4ng', mins:30, machine:'Laser Diode', major:null, skill:'Laser \u00b7 Mid' },
      { n:'Ch\u0103m s\u00f3c da ph\u1ee5c h\u1ed3i',          group:'Ch\u0103m s\u00f3c da', mins:40, machine:null, major:null, skill:'Skincare \u00b7 Mid' },
    ] },
  { id:'C-1080', name:'L\u00ea Minh', av:'av-indigo', vip:false, wait:16, peakSafe:false,
    reqStaff:null, tickets:['DV-0830'],
    skus:[
      { n:'Kh\u00e1m da li\u1ec5u + k\u00ea toa', group:'B\u00e1c s\u0129', mins:20, machine:null, major:'B\u00e1c s\u0129', skill:null },
      { n:'Tri\u1ec7t l\u00f4ng Diode l\u01b0ng', group:'Tri\u1ec7t l\u00f4ng', mins:35, machine:'Laser Diode', major:null, skill:'Laser \u00b7 Mid' },
    ] },
  { id:'C-1136', name:'Ng\u00f4 Kh\u00e1nh', av:'av-gold', vip:false, wait:9, peakSafe:true,
    reqStaff:'H\u1ed3ng Trang', tickets:['DV-0836'],
    skus:[
      { n:'Ph\u1ee5c h\u1ed3i t\u00f3c & u\u1ed1n',  group:'Derma & Hair', mins:90, machine:null, major:'T\u00f3c', skill:'Hair \u00b7 Senior' },
      { n:'G\u1ed9i d\u01b0\u1ee1ng sinh',      group:'Derma & Hair', mins:25, machine:null, major:null, skill:'Spa \u00b7 Junior' },
    ] },
];
function wqAgg(q){
  const groups = [...new Set(q.skus.map(s=>s.group))];
  const machines = [...new Set(q.skus.filter(s=>s.machine).map(s=>s.machine))];
  const mins = q.skus.reduce((s,x)=>s+x.mins,0);
  return { tickets:q.tickets.length, skus:q.skus.length, groups:groups.length, machines, mins };
}

const STAFF = [
  { nm:'H\u1ed3ng Trang', sub:'KTV \u00b7 Senior', av:'av-gold', shift:'08\u201317', status:'avail',  checkedIn:'07:58', major:['RF','Body'], skills:['RF\u00b7Senior','Body\u00b7Senior','Laser\u00b7Mid'], tua:1, tuaMax:6, cong:'1,2tr' },
  { nm:'Thanh Mai',  sub:'KTV \u00b7 Senior', av:'av-teal', shift:'08\u201317', status:'busy',   checkedIn:'07:50', major:['Laser'], skills:['Laser\u00b7Senior','RF\u00b7Mid'], tua:3, tuaMax:6, cong:'1,9tr', busyUntil:'10:20' },
  { nm:'Ng\u1ecdc Linh',  sub:'\u0110i\u1ec1u d\u01b0\u1ee1ng', av:'av-blush', shift:'08\u201317', status:'break',  checkedIn:'07:55', major:['Skincare'], skills:['Skincare\u00b7Mid','RF\u00b7Mid'], tua:1, tuaMax:4, cong:'1,1tr', breakBack:'10:05' },
  { nm:'BS. B\u00edch H\u1eb1ng', sub:'B\u00e1c s\u0129 da li\u1ec5u', av:'av-indigo', shift:'08\u201316', status:'avail', checkedIn:'08:02', major:['B\u00e1c s\u0129'], skills:['B\u00e1c s\u0129'], tua:2, tuaMax:8, cong:'\u2014' },
  { nm:'Mai Linh',   sub:'Stylist t\u00f3c', av:'av-sage', shift:'09\u201318', status:'avail', checkedIn:'08:48', major:['T\u00f3c'], skills:['Hair\u00b7Senior','Spa\u00b7Mid'], tua:0, tuaMax:5, cong:'0,6tr' },
  { nm:'Ph\u01b0\u01a1ng Anh', sub:'KTV \u00b7 H\u1ecdc vi\u1ec7c', av:'av-blush', shift:'08\u201317', status:'off', checkedIn:null, major:[], skills:['RF\u00b7Junior'], tua:0, tuaMax:5, cong:'0\u0111' },
];

const peak = { hot:true, waiting:QUEUE.length, longest:Math.max(...QUEUE.map(q=>q.wait)) };

function staffStatus(s){
  const map={avail:['st-avail','sp-avail','S\u1eb5n s\u00e0ng'],busy:['st-busy','sp-busy','\u0110ang l\u00e0m'+(s.busyUntil?` \u00b7 t\u1edbi ${s.busyUntil}`:'')],break:['st-break','sp-break','Gi\u1eefa gi\u1edd'+(s.breakBack?` \u00b7 v\u1ec1 ${s.breakBack}`:'')],off:['st-off','sp-off','Ch\u01b0a check-in']};
  return map[s.status];
}

function scoreFor(staff, cust){
  const needMajors = [...new Set(cust.skus.filter(x=>x.major).map(x=>x.major))];
  const needSkillGroups = [...new Set(cust.skus.filter(x=>x.skill).map(x=>x.skill.split('\u00b7')[0].trim()))];
  const hasAllMajor = needMajors.every(m=>staff.major.includes(m));
  const skillHit = needSkillGroups.filter(g=>staff.skills.some(k=>k.startsWith(g))).length;
  const skillMatch = (needMajors.length && !hasAllMajor) ? 0
                    : Math.min(1, (skillHit + (hasAllMajor&&needMajors.length?1:0)) / Math.max(1, needSkillGroups.length + (needMajors.length?1:0)));
  const loadRatio = staff.tua/staff.tuaMax;
  const payNum = parseFloat((staff.cong||'0').replace(/[^\d,]/g,'').replace(',','.'))||0;
  const payBalance = Math.min(1, payNum/2.0);
  const continuity = (staff.nm===cust.reqStaff) ? 1 : 0;
  const vipPriority = (cust.vip && /Senior/.test(staff.skills.join(''))) ? 1 : 0;
  const score = 0.35*skillMatch + 0.25*(1-loadRatio) + 0.15*(1-payBalance) + 0.15*continuity + 0.10*vipPriority;
  return { score, skillMatch, loadRatio, payBalance, continuity, vipPriority, hasAllMajor, needMajors, eligible: !(needMajors.length && !hasAllMajor) && skillMatch>0 };
}
