// ── DARK MODE ──
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
  updateDarkIcon();
}

function updateDarkIcon(){
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const btn = document.getElementById('navDarkBtn');
  if(btn) {
    btn.innerHTML = isDark
      ? `<svg width="22" height="22" viewBox="0 0 16 16" fill="none"><path d="M8 1v1M8 14v1M1 8h1M14 8h1M3.05 3.05l.71.71M12.24 12.24l.71.71M3.05 12.95l.71-.71M12.24 3.76l.71-.71" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="8" cy="8" r="3" stroke="currentColor" stroke-width="1.5"/></svg>`
      : `<svg width="22" height="22" viewBox="0 0 16 16" fill="none"><path d="M13.5 10.5A6 6 0 015.5 2.5a6 6 0 108 8z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`;
  }
  const mobileLabel = document.getElementById('darkIconMobileLabel');
  if(mobileLabel) {
    mobileLabel.textContent = isDark ? '☀ Light Mode' : '☾ Dark Mode';
  }
}

document.addEventListener('DOMContentLoaded', updateDarkIcon);

// ── MOBILE MENU ──
function toggleMenu(){
  document.getElementById("navMenu").classList.toggle("show");
  document.getElementById("navHamburger").classList.toggle("open");
}
document.addEventListener('DOMContentLoaded', function(){
  document.getElementById('navMenu').addEventListener('click', function(e) {
    if (e.target.tagName === 'A') {
      document.getElementById('navMenu').classList.remove('show');
      document.getElementById('navHamburger').classList.remove('open');
    }
  });
});
  // ══════════════════════════════════════
  // DEFAULT DATA (fallback jika admin belum mengubah apapun)
  // ══════════════════════════════════════
  const DEFAULT_MEMBERS = [
    {id:'BU', name:'Yu', role:'GFX Designer & Programming', tag:'Aktif', avatar:'BU.jpg'},
    {id:'YG', name:'Kaguya', role:'GFX Designer', tag:'Aktif', avatar:'YG.jpeg'},
    {id:'HK', name:'Yudix', role:'GFX Designer & RAWFX', tag:'Aktif', avatar:'HK.jpeg'},
    {id:'CH', name:'Cahgo', role:'GFX Designer & JJ', tag:'Aktif', avatar:'CH.jpeg'},
    {id:'RS', name:'Rika Setiawan', role:'GFX Designer & Typograph', tag:'Aktif', avatar:'RS.jpeg'},
    {id:'EC', name:'Elan', role:'GFX Designer & Typograph', tag:'Aktif', avatar:'EC.jpeg'},
    {id:'AB', name:'Arka', role:'GFX Designer & MMV', tag:'Aktif', avatar:'AB.jpeg'},
  ];
  const DEFAULT_SPOTLIGHT = [
    {id:'YG', name:'Youthgraph Studio', type:'Creative Designer', title:'Community GFX Handler', desc:'Studio kreatif yang fokus pada branding visual, social media design, dan identitas digital modern.', tags:['Branding','Creative','Feed Design'], link:'https://www.instagram.com/youthgraph.studio?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==', avatar:'YG.jpeg', bg:'YG-BG.jpg'},
    {id:'HK', name:'Hyaku.ne', type:'Creative Designer & Motion Graph', title:'Community GFX Handler', desc:'Kreator visual dengan gaya desain modern, clean, dan estetik yang kuat di media sosial.', tags:['Art','Visual','Creative'], link:'https://www.instagram.com/hyaku.ne?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==', avatar:'HK.jpeg', bg:'HK-BG.jpeg'},
    {id:'BU', name:'Byupsty', type:'Creative Designer & Programmer', title:'Community Web Handler', desc:'Desainer kreatif dengan karakter visual unik, fresh, dan berani mengeksplorasi gaya baru.', tags:['Design','Coding','Creative'], link:'https://www.instagram.com/byupsty?igsh=MTRjbGp0OWZnZzhtOQ==', avatar:'BU.jpg', bg:'BU-BG.jpg'},
    {id:'CH', name:'Cahgo.mfrs', type:'Creative Designer & JJ', title:'Community JJ Handler', desc:'Desainer kreatif dengan karakter visual unik, fresh, dan berani mengeksplorasi gaya baru.', tags:['Design','JJ','Creative'], link:'https://www.instagram.com/cahgo.mfrs?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==', avatar:'CH.jpeg', bg:'CH-BG.jpg'},
    {id:'RS', name:'ri3ka_', type:'Creative Designer & JJ', title:'Community Member', desc:'Desainer kreatif dengan karakter visual unik, fresh, dan berani mengeksplorasi gaya baru.', tags:['Design','JJ','Creative'], link:'https://www.instagram.com/ri3ka__?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==', avatar:'RS.jpeg', bg:'RS-BG.png'},
    {id:'EC', name:'this.elan_vro', type:'Creative Designer & JJ', title:'Community Member', desc:'Desainer kreatif dengan karakter visual unik, fresh, dan berani mengeksplorasi gaya baru.', tags:['Design','JJ','Creative'], link:'https://www.instagram.com/this.elan_vro?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==', avatar:'EC.jpeg', bg:'EC-BG.png'},
    {id:'AB', name:'arkabiyuu', type:'Creative Designer', title:'Community Member', desc:'Desainer kreatif dengan karakter visual unik, fresh, dan berani mengeksplorasi gaya baru.', tags:['Design','IG Feed','Creative'], link:'https://www.instagram.com/arkabiyuu?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==', avatar:'AB.jpeg', bg:'AB-BG.png'},
  ];
  const DEFAULT_EVENTS = [
    {day:'15', month:'Feb', type:'Workshop', title:'Design Sprint Bootcamp 2024', desc:'Workshop intensif 2 hari bersama desainer senior dari studio terkemuka. Pelajari proses design sprint dalam lingkungan yang kolaboratif.', time:'09.00 – 17.00 WIB', location:'Zoom & Google Meet', slot:'50 Slot tersisa'},
    {day:'22', month:'Feb', type:'Webinar', title:'Portofolio yang Menonjol di Mata HRD', desc:'Tips dan trik membangun portofolio yang menarik untuk melamar pekerjaan di industri kreatif bersama rekruter dari perusahaan besar.', time:'19.00 – 21.00 WIB', location:'Zoom', slot:'∞ Gratis & Terbuka'},
    {day:'08', month:'Mar', type:'Kompetisi', title:'NARA Design Challenge #5', desc:'Tantangan desain bulanan dengan tema "Identitas Lokal". Kirimkan karya terbaik kamu dan menangkan berbagai hadiah menarik!', time:'Deadline 08 Maret 23.59', location:'Submit via Instagram', slot:'Terbuka untuk umum'},
    {day:'23', month:'Mar', type:'Meetup', title:'NARA Offline Gathering — Jakarta', desc:'Pertemuan tatap muka perdana 2024! Networking, pameran karya mini, dan sesi ngobrol santai bersama sesama kreator.', time:'14.00 – 19.00 WIB', location:'Jakarta Selatan', slot:'60 Slot — RSVP wajib'},
    {day:'06', month:'Apr', type:'Workshop', title:'Ilustrasi Digital dengan Procreate', desc:'Pelajari teknik ilustrasi digital dari nol hingga mahir menggunakan Procreate bersama ilustrator profesional.', time:'10.00 – 16.00 WIB', location:'Zoom', slot:'40 Slot tersisa'},
  ];
  const DEFAULT_INSTA = [
    {id:'YG', name:'Youthgraph Studio', time:'', desc:'Branding concept', type:'Branding', embedPermalink:'https://www.instagram.com/p/DXjK07PjxBR/?utm_source=ig_embed&utm_campaign=loading'},
    {id:'BU', name:'Byupsty', time:'', desc:'Branding concept', type:'Branding', embedPermalink:'https://www.instagram.com/p/DVTSfm-kjvs/?utm_source=ig_embed&utm_campaign=loading'},
  ];

  // ── HELPER: Ambil data dari localStorage, fallback ke default ──
  function getData(key, def) {
    const raw = localStorage.getItem('youru_' + key);
    return raw ? JSON.parse(raw) : JSON.parse(JSON.stringify(def));
  }

  // ── Ambil semua data (dari admin panel atau default) ──
  let instaData = getData('insta', DEFAULT_INSTA);

  let spotlightData = getData('spotlight', DEFAULT_SPOTLIGHT);
  let memberData = getData('members', DEFAULT_MEMBERS);
  const DEFAULT_BOARD = [
    { id:'SS', name:'Surya Santosa', pos:'Ketua Komunitas', ig:'@suryasantosa_' },
    { id:'NH', name:'Nadia Hani', pos:'Wakil Ketua', ig:'@nadiahani' },
    { id:'BR', name:'Bima Raditya', pos:'Sekretaris', ig:'@bima.rad' },
    { id:'LM', name:'Luna Mega', pos:'Bendahara', ig:'@lunamega_' },
    { id:'FA', name:'Farhan Ali', pos:'Koordinator Kreatif', ig:'@farhan.ali' },
    { id:'CW', name:'Citra Wulan', pos:'Koordinator Event', ig:'@citrawulan' },
    { id:'RP', name:'Rafi Putra', pos:'Koordinator Media', ig:'@rafiputra_' },
    { id:'YA', name:'Yosi Ananda', pos:'Koordinator Mentor', ig:'@yosiananda' },
  ];
  let boardData = getData('pengurus', DEFAULT_BOARD);
  let eventsData = getData('events', DEFAULT_EVENTS);

  // ── RENDER ──
  function renderColors(bg) {
    const colors = ['#eef4ff','#d6e6ff','#c3d9ff','#a8c8ff','#85b3ff'];
    return colors[Math.floor(Math.random() * colors.length)];
  }

