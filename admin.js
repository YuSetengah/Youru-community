// ══════════════════════════════════════
// DARK MODE
// ══════════════════════════════════════
(function(){
  const saved = localStorage.getItem('youru_theme');
  if(saved === 'dark') document.documentElement.setAttribute('data-theme','dark');
})();

function toggleDarkMode(){
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  if(isDark){
    document.documentElement.removeAttribute('data-theme');
    localStorage.setItem('youru_theme','light');
  } else {
    document.documentElement.setAttribute('data-theme','dark');
    localStorage.setItem('youru_theme','dark');
  }
  updateDarkBtn();
}

function updateDarkBtn(){
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const btn = document.getElementById('darkModeBtn');
  if(!btn) return;
  btn.innerHTML = isDark
    ? `<svg width="14" height="14" viewBox="0 0 16 16" fill="none" style="margin-right:6px;vertical-align:-2px"><path d="M8 1v1M8 14v1M1 8h1M14 8h1M3.05 3.05l.71.71M12.24 12.24l.71.71M3.05 12.95l.71-.71M12.24 3.76l.71-.71" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><circle cx="8" cy="8" r="3" stroke="currentColor" stroke-width="1.4"/></svg> Mode Terang`
    : `<svg width="14" height="14" viewBox="0 0 16 16" fill="none" style="margin-right:6px;vertical-align:-2px"><path d="M13.5 10.5A6 6 0 015.5 2.5a6 6 0 108 8z" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg> Mode Malam`;
}

window.onload = function () {
  updateDarkBtn();
  const loginScreen = document.getElementById('loginScreen');
  const adminPanel  = document.getElementById('adminPanel');
  if(sessionStorage.getItem('youru_logged')){
    loginScreen.style.display = 'none';
    adminPanel.style.display  = 'block';
    initPanel();
  }
};
// ══════════════════════════════════════
// DEFAULT DATA
// ══════════════════════════════════════
const DEFAULT_MEMBERS = [
  {id:'BU', name:'Yu', role:'GFX Designer & Programming', tag:'Aktif', avatar:'BU.jpg', avatarBase64:'', ig:'@byupsty', tiktok:''},
  {id:'YG', name:'Kaguya', role:'GFX Designer', tag:'Aktif', avatar:'YG.jpeg', avatarBase64:'', ig:'@youthgraph.studio', tiktok:''},
];

const DEFAULT_SPOTLIGHT = [
  {
    id:'YG',
    name:'Youthgraph Studio',
    type:'Creative Designer',
    title:'Community GFX Handler',
    desc:'Studio kreatif branding visual modern.',
    tags:['Branding','Creative'],
    link:'https://instagram.com/youthgraph.studio',
    avatar:'YG.jpeg',
    bg:'YG-BG.jpg'
  },
  {
    id:'BU',
    name:'Byupsty',
    type:'Creative Designer & Programmer',
    title:'Community Web Handler',
    desc:'Desainer kreatif dan programmer.',
    tags:['Coding','Design'],
    link:'https://instagram.com/byupsty',
    avatar:'BU.jpg',
    bg:'BU-BG.jpg'
  }
];

const DEFAULT_EVENTS = [
  {
    day:'15',
    month:'Feb',
    type:'Workshop',
    title:'Design Sprint Bootcamp',
    desc:'Workshop desain komunitas.',
    time:'09.00 WIB',
    location:'Zoom',
    slot:'50 Slot'
  },
  {
    day:'22',
    month:'Feb',
    type:'Webinar',
    title:'Portofolio Menarik HRD',
    desc:'Tips portofolio.',
    time:'19.00 WIB',
    location:'Zoom',
    slot:'Gratis'
  }
];

const DEFAULT_INSTA = [
  {
    id:'YG',
    name:'Youthgraph Studio',
    type:'Branding',
    desc:'Branding concept',
    time:'',
    embedPermalink:'https://www.instagram.com/p/XXXXX/'
  },
  {
    id:'BU',
    name:'Byupsty',
    type:'Design',
    desc:'Feed design',
    time:'',
    embedPermalink:'https://www.instagram.com/p/YYYYY/'
  }
];
const DEFAULT_ADMINS = [{username:'admin', password:'youru2024'}];

// ══════════════════════════════════════
// IMAGE PREVIEW
// ══════════════════════════════════════
function previewImg(input, previewId, dataId){
  const file = input.files[0];
  if(!file) return;
  if(file.size > 3 * 1024 * 1024){
    showToast('File terlalu besar (max 3MB)','error');
    return;
  }
  const reader = new FileReader();
  reader.onload = function(e){
    document.getElementById(previewId).src = e.target.result;
    document.getElementById(dataId).value  = e.target.result;
  };
  reader.readAsDataURL(file);
}

// ══════════════════════════════════════
// MODAL HELPERS
// ══════════════════════════════════════
let _modalCallback = null;

function openConfirm(title, msg, onConfirm){
  document.getElementById('modalTitle').textContent  = title;
  document.getElementById('modalMsg').textContent    = msg;
  const btn = document.getElementById('modalConfirmBtn');
  btn.onclick = function(){
    closeModal();
    if(onConfirm) onConfirm();
  };
  document.getElementById('confirmModal').classList.add('show');
}

function closeModal(){
  document.getElementById('confirmModal').classList.remove('show');
}

// Close modal on ESC or click outside
document.addEventListener('keydown', e => { if(e.key==='Escape') closeModal(); });
document.getElementById && document.addEventListener('DOMContentLoaded', ()=>{
  document.getElementById('confirmModal').addEventListener('click', function(e){
    if(e.target === this) closeModal();
  });
});

// ══════════════════════════════════════
// STORAGE
// ══════════════════════════════════════
function getData(key, def){
  const raw = localStorage.getItem('youru_' + key);
  return raw ? JSON.parse(raw) : JSON.parse(JSON.stringify(def));
}
function saveData(key,val){
  localStorage.setItem('youru_' + key, JSON.stringify(val));
}

// ══════════════════════════════════════
// ADMIN
// ══════════════════════════════════════
function getAdmins(){
  const raw = localStorage.getItem('youru_admins');
  // Kalau belum ada di localStorage, kembalikan COPY dari default (bukan referensi langsung)
  return raw ? JSON.parse(raw) : JSON.parse(JSON.stringify(DEFAULT_ADMINS));
}
function saveAdmins(arr){
  localStorage.setItem('youru_admins', JSON.stringify(arr));
}

// ══════════════════════════════════════
// TOAST — multi-instance, progress bar
// ══════════════════════════════════════
const TOAST_ICONS = {
  success: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8l3.5 3.5L13 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  error:   '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
  info:    '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><line x1="8" y1="7" x2="8" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><circle cx="8" cy="4.5" r="1" fill="currentColor"/></svg>'
};
const TOAST_TITLES = {
  success: 'Berhasil',
  error:   'Gagal',
  info:    'Informasi'
};

function showToast(msg, type='success', duration=3500){
  const container = document.getElementById('toastContainer');
  const item = document.createElement('div');
  item.className = `toast-item ${type}`;
  item.style.setProperty('--duration', duration+'ms');
  item.innerHTML = `
    <div class="toast-icon-wrap">${TOAST_ICONS[type]||'ℹ'}</div>
    <div class="toast-body">
      <div class="toast-title">${TOAST_TITLES[type]||'Info'}</div>
      <div class="toast-msg">${msg}</div>
    </div>
    <button class="toast-close" onclick="dismissToast(this.parentElement)"><svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg></button>
    <div class="toast-progress"></div>
  `;
  container.appendChild(item);

  // trigger enter animation
  requestAnimationFrame(()=>{ requestAnimationFrame(()=>{ item.classList.add('show'); }); });

  // auto dismiss
  const timer = setTimeout(()=> dismissToast(item), duration);
  item._timer = timer;
}

function dismissToast(el){
  if(!el || !el.parentElement) return;
  clearTimeout(el._timer);
  el.classList.remove('show');
  el.classList.add('hide');
  setTimeout(()=>{ if(el.parentElement) el.parentElement.removeChild(el); }, 350);
}

// ══════════════════════════════════════
// LOGIN
// ══════════════════════════════════════
function doLogin(){
  const loginScreen = document.getElementById('loginScreen');
  const adminPanel  = document.getElementById('adminPanel');
  const loginError  = document.getElementById('loginError');
  const u = document.getElementById('loginUser').value.trim();
  const p = document.getElementById('loginPass').value.trim();

  const data = getAdmins();
  const cek = data.find(x => x.username==u && x.password==p);

  if(cek){
    sessionStorage.setItem('youru_logged', u);
    loginScreen.style.display = 'none';
    adminPanel.style.display  = 'block';
    initPanel();
    showToast('Login berhasil');
  } else {
    loginError.style.display = 'flex';
  }
}