function buildInstaGrid() {
  const grid = document.getElementById('instaGrid');
  grid.innerHTML = '';

  const WEEK = 7 * 24 * 60 * 60 * 1000;
  const now  = Date.now();

  // Ambil semua data, filter yang sudah > 7 hari
  const allData = getData('insta', DEFAULT_INSTA);
  instaData = allData.filter(d => !d.addedAt || (now - d.addedAt) < WEEK);

  // Kalau ada yang expired, simpan ulang ke localStorage agar bersih
  if(instaData.length !== allData.length){
    localStorage.setItem('youru_insta', JSON.stringify(instaData));
  }

  if(instaData.length === 0){
    grid.innerHTML = `
      <div style="grid-column:1/-1;text-align:center;padding:48px 20px;color:var(--text-light);font-size:0.9rem;">
        Belum ada postingan aktif.
      </div>`;
    return;
  }

  function relTime(ts){
    if(!ts) return '';
    const d = now - ts;
    const m = Math.floor(d / 60000);
    const h = Math.floor(d / 3600000);
    const dy = Math.floor(d / 86400000);
    if(m < 1)  return 'Baru saja';
    if(m < 60) return m + ' menit lalu';
    if(h < 24) return h + ' jam lalu';
    return dy + ' hari lalu';
  }

  instaData.forEach(d => {
    if (d.embedPermalink) {
      grid.innerHTML += `
        <div class="insta-card reveal">
          <blockquote class="instagram-media"
            data-instgrm-captioned
            data-instgrm-permalink="${d.embedPermalink}"
            data-instgrm-version="14"
            style="background:#FFF; border:0; border-radius:16px; margin:0; width:100%; max-width:100%;">
          </blockquote>
          <div class="insta-meta" style="padding:8px 14px 10px;display:flex;align-items:center;gap:8px;">
            <div class="insta-avatar">${d.id}</div>
            <div>
              <div class="insta-name">${d.name}</div>
              <div class="insta-time">${relTime(d.addedAt)}</div>
            </div>
          </div>
        </div>`;
    } else {
      const bg = ['#eef4ff','#d6e6ff','#c8dcff','#ddeeff'][Math.floor(Math.random()*4)];
      grid.innerHTML += `
        <div class="insta-card reveal">
          <div class="insta-img" style="background:${bg};">
            <div class="insta-placeholder">
              <span style="font-size:0.7rem;color:var(--blue-600);font-weight:700;background:white;padding:3px 10px;border-radius:6px;">${d.type||''}</span>
            </div>
          </div>
          <div class="insta-meta" style="padding:12px 16px;display:flex;align-items:center;gap:10px;">
            <div class="insta-avatar">${d.id}</div>
            <div>
              <div class="insta-name">${d.name}</div>
              <div class="insta-time">${relTime(d.addedAt)}</div>
              <div class="insta-desc">${d.desc||''}</div>
            </div>
          </div>
        </div>`;
    }
  });

  setTimeout(() => {
    if (window.instgrm) window.instgrm.Embeds.process();
  }, 500);
}


function buildSpotlight() {
  const grid = document.getElementById('spotlightGrid');
  grid.innerHTML = '';
  spotlightData = getData('spotlight', DEFAULT_SPOTLIGHT);

  const bgs = ['#eef4ff','#d6e6ff','#c8dcff','#bdd6ff'];

  spotlightData.forEach((d, i) => {
    // Avatar: prioritas base64 → nama file → inisial
    const avatarSrc = d.avatarBase64 || (d.avatar ? `asset/${d.avatar}` : '');
    let avatarContent = avatarSrc
      ? `<img src="${avatarSrc}" class="spotlight-real-avatar" onerror="this.parentElement.textContent='${d.id}'">`
      : d.id;

    // Banner: prioritas base64 → nama file → gradient
    const bgSrc = d.bgBase64 || (d.bg ? `asset/${d.bg}` : '');
    let bannerStyle = bgSrc
      ? `background:url('${bgSrc}') center/cover no-repeat;`
      : `background:linear-gradient(135deg,${bgs[i % bgs.length]},var(--blue-300));`;

    grid.innerHTML += `
      <div class="spotlight-card reveal">
        <div class="spotlight-img" style="${bannerStyle}">
          <div class="spotlight-badge">⭐ Spotlight</div>
        </div>
        <div class="spotlight-body">
          <div class="spotlight-member">
            <div class="spotlight-avatar">${avatarContent}</div>
            <div>
              <div class="spotlight-mname">${d.name}</div>
              <div class="spotlight-mtype">${d.type}</div>
            </div>
          </div>
          <div class="spotlight-title">${d.title}</div>
          <div class="spotlight-desc">${d.desc}</div>
          <div class="spotlight-tags">
            ${(d.tags||[]).map(t => `<span class="tag">${t}</span>`).join('')}
          </div>
          ${d.link ? `<a href="${d.link}" target="_blank" class="spotlight-link">Visit Instagram ↗</a>` : ''}
        </div>
      </div>
    `;
  });
}