function doLogout(){
  sessionStorage.removeItem('youru_logged');
  location.reload();
}

// ══════════════════════════════════════
// TAB
// ══════════════════════════════════════
function switchTab(tab){

  document.querySelectorAll('.tab-content').forEach(x=>{
    x.classList.remove('active');
  });

  document.querySelectorAll('.sidebar-item').forEach(x=>{
    x.classList.remove('active');
  });

  document.getElementById('content-' + tab).classList.add('active');
  document.getElementById('tab-' + tab).classList.add('active');

  renderTab(tab);

  if(window.innerWidth < 680){
    toggleSidebar(false);
  }
}

function renderTab(tab){
  if(tab=='overview') renderOverview();
  if(tab=='members') renderMembers();
  if(tab=='spotlight') renderSpotlight();
  if(tab=='events') renderEvents();
  if(tab=='instagram') renderInsta();
  if(tab=='pengurus') renderPengurus();
  if(tab=='settings') renderSettings();
}

// ══════════════════════════════════════
// MOBILE SIDEBAR
// ══════════════════════════════════════
function toggleSidebar(force=null){
  const sb = document.querySelector('.sidebar');
  const ov = document.getElementById('sidebarOverlay');

  if(force===false){
    sb.classList.remove('mobile-open');
    ov.classList.remove('show');
    return;
  }

  sb.classList.toggle('mobile-open');
  ov.classList.toggle('show');
}

// ══════════════════════════════════════
// OVERVIEW
// ══════════════════════════════════════
const DEFAULT_HERO_STATS = {
  members: { value: '120+', label: 'Member Aktif' },
  karya:   { value: '48',   label: 'Karya Bulan Ini' },
  event:   { value: '12',   label: 'Event Tahunan' },
};

function getHeroStats(){
  const raw = localStorage.getItem('youru_hero_stats');
  return raw ? JSON.parse(raw) : JSON.parse(JSON.stringify(DEFAULT_HERO_STATS));
}

function renderOverview(){
  const WEEK = 7 * 24 * 60 * 60 * 1000;
  const now  = Date.now();
  const activePosts = getData('insta', DEFAULT_INSTA).filter(d => !d.addedAt || (now - d.addedAt) < WEEK);

  document.getElementById('statMembers').innerText   = getData('members',DEFAULT_MEMBERS).length;
  document.getElementById('statSpotlight').innerText = getData('spotlight',DEFAULT_SPOTLIGHT).length;
  document.getElementById('statEvents').innerText    = getData('events',DEFAULT_EVENTS).length;
  document.getElementById('statPosts').innerText     = activePosts.length;

  // Load current hero stat values into the editor fields + live preview
  const hs = getHeroStats();
  const keys = ['members','karya','event'];
  keys.forEach((k, i) => {
    const valEl = document.getElementById('hsVal' + i);
    const lblEl = document.getElementById('hsLbl' + i);
    if(valEl) valEl.value = hs[k].value;
    if(lblEl) lblEl.value = hs[k].label;
    updateStatPreview(i);
  });
}

function updateStatPreview(i){
  const val = document.getElementById('hsVal' + i);
  const lbl = document.getElementById('hsLbl' + i);
  const prev = document.getElementById('prev' + i);
  const prevL = document.getElementById('prevL' + i);
  if(val && prev)  prev.textContent  = val.value  || '—';
  if(lbl && prevL) prevL.textContent = lbl.value  || '—';
}

// Wire live preview on input
document.addEventListener('DOMContentLoaded', ()=>{
  [0,1,2].forEach(i => {
    const v = document.getElementById('hsVal' + i);
    const l = document.getElementById('hsLbl' + i);
    if(v) v.addEventListener('input', () => updateStatPreview(i));
    if(l) l.addEventListener('input', () => updateStatPreview(i));
  });
});

function saveHeroStats(){
  const keys = ['members','karya','event'];
  const stats = {};
  keys.forEach((k, i) => {
    const val = (document.getElementById('hsVal' + i).value.trim()) || DEFAULT_HERO_STATS[k].value;
    const lbl = (document.getElementById('hsLbl' + i).value.trim()) || DEFAULT_HERO_STATS[k].label;
    stats[k] = { value: val, label: lbl };
  });
  localStorage.setItem('youru_hero_stats', JSON.stringify(stats));
  showToast('Statistik hero berhasil disimpan! Perubahan langsung tampil di website.');
}

function resetHeroStats(){
  openConfirm('Reset Statistik', 'Kembalikan angka statistik ke nilai default (120+, 48, 12)?', ()=>{
    localStorage.removeItem('youru_hero_stats');
    renderOverview();
    showToast('Statistik direset ke default', 'info');
  });
}

// ══════════════════════════════════════
// MEMBERS
// ══════════════════════════════════════
function addMember(){
  const id   = document.getElementById('mId').value.trim().toUpperCase();
  const name = document.getElementById('mName').value.trim();
  const role = document.getElementById('mRole').value.trim();
  const tag  = document.getElementById('mTag').value;
  const ig   = document.getElementById('mIg').value.trim();
  const tt   = document.getElementById('mTt').value.trim();
  const avatarBase64 = document.getElementById('mAvatarData').value || '';

  if(!id || !name || !role){
    showToast('Lengkapi data anggota','error');
    return;
  }

  let data = getData('members',DEFAULT_MEMBERS);
  if(data.find(x=>x.id==id)){
    showToast('ID sudah ada','error');
    return;
  }

  data.push({ id, name, role, tag, ig, tiktok: tt, avatarBase64, avatar:'' });
  saveData('members', data);

  document.getElementById('mId').value='';
  document.getElementById('mName').value='';
  document.getElementById('mRole').value='';
  document.getElementById('mIg').value='';
  document.getElementById('mTt').value='';
  document.getElementById('mAvatarData').value='';
  document.getElementById('mAvatarFile').value='';
  document.getElementById('mAvatarPreview').src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 80'%3E%3Ccircle cx='40' cy='40' r='40' fill='%23eef4ff'/%3E%3Ccircle cx='40' cy='30' r='14' fill='%237ab0ff'/%3E%3Cellipse cx='40' cy='65' rx='22' ry='16' fill='%237ab0ff'/%3E%3C/svg%3E";

  renderMembers();
  renderOverview();
  showToast('Anggota ditambahkan');
}

function deleteMember(i){
  openConfirm('Hapus Anggota', 'Yakin ingin menghapus anggota ini? Tindakan tidak bisa dibatalkan.', ()=>{
    let data = getData('members',DEFAULT_MEMBERS);
    data.splice(i,1);
    saveData('members',data);
    renderMembers();
    renderOverview();
    showToast('Anggota berhasil dihapus');
  });
}

function renderMembers(){
  let data = getData('members',DEFAULT_MEMBERS);
  const el = document.getElementById('memberList');
  if(!el) return;
  if(data.length==0){
    el.innerHTML='<div class="empty-state">Belum ada anggota</div>';
    return;
  }
  el.innerHTML = data.map((d,i)=>{
    const src = d.avatarBase64 || (d.avatar ? `asset/${d.avatar}` : '');
    const av  = src ? `<img src="${src}" onerror="this.parentElement.textContent='${d.id}'" style="width:100%;height:100%;object-fit:cover;border-radius:50%;">` : d.id;
    const igLink  = d.ig   ? `<a href="https://instagram.com/${d.ig.replace('@','')}" target="_blank" style="font-size:0.68rem;color:#e1306c;font-weight:700;text-decoration:none;"><svg width="11" height="11" viewBox="0 0 24 24" fill="none"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="5" stroke="currentColor" stroke-width="2"/><circle cx="17.5" cy="6.5" r="1.2" fill="currentColor"/></svg> ${d.ig}</a>` : '';
    const ttLink  = d.tiktok ? `<a href="https://tiktok.com/${d.tiktok.replace('@','@')}" target="_blank" style="font-size:0.68rem;color:#000;font-weight:700;text-decoration:none;"><svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.76a4.85 4.85 0 01-1.01-.07z"/></svg> ${d.tiktok}</a>` : '';
    return `
    <div class="data-item">
      <div class="data-item-avatar">${av}</div>
      <div class="data-item-info">
        <div class="data-item-name">${d.name}</div>
        <div class="data-item-sub">${d.role} · <span style="color:var(--blue-600)">${d.tag}</span></div>
        <div style="display:flex;gap:8px;margin-top:4px;flex-wrap:wrap;">${igLink}${ttLink}</div>
      </div>
      <button class="btn-delete" onclick="deleteMember(${i})">Hapus</button>
    </div>`;
  }).join('');
}