function buildMembers() {
  const grid = document.getElementById('memberGrid');
  grid.innerHTML = '';
  memberData = getData('members', DEFAULT_MEMBERS);

  const igSVG = `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="width:18px;height:18px;"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="5" stroke="currentColor" stroke-width="2"/><circle cx="17.5" cy="6.5" r="1.2" fill="currentColor"/></svg>`;
  const ttSVG = `<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" style="width:18px;height:18px;"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.76a4.85 4.85 0 01-1.01-.07z"/></svg>`;

  memberData.forEach(d => {
    const imgSrc = d.avatarBase64 || (d.avatar ? `asset/${d.avatar}` : '');
    const avatarContent = imgSrc
      ? `<img src="${imgSrc}" class="member-real-avatar" onerror="this.parentElement.textContent='${d.id}'">`
      : d.id;
    const igBtn  = d.ig     ? `<a href="https://instagram.com/${d.ig.replace('@','')}" target="_blank" class="member-social ig-link" title="Instagram">${igSVG}</a>` : '';
    const ttBtn  = d.tiktok ? `<a href="https://tiktok.com/@${d.tiktok.replace('@','')}" target="_blank" class="member-social tt-link" title="TikTok">${ttSVG}</a>` : '';
    const socials = (igBtn || ttBtn) ? `<div class="member-socials">${igBtn}${ttBtn}</div>` : '';
    grid.innerHTML += `
      <div class="member-card reveal">
        <div class="member-avatar">${avatarContent}</div>
        <div class="member-name">${d.name}</div>
        <div class="member-role">${d.role}</div>
        <span class="member-tag">${d.tag}</span>
        ${socials}
      </div>
    `;
  });
}