// ══════════════════════════════════════
// SPOTLIGHT
// ══════════════════════════════════════
function renderSpotlight(){

  let data = getData('spotlight',DEFAULT_SPOTLIGHT);

  if(data.length==0){
    spotlightList.innerHTML='<div class="empty-state">Belum ada spotlight</div>';
    return;
  }

  spotlightList.innerHTML = data.map((d,i)=>`
    <div class="data-item">
      <div class="data-item-avatar">${d.id}</div>

      <div class="data-item-info">
        <div class="data-item-name">${d.name}</div>
        <div class="data-item-sub">${d.type}</div>
      </div>

      <button class="btn-delete" onclick="deleteSpotlight(${i})">
        Hapus
      </button>
    </div>
  `).join('');
}

function addSpotlight(){
  const id    = document.getElementById('sId').value.trim().toUpperCase();
  const name  = document.getElementById('sName').value.trim();
  const type  = document.getElementById('sType').value.trim();
  const title = document.getElementById('sTitle').value.trim();
  const desc  = document.getElementById('sDesc').value.trim();
  const tags  = document.getElementById('sTags').value.trim();
  const link  = document.getElementById('sLink').value.trim();
  const avatarBase64 = document.getElementById('sAvatarData').value || '';
  const bgBase64     = document.getElementById('sBgData').value || '';

  if(!id || !name || !type){
    showToast('ID, nama, dan tipe wajib diisi','error');
    return;
  }

  let data = getData('spotlight', DEFAULT_SPOTLIGHT);
  data.push({
    id, name, type, title, desc,
    tags: tags ? tags.split(',').map(t=>t.trim()) : [],
    link,
    avatarBase64,
    bgBase64
  });
  saveData('spotlight', data);

  document.getElementById('sId').value='';
  document.getElementById('sName').value='';
  document.getElementById('sType').value='';
  document.getElementById('sTitle').value='';
  document.getElementById('sDesc').value='';
  document.getElementById('sTags').value='';
  document.getElementById('sLink').value='';
  document.getElementById('sAvatarData').value='';
  document.getElementById('sBgData').value='';

  renderSpotlight();
  renderOverview();
  showToast('Spotlight ditambahkan');
}

function deleteSpotlight(i){
  openConfirm('Hapus Spotlight', 'Yakin ingin menghapus spotlight ini?', ()=>{
    let data = getData('spotlight',DEFAULT_SPOTLIGHT);
    data.splice(i,1);
    saveData('spotlight',data);
    renderSpotlight();
    renderOverview();
    showToast('Spotlight berhasil dihapus');
  });
}
// ══════════════════════════════════════
// EVENTS
// ══════════════════════════════════════
function renderEvents(){
  const data = getData('events', DEFAULT_EVENTS);
  const el = document.getElementById('eventList');
  if(!el) return;
  if(data.length==0){
    el.innerHTML='<div class="empty-state">Belum ada event</div>';
    return;
  }
  el.innerHTML = data.map((d,i)=>`
    <div class="data-item">
      <div class="data-item-avatar" style="border-radius:10px;font-size:1rem;font-weight:800;">${d.day}<br><span style="font-size:0.55rem;">${d.month}</span></div>
      <div class="data-item-info">
        <div class="data-item-name">${d.title}</div>
        <div class="data-item-sub">${d.type} · ${d.time||''} · ${d.location||''}</div>
        <div class="data-item-sub">${d.desc}</div>
      </div>
      <button class="btn-delete" onclick="deleteEvent(${i})">Hapus</button>
    </div>
  `).join('');
}

function addEvent(){
  const title = document.getElementById('eTitle').value.trim();
  const type  = document.getElementById('eType').value;
  const day   = document.getElementById('eDay').value.trim();
  const month = document.getElementById('eMonth').value.trim();
  const time  = document.getElementById('eTime').value.trim();
  const desc  = document.getElementById('eDesc').value.trim();
  const loc   = document.getElementById('eLocation').value.trim();
  const slot  = document.getElementById('eSlot').value.trim();

  if(!title || !day || !month){
    showToast('Nama event, tanggal, dan bulan wajib diisi','error');
    return;
  }

  let data = getData('events', DEFAULT_EVENTS);
  data.push({title, type, day, month, time, desc, location:loc, slot});
  saveData('events', data);

  document.getElementById('eTitle').value='';
  document.getElementById('eDay').value='';
  document.getElementById('eMonth').value='';
  document.getElementById('eTime').value='';
  document.getElementById('eDesc').value='';
  document.getElementById('eLocation').value='';
  document.getElementById('eSlot').value='';

  renderEvents();
  renderOverview();
  showToast('Event ditambahkan');
}

function deleteEvent(i){
  openConfirm('Hapus Event', 'Yakin ingin menghapus event ini? Tindakan tidak bisa dibatalkan.', ()=>{
    let data = getData('events', DEFAULT_EVENTS);
    data.splice(i,1);
    saveData('events', data);
    renderEvents();
    renderOverview();
    showToast('Event berhasil dihapus');
  });
}

// ══════════════════════════════════════
// INSTAGRAM
// ══════════════════════════════════════
function renderInsta(){
  const WEEK = 7 * 24 * 60 * 60 * 1000;
  const now  = Date.now();

  // Auto-prune expired posts saat admin buka tab
  let data = getData('insta', DEFAULT_INSTA);
  const active = data.filter(d => !d.addedAt || (now - d.addedAt) < WEEK);
  if(active.length !== data.length){
    saveData('insta', active);
    data = active;
  }

  const el = document.getElementById('instaList');
  if(!el) return;
  if(data.length === 0){
    el.innerHTML = '<div class="empty-state">Belum ada postingan aktif</div>';
    return;
  }

  function relTime(ts){
    if(!ts) return 'Baru saja';
    const d = now - ts;
    const m = Math.floor(d / 60000);
    const h = Math.floor(d / 3600000);
    const dy = Math.floor(d / 86400000);
    if(m < 1)  return 'Baru saja';
    if(m < 60) return m + ' menit lalu';
    if(h < 24) return h + ' jam lalu';
    return dy + ' hari lalu';
  }

  function daysLeft(ts){
    if(!ts) return 7;
    return Math.max(0, 7 - Math.floor((now - ts) / 86400000));
  }

  el.innerHTML = data.map((d, i) => {
    const left    = daysLeft(d.addedAt);
    const urgent  = left <= 2;
    const badgeStyle = urgent
      ? 'background:#fff0f0;color:#e53e3e;border:1px solid rgba(229,62,62,0.2);'
      : 'background:var(--green-light);color:var(--green);border:1px solid rgba(56,161,105,0.2);';
    const clockSVG = `<svg width="10" height="10" viewBox="0 0 16 16" fill="none" style="margin-right:3px;vertical-align:-1px;flex-shrink:0;"><circle cx="8" cy="8" r="6.5" stroke="currentColor" stroke-width="1.4"/><path d="M8 4.5v4l2.5 2" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>`;

    return `
    <div class="data-item">
      <div class="data-item-avatar" style="background:linear-gradient(135deg,#f09433,#e6683c,#dc2743,#cc2366);color:white;">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="5" stroke="currentColor" stroke-width="2"/><circle cx="17.5" cy="6.5" r="1.2" fill="currentColor"/></svg>
      </div>
      <div class="data-item-info">
        <div class="data-item-name">${d.name} <span style="font-size:0.7rem;color:var(--text-light);">(${d.id})</span></div>
        <div class="data-item-sub">${d.type||''} · ${relTime(d.addedAt)}</div>
        <div class="data-item-sub" style="word-break:break-all;color:var(--blue-600);font-size:0.7rem;">${d.embedPermalink}</div>
        <div style="margin-top:5px;">
          <span style="display:inline-flex;align-items:center;font-size:0.68rem;font-weight:700;padding:2px 8px;border-radius:999px;${badgeStyle}">
            ${clockSVG}${urgent ? '⚠ ' : ''}${left} hari tersisa
          </span>
        </div>
      </div>
      <button class="btn-delete" onclick="deleteInsta(${i})">Hapus</button>
    </div>`;
  }).join('');
}

function addInstaPost(){
  const id    = document.getElementById('iId').value.trim().toUpperCase();
  const name  = document.getElementById('iName').value.trim();
  const type  = document.getElementById('iType').value.trim();
  const desc  = document.getElementById('iDesc').value.trim();
  const embed = document.getElementById('iEmbed').value.trim();

  if(!id || !name || !embed){
    showToast('ID, nama, dan embed link wajib diisi','error');
    return;
  }

  let data = getData('insta', DEFAULT_INSTA);
  data.push({id, name, type, desc, time:'', addedAt: Date.now(), embedPermalink: embed});
  saveData('insta', data);

  document.getElementById('iId').value='';
  document.getElementById('iName').value='';
  document.getElementById('iType').value='';
  document.getElementById('iDesc').value='';
  document.getElementById('iEmbed').value='';

  renderInsta();
  renderOverview();
  showToast('Postingan ditambahkan');
}