function buildBoard(){
  const grid = document.getElementById('boardGrid');
  grid.innerHTML = '';
  boardData = getData('pengurus', DEFAULT_BOARD);

  const igSVG = `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="width:13px;height:13px;flex-shrink:0;"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="5" stroke="currentColor" stroke-width="2"/><circle cx="17.5" cy="6.5" r="1.2" fill="currentColor"/></svg>`;
  const ttSVG  = `<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" style="width:13px;height:13px;flex-shrink:0;"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.76a4.85 4.85 0 01-1.01-.07z"/></svg>`;

  const bgs = ['#eef4ff','#d6e6ff','#c8dcff','#bdd6ff','#c3e0ff'];

  // Palet warna per-card untuk banner
  const bannerPalettes = [
    ['#2d6ef7','#1240a8'],
    ['#1240a8','#0b2d6e'],
    ['#3b5bdb','#1971c2'],
    ['#2b6cb0','#1a3a6e'],
    ['#364fc7','#1e3a8a'],
  ];

  // SVG dekoratif untuk banner
  const bannerDeco = `<svg class="board-banner-deco" viewBox="0 0 260 108" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
    <circle cx="200" cy="-10" r="80" fill="white"/>
    <circle cx="20"  cy="90"  r="50" fill="white"/>
    <circle cx="130" cy="60"  r="30" fill="white" opacity="0.5"/>
    <rect x="160" y="60" width="40" height="40" rx="8" fill="white" opacity="0.4" transform="rotate(20 180 80)"/>
  </svg>`;

  boardData.forEach((d, i) => {
    const imgSrc = d.avatarBase64 || (d.avatar ? `asset/${d.avatar}` : '');
    const [c1, c2] = bannerPalettes[i % bannerPalettes.length];
    const bannerBg = `background:linear-gradient(135deg,${c1},${c2});`;

    const avatarContent = imgSrc
      ? `<img src="${imgSrc}" alt="${d.name}" onerror="this.style.display='none';this.parentElement.textContent='${d.id}'">`
      : d.id;

    const igBtn  = d.ig     ? `<a href="https://instagram.com/${d.ig.replace('@','')}" target="_blank" class="board-social ig-link">${igSVG} ${d.ig}</a>` : '';
    const ttBtn  = d.tiktok ? `<a href="https://tiktok.com/@${d.tiktok.replace('@','')}" target="_blank" class="board-social tt-link">${ttSVG} ${d.tiktok}</a>` : '';

    grid.innerHTML += `
      <div class="board-card reveal">
        <div class="board-card-inner">
          <div class="board-banner-img" style="${bannerBg}">
            ${bannerDeco}
          </div>
          <div class="board-avatar-circle">${avatarContent}</div>
        </div>
        <div class="board-info">
          <div class="board-name">${d.name}</div>
          <div class="board-pos">${d.pos}</div>
          <div style="display:flex;flex-direction:column;gap:4px;margin-top:8px;align-items:center;">
            ${igBtn}${ttBtn}
          </div>
        </div>
      </div>`;
  });
}
function buildEvents() {
const list = document.getElementById('eventsList');
list.innerHTML='';

eventsData = getData('events', DEFAULT_EVENTS);

eventsData.forEach(e=>{
list.innerHTML += `
<div class="event-card reveal">
<div class="event-date">
<div class="event-day">${e.day}</div>
<div class="event-month">${e.month}</div>
</div>

<div class="event-info">
<div class="event-title">${e.title}</div>
<div class="event-desc">${e.desc}</div>
</div>
</div>
`;
});
}

  // ── NAVIGATION ──
  function showPage(page, pushHistory) {
    // Default pushHistory = true kecuali dipanggil dari popstate
    if (pushHistory === undefined) pushHistory = true;

    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById('page-' + page).classList.add('active');
    document.querySelectorAll('#nav-home, #nav-about').forEach(a => a.classList.remove('active'));
    const navEl = document.getElementById('nav-' + page);
    if (navEl) navEl.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'instant' });
    observeReveal();

    if (pushHistory) {
      history.pushState({ page: page }, '', '?p=' + page);
    }
  }

  function scrollToSection(id) {
    // Pastikan home aktif dulu
    const homePage = document.getElementById('page-home');
    if (!homePage.classList.contains('active')) {
      showPage('home');
    }
    setTimeout(function() {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, homePage.classList.contains('active') ? 0 : 80);
  }

  // Tangani tombol back/forward browser
  window.addEventListener('popstate', function(e) {
    const page = (e.state && e.state.page) ? e.state.page : 'home';
    showPage(page, false);
  });

  // Set state awal saat halaman pertama dibuka
  (function() {
    const params = new URLSearchParams(location.search);
    const page = params.get('p') === 'about' ? 'about' : 'home';
    history.replaceState({ page: page }, '', page === 'about' ? '?p=about' : location.pathname);
    if (page === 'about') showPage('about', false);
  })();

  // ── SCROLL REVEAL ──
  function observeReveal() {
    const items = document.querySelectorAll('.reveal');
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          setTimeout(() => e.target.classList.add('visible'), i * 60);
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });
    items.forEach(el => obs.observe(el));
  }

  // ── INIT ──
  buildHeroStats();
  buildInstaGrid();
  buildSpotlight();
  buildMembers();
  buildBoard();
  buildEvents();
  observeReveal();

  function buildHeroStats() {
    const DEFAULT_HERO_STATS = {
      members: { value: '120+', label: 'Member Aktif' },
      karya:   { value: '48',   label: 'Karya Bulan Ini' },
      event:   { value: '12',   label: 'Event Tahunan' },
    };
    const saved = localStorage.getItem('youru_hero_stats');
    const stats = saved ? JSON.parse(saved) : DEFAULT_HERO_STATS;

    document.getElementById('heroStatMembers').textContent  = stats.members.value;
    document.getElementById('heroLabelMembers').textContent = stats.members.label;
    document.getElementById('heroStatKarya').textContent    = stats.karya.value;
    document.getElementById('heroLabelKarya').textContent   = stats.karya.label;
    document.getElementById('heroStatEvent').textContent    = stats.event.value;
    document.getElementById('heroLabelEvent').textContent   = stats.event.label;
  }