function deleteInsta(i){
  openConfirm('Hapus Postingan', 'Yakin ingin menghapus postingan ini dari feed?', ()=>{
    let data = getData('insta', DEFAULT_INSTA);
    data.splice(i,1);
    saveData('insta', data);
    renderInsta();
    renderOverview();
    showToast('Postingan berhasil dihapus');
  });
}

// ══════════════════════════════════════
// PENGURUS
// ══════════════════════════════════════
const DEFAULT_PENGURUS = [
  { id:'SS', name:'Surya Santosa', pos:'Ketua Komunitas', ig:'@suryasantosa_' },
  { id:'NH', name:'Nadia Hani', pos:'Wakil Ketua', ig:'@nadiahani' },
  { id:'BR', name:'Bima Raditya', pos:'Sekretaris', ig:'@bima.rad' },
  { id:'LM', name:'Luna Mega', pos:'Bendahara', ig:'@lunamega_' },
  { id:'FA', name:'Farhan Ali', pos:'Koordinator Kreatif', ig:'@farhan.ali' },
  { id:'CW', name:'Citra Wulan', pos:'Koordinator Event', ig:'@citrawulan' },
  { id:'RP', name:'Rafi Putra', pos:'Koordinator Media', ig:'@rafiputra_' },
  { id:'YA', name:'Yosi Ananda', pos:'Koordinator Mentor', ig:'@yosiananda' },
];

function renderPengurus(){
  const data = getData('pengurus', DEFAULT_PENGURUS);
  const el = document.getElementById('pengurusList');
  if(!el) return;
  if(data.length==0){
    el.innerHTML='<div class="empty-state">Belum ada pengurus</div>';
    return;
  }
  el.innerHTML = data.map((d,i)=>{
    const src = d.avatarBase64 || (d.avatar ? `asset/${d.avatar}` : '');
    const av  = src ? `<img src="${src}" onerror="this.parentElement.textContent='${d.id}'" style="width:100%;height:100%;object-fit:cover;border-radius:50%;">` : d.id;
    const igLink = d.ig     ? `<a href="https://instagram.com/${d.ig.replace('@','')}" target="_blank" style="font-size:0.68rem;color:#e1306c;font-weight:700;text-decoration:none;"><svg width="11" height="11" viewBox="0 0 24 24" fill="none"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="5" stroke="currentColor" stroke-width="2"/><circle cx="17.5" cy="6.5" r="1.2" fill="currentColor"/></svg> ${d.ig}</a>` : '';
    const ttLink = d.tiktok ? `<a href="https://tiktok.com/@${d.tiktok.replace('@','')}" target="_blank" style="font-size:0.68rem;color:#000;font-weight:700;text-decoration:none;"><svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.76a4.85 4.85 0 01-1.01-.07z"/></svg> ${d.tiktok}</a>` : '';
    return `
    <div class="data-item">
      <div class="data-item-avatar">${av}</div>
      <div class="data-item-info">
        <div class="data-item-name">${d.name}</div>
        <div class="data-item-sub">${d.pos}</div>
        <div style="display:flex;gap:8px;margin-top:4px;flex-wrap:wrap;">${igLink}${ttLink}</div>
      </div>
      <button class="btn-delete" onclick="deletePengurus(${i})">Hapus</button>
    </div>`;
  }).join('');
}

function addPengurus(){
  const id   = document.getElementById('pgId').value.trim().toUpperCase();
  const name = document.getElementById('pgName').value.trim();
  const pos  = document.getElementById('pgPos').value.trim();
  const ig   = document.getElementById('pgIg').value.trim();
  const tt   = document.getElementById('pgTt').value.trim();
  const avatarBase64 = document.getElementById('pgAvatarData').value || '';

  if(!id || !name || !pos){
    showToast('ID, nama, dan jabatan wajib diisi','error');
    return;
  }

  let data = getData('pengurus', DEFAULT_PENGURUS);
  if(data.find(x=>x.id==id)){
    showToast('ID sudah ada','error');
    return;
  }
  data.push({ id, name, pos, ig, tiktok: tt, avatarBase64, avatar:'' });
  saveData('pengurus', data);

  document.getElementById('pgId').value='';
  document.getElementById('pgName').value='';
  document.getElementById('pgPos').value='';
  document.getElementById('pgIg').value='';
  document.getElementById('pgTt').value='';
  document.getElementById('pgAvatarData').value='';
  document.getElementById('pgAvatarFile').value='';
  document.getElementById('pgAvatarPreview').src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 80'%3E%3Ccircle cx='40' cy='40' r='40' fill='%23eef4ff'/%3E%3Ccircle cx='40' cy='30' r='14' fill='%237ab0ff'/%3E%3Cellipse cx='40' cy='65' rx='22' ry='16' fill='%237ab0ff'/%3E%3C/svg%3E";

  renderPengurus();
  showToast('Pengurus ditambahkan');
}

function deletePengurus(i){
  openConfirm('Hapus Pengurus', 'Yakin ingin menghapus pengurus ini dari daftar?', ()=>{
    let data = getData('pengurus', DEFAULT_PENGURUS);
    data.splice(i,1);
    saveData('pengurus', data);
    renderPengurus();
    showToast('Pengurus berhasil dihapus');
  });
}

// ══════════════════════════════════════
// SETTINGS
// ══════════════════════════════════════
function addAdmin(){
  const u = document.getElementById('newUser').value.trim();
  const p = document.getElementById('newPass').value.trim();

  if(!u){
    showToast('Username tidak boleh kosong','error');
    return;
  }
  if(p.length < 6){
    showToast('Password minimal 6 karakter','error');
    return;
  }

  // Selalu ambil dari localStorage dulu; kalau belum ada, seed dari DEFAULT dulu
  let raw = localStorage.getItem('youru_admins');
  let data = raw ? JSON.parse(raw) : JSON.parse(JSON.stringify(DEFAULT_ADMINS));

  if(data.find(x => x.username === u)){
    showToast('Username sudah digunakan','error');
    return;
  }

  data.push({ username: u, password: p });

  // Selalu simpan kembali — termasuk saat ini pertama kali (seed + new entry)
  localStorage.setItem('youru_admins', JSON.stringify(data));

  document.getElementById('newUser').value = '';
  document.getElementById('newPass').value = '';

  renderSettings();
  showToast('Akun admin berhasil ditambahkan');
}

function deleteAdmin(i){
  let data = getAdmins();
  if(data.length<=1){
    showToast('Minimal 1 admin harus ada','error');
    return;
  }
  openConfirm('Hapus Akun Admin', `Yakin ingin menghapus akun admin "${data[i].username}"?`, ()=>{
    data.splice(i,1);
    saveAdmins(data);
    renderSettings();
    showToast('Akun admin berhasil dihapus');
  });
}

function renderSettings(){
  const data = getAdmins();
  const el = document.getElementById('adminList');
  if(!el) return;

  el.innerHTML = data.map((d,i) => `
    <div class="data-item">
      <div class="data-item-avatar"><svg width="18" height="18" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="5.5" r="3" stroke="currentColor" stroke-width="1.4"/><path d="M2 14c0-3.31 2.69-6 6-6s6 2.69 6 6" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg></div>
      <div class="data-item-info">
        <div class="data-item-name">${d.username}</div>
        <div class="data-item-sub">••••••••</div>
      </div>
      <button class="btn-delete" onclick="deleteAdmin(${i})">Hapus</button>
    </div>
  `).join('');
}

// ══════════════════════════════════════
// RESET
// ══════════════════════════════════════
function resetData(){
  openConfirm('Reset Semua Data', 'Semua data yang telah diubah akan dikembalikan ke pengaturan awal. Tindakan ini tidak bisa dibatalkan!', ()=>{
    localStorage.removeItem('youru_members');
    localStorage.removeItem('youru_spotlight');
    localStorage.removeItem('youru_events');
    localStorage.removeItem('youru_insta');
    renderOverview();
    renderMembers();
    renderSpotlight();
    renderEvents();
    renderInsta();
    showToast('Semua data berhasil direset ke default', 'info');
  });
}

// ══════════════════════════════════════
// INIT PANEL
// ══════════════════════════════════════
function initPanel(){
  renderOverview();
  renderMembers();
  renderSpotlight();
  renderEvents();
  renderInsta();
  renderPengurus();
  renderSettings();
}