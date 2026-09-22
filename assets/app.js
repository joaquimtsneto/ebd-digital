// ============================================================
// EBD Digital — App Shell v9
// Injeta em toda página (via <script src="assets/app.js">):
// topbar minimal, menu hambúrguer, bottom nav, busca.
// Editar aqui = editar o site inteiro (226 páginas) de uma vez.
// ============================================================

var ICONS = {
  menu: '<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5"/>',
  close: '<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>',
  search: '<path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"/>',
  home: '<path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"/>',
  book: '<path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"/>',
  heart: '<path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"/>',
  more: '<path stroke-linecap="round" stroke-linejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"/>',
  chevLeft: '<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5"/>',
  chevRight: '<path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5"/>',
  mail: '<path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"/>',
  chat: '<path stroke-linecap="round" stroke-linejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"/>',
  info: '<path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"/>',
  question: '<path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"/>',
  user: '<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"/>',
  shield: '<path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.286Z"/>',
  star: '<path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"/>',
  link: '<path stroke-linecap="round" stroke-linejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"/>',
  check: '<path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5"/>',
  bookOpen: '<path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"/>'
};
var HEART_SOLID_PATH = 'M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z';
function heartSolid(cls) {
  return '<svg viewBox="0 0 24 24" fill="#E5484D" stroke="none"' + (cls ? ' class="' + cls + '"' : '') + '><path d="' + HEART_SOLID_PATH + '"/></svg>';
}
function icon(name, cls) {
  return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"' + (cls ? ' class="' + cls + '"' : '') + '>' + ICONS[name] + '</svg>';
}

var PAGE = (location.pathname.split('/').pop() || 'index.html');
var PAGE_LC = PAGE.toLowerCase();
var IS_HOME = PAGE_LC === 'index.html' || PAGE_LC === '' || PAGE_LC === '/';
var IS_REVISTA = /^revista_\d+_(indice|licao)/.test(PAGE_LC);
var IS_LESSON = /^revista_\d+_licao/.test(PAGE_LC);
var IS_BONUS = PAGE_LC.indexOf('bonus_') === 0;
var IS_APOIAR = PAGE_LC.indexOf('apoiar_') === 0 || PAGE_LC.indexOf('embaixador_') === 0;
var IS_SEARCH_PAGE = PAGE_LC.indexOf('pesquisar_') === 0;
var LESSON_MATCH = PAGE_LC.match(/^revista_(\d+)_licao_(\d+)/);
var CUR_REVISTA = LESSON_MATCH ? LESSON_MATCH[1] : null;
var CUR_LICAO = LESSON_MATCH ? LESSON_MATCH[2] : null;
var DAY_NAMES = ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado', 'Domingo'];

// ---------- Topbar minimal ----------
function buildTopbar() {
  var bar = document.querySelector('.topbar');
  if (!bar) return;
  bar.innerHTML =
    '<div class="app-topbar">' +
      '<button class="icon-btn" id="ebdMenuBtn" aria-label="Menu">' + icon('menu') + '</button>' +
      '<a href="index.html" class="app-brand">' + icon('book') + '<span>EBD Digital</span></a>' +
      '<div class="app-topbar-actions">' +
        '<a href="PRO_EBD_Digital.html" class="pro-topbar-link" aria-label="Área PRO">PRO</a>' +
        '<a href="Apoiar_EBD_Digital.html" class="icon-btn" id="ebdApoiarBtn" aria-label="Apoiar">' + heartSolid('heart-3d') + '</a>' +
      '</div>' +
    '</div>';
}

// ---------- Drawer (menu hambúrguer) ----------
var DRAWER_ITEMS = [
  { icon: 'home', label: 'Início', href: 'index.html' },
  { icon: 'shield', label: 'Área PRO', href: 'PRO_EBD_Digital.html', accent: true },
  { icon: 'search', label: 'Pesquisar', href: 'Pesquisar_EBD_Digital.html' },
  { icon: 'info', label: 'Como usar', href: 'Como_Usar_EBD_Digital.html' },
  { icon: 'question', label: 'Perguntas frequentes', href: 'FAQ_EBD_Digital.html' },
  { icon: 'user', label: 'Quem sou', href: 'Sobre_EBD_Digital.html' },
  { icon: 'heart', label: 'Apoiar', href: 'Apoiar_EBD_Digital.html', accent: true },
  { icon: 'mail', label: 'Contato', href: 'mailto:projetovoznodeserto@gmail.com' },
  { icon: 'shield', label: 'Política de Privacidade', href: 'Privacidade_EBD_Digital.html' }
];
function buildDrawer() {
  var overlay = document.createElement('div');
  overlay.className = 'app-drawer-overlay';
  overlay.id = 'ebdDrawerOverlay';

  var drawer = document.createElement('div');
  drawer.className = 'app-drawer';
  drawer.id = 'ebdDrawer';

  var itemsHtml = DRAWER_ITEMS.map(function (it) {
    var cls = it.accent ? ' class="accent"' : '';
    return '<a href="' + it.href + '"' + cls + '>' + icon(it.icon) + '<span>' + it.label + '</span></a>';
  }).join('');

  drawer.innerHTML =
    '<div class="app-drawer-head">' +
      '<a href="index.html" class="app-brand">' + icon('book') + '<span>EBD Digital</span></a>' +
      '<button class="icon-btn" id="ebdDrawerClose" style="color:var(--ink-soft)" aria-label="Fechar">' + icon('close') + '</button>' +
    '</div>' +
    '<nav>' + itemsHtml + '</nav>';

  document.body.appendChild(overlay);
  document.body.appendChild(drawer);

  function open() { overlay.classList.add('open'); drawer.classList.add('open'); }
  function close() { overlay.classList.remove('open'); drawer.classList.remove('open'); }

  var menuBtn = document.getElementById('ebdMenuBtn');
  if (menuBtn) menuBtn.addEventListener('click', open);
  document.getElementById('ebdDrawerClose').addEventListener('click', close);
  overlay.addEventListener('click', close);
}

// ---------- Bottom nav ----------
function buildBottomNav() {
  var nav = document.createElement('div');
  nav.className = 'app-bottomnav';
  nav.innerHTML =
    '<a href="index.html" class="' + (IS_HOME || IS_REVISTA ? 'active' : '') + '">' + icon('book') + '<span>Revistas</span></a>' +
    '<a href="Pesquisar_EBD_Digital.html" class="' + (IS_SEARCH_PAGE ? 'active' : '') + '">' + icon('search') + '<span>Pesquisa</span></a>' +
    '<a href="Apoiar_EBD_Digital.html" class="' + (IS_APOIAR ? 'active' : '') + '">' + icon('heart') + '<span>Apoiar</span></a>' +
    '<button id="ebdBottomMore">' + icon('more') + '<span>Mais</span></button>';
  document.body.appendChild(nav);

  document.getElementById('ebdBottomMore').addEventListener('click', function () {
    document.getElementById('ebdDrawerOverlay').classList.add('open');
    document.getElementById('ebdDrawer').classList.add('open');
  });
}


// ---------- Busca (dados compartilhados; usados pela página Pesquisar) ----------
var SEARCH_DATA = null;
function ebdLoadSearchData(cb) {
  if (SEARCH_DATA) { cb(SEARCH_DATA); return; }
  fetch('assets/search-index.json').then(function (r) { return r.json(); }).then(function (data) {
    SEARCH_DATA = data;
    cb(data);
  }).catch(function () { SEARCH_DATA = []; cb([]); });
}
function ebdRunSearch(q, data) {
  q = (q || '').trim().toLowerCase();
  var out = { revistas: [], lessons: [] };
  if (!q) return out;
  out.revistas = data.filter(function (r) { return r.title.toLowerCase().indexOf(q) !== -1; });
  data.forEach(function (r) {
    r.lessons.forEach(function (l) {
      if (l.title.toLowerCase().indexOf(q) !== -1 || (l.ref && l.ref.toLowerCase().indexOf(q) !== -1)) {
        out.lessons.push({ revista: r.title, num: r.num, l: l });
      }
    });
  });
  return out;
}

// ---------- Rodapé: sugestões + compartilhar (barra discreta) ----------
function buildFooterSuggest() {
  if (IS_HOME) return; // bloco removido da tela inicial — opções já vivem na página Apoiar
  var footerSupport = document.querySelector('.footer-support');
  var footerNav = document.querySelector('.footer-nav');
  var box = document.createElement('div');
  box.className = 'app-lesson-footer-bar';
  var html = '<span class="lfb-label">Sugestões</span>' +
    '<a href="https://wa.me/351932396829" target="_blank" rel="noopener" aria-label="WhatsApp">' + icon('chat') + '</a>' +
    '<a href="mailto:projetovoznodeserto@gmail.com" aria-label="E-mail">' + icon('mail') + '</a>';
  if (IS_LESSON) {
    html += '<button id="ebdShareBtn" aria-label="Compartilhar">' + icon('link') + '</button>';
  }
  box.innerHTML = html;
  if (footerSupport) {
    // insere logo depois do bloco de oração/compêndio (footer-support), por último no rodapé
    if (footerSupport.nextSibling) {
      footerSupport.parentNode.insertBefore(box, footerSupport.nextSibling);
    } else {
      footerSupport.parentNode.appendChild(box);
    }
  } else if (footerNav) {
    footerNav.parentNode.insertBefore(box, footerNav);
  } else {
    document.body.appendChild(box);
  }
  var shareBtn = document.getElementById('ebdShareBtn');
  if (shareBtn) shareBtn.addEventListener('click', function () { ebdCopyLink(shareBtn); });
}

// ============================================================
// Leitura da Semana
// ============================================================
var READINGS_DATA = null;
var BIBLE_DATA = null;
var BIBLE_BY_ABBREV = null;

function ebdLoadReadings(cb) {
  if (READINGS_DATA) { cb(READINGS_DATA); return; }
  fetch('assets/readings-data.json').then(function (r) { return r.json(); }).then(function (data) {
    READINGS_DATA = data;
    cb(data);
  }).catch(function () { cb(null); });
}
function ebdLoadBible(cb) {
  if (BIBLE_DATA) { cb(BIBLE_DATA); return; }
  fetch('assets/bible-arc.json').then(function (r) { return r.json(); }).then(function (data) {
    BIBLE_DATA = data;
    BIBLE_BY_ABBREV = {};
    data.forEach(function (b) { BIBLE_BY_ABBREV[b.abbrev] = b; });
    cb(data);
  }).catch(function () { cb(null); });
}

// ---------- Progresso (LocalStorage) ----------
function ebdProgressKey() { return 'ebdReadProgress'; }
function ebdGetAllProgress() {
  try {
    return JSON.parse(localStorage.getItem(ebdProgressKey())) || {};
  } catch (e) { return {}; }
}
function ebdGetProgress(revista, licao) {
  var all = ebdGetAllProgress();
  var key = 'R' + revista + 'L' + licao;
  return all[key] || [false, false, false, false, false, false, false];
}
function ebdSetProgress(revista, licao, dayIdx, done) {
  var all = ebdGetAllProgress();
  var key = 'R' + revista + 'L' + licao;
  var cur = all[key] || [false, false, false, false, false, false, false];
  cur[dayIdx] = done;
  all[key] = cur;
  try { localStorage.setItem(ebdProgressKey(), JSON.stringify(all)); } catch (e) {}
}

// ---------- Reordena o rodapé: Setas > Leitura da Semana > Oração > Sugestões ----------
function relocateFooterNav() {
  var footerNav = document.querySelector('.footer-nav');
  var footerSupport = document.querySelector('.footer-support');
  if (footerNav && footerSupport) {
    footerSupport.parentNode.insertBefore(footerNav, footerSupport);
  }
}

// ---------- Seção "Leitura da Semana" ----------
function buildWeekReading() {
  if (!IS_LESSON || !CUR_REVISTA || !CUR_LICAO) return;
  var anchor = document.querySelector('.footer-support') || document.querySelector('.footer-nav');
  if (!anchor) return;

  var section = document.createElement('div');
  section.className = 'app-week-reading';
  section.innerHTML =
    '<div class="wr-label">' + icon('bookOpen') + '<span>Leitura da Semana</span></div>' +
    '<div class="app-week-list" id="ebdWeekDots"></div>';
  anchor.parentNode.insertBefore(section, anchor);

  ebdLoadReadings(function (data) {
    if (!data) return;
    var revistaData = data[CUR_REVISTA];
    var refs = revistaData ? revistaData[CUR_LICAO] : null;
    if (!refs || !refs.length) { section.style.display = 'none'; return; }
    var progress = ebdGetProgress(CUR_REVISTA, CUR_LICAO);
    var listWrap = document.getElementById('ebdWeekDots');
    listWrap.innerHTML = refs.map(function (ref, i) {
      var done = progress[i] ? ' done' : '';
      return '<button class="' + done.trim() + '" data-day="' + i + '">' +
        '<span class="wd-circle">' + icon('check') + '</span>' +
        '<span class="wl-day">' + DAY_NAMES[i] + '</span>' +
        '<span class="wl-ref">' + ref.display + '</span>' +
        '</button>';
    }).join('');
    listWrap.querySelectorAll('button').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var i = parseInt(btn.getAttribute('data-day'), 10);
        openReadModal(refs[i], i);
      });
    });
  });
}

// ---------- Modal de leitura ----------
function buildReadModal() {
  var overlay = document.createElement('div');
  overlay.className = 'app-read-overlay';
  overlay.id = 'ebdReadOverlay';
  overlay.innerHTML =
    '<div class="app-read-modal">' +
      '<div class="app-read-head">' +
        '<div><div class="rh-day" id="ebdReadDay"></div><div class="rh-ref" id="ebdReadRef"></div></div>' +
        '<button id="ebdReadClose">' + icon('close') + '</button>' +
      '</div>' +
      '<div class="app-read-body" id="ebdReadBody"><div class="rb-loading">Carregando texto…</div></div>' +
      '<div class="app-read-foot">' +
        '<button class="rf-done" id="ebdReadDoneBtn">' + icon('check') + '<span>Concluir leitura</span></button>' +
        '<button class="rf-close" id="ebdReadCloseBtn">Fechar</button>' +
      '</div>' +
    '</div>';
  document.body.appendChild(overlay);
  document.getElementById('ebdReadClose').addEventListener('click', closeReadModal);
  document.getElementById('ebdReadCloseBtn').addEventListener('click', closeReadModal);
  overlay.addEventListener('click', function (e) { if (e.target === overlay) closeReadModal(); });
}

var CUR_READ = null; // { ref, dayIdx }

function renderVerseText(ref) {
  var body = document.getElementById('ebdReadBody');
  ebdLoadBible(function (bible) {
    if (!bible) { body.innerHTML = '<div class="rb-loading">Não foi possível carregar o texto agora.</div>'; return; }
    var book = BIBLE_BY_ABBREV[ref.abbrev];
    if (!book) { body.innerHTML = '<div class="rb-loading">Referência não encontrada.</div>'; return; }
    var verses = book.chapters[ref.chapter - 1] || [];
    var vstart = ref.vstart || 1;
    var vend = ref.vend || vstart;
    var html = '';
    for (var v = vstart; v <= vend; v++) {
      var text = verses[v - 1];
      if (text) html += '<p><span class="rv-num">' + v + '</span>' + text + '</p>';
    }
    body.innerHTML = html || '<div class="rb-loading">Texto não disponível.</div>';
  });
}

function openReadModal(ref, dayIdx) {
  CUR_READ = { ref: ref, dayIdx: dayIdx };
  document.getElementById('ebdReadDay').textContent = DAY_NAMES[dayIdx];
  document.getElementById('ebdReadRef').textContent = ref.display;
  document.getElementById('ebdReadBody').innerHTML = '<div class="rb-loading">Carregando texto…</div>';
  var progress = ebdGetProgress(CUR_REVISTA, CUR_LICAO);
  var doneBtn = document.getElementById('ebdReadDoneBtn');
  updateDoneBtn(doneBtn, !!progress[dayIdx]);
  document.getElementById('ebdReadOverlay').classList.add('open');
  renderVerseText(ref);
}
function updateDoneBtn(btn, isDone) {
  btn.classList.toggle('is-done', isDone);
  btn.innerHTML = isDone ? (icon('check') + '<span>Lido ✓</span>') : (icon('check') + '<span>Concluir leitura</span>');
}
function closeReadModal() {
  document.getElementById('ebdReadOverlay').classList.remove('open');
}
document.addEventListener('DOMContentLoaded', function () {
  buildReadModal();
  document.getElementById('ebdReadDoneBtn').addEventListener('click', function () {
    if (!CUR_READ) return;
    var progress = ebdGetProgress(CUR_REVISTA, CUR_LICAO);
    var newVal = !progress[CUR_READ.dayIdx];
    ebdSetProgress(CUR_REVISTA, CUR_LICAO, CUR_READ.dayIdx, newVal);
    updateDoneBtn(document.getElementById('ebdReadDoneBtn'), newVal);
    var dotBtn = document.querySelector('#ebdWeekDots button[data-day="' + CUR_READ.dayIdx + '"]');
    if (dotBtn) dotBtn.classList.toggle('done', newVal);
  });
});

// ---------- Nota de direitos autorais ----------
function buildCopyright() {
  var el = document.createElement('div');
  el.className = 'app-copyright';
  el.textContent = IS_HOME
    ? '\u00A9 EBD Digital \u2014 Todos os direitos reservados. Reprodução total ou parcial somente com autorização do autor.'
    : '\u00A9 EBD Digital \u2014 Todos os direitos reservados. Pr. Joaquim Teixeira';
  document.body.appendChild(el);
}

// ---------- Chamada pública para Área PRO ----------
function buildProTeaser() {
  if (!IS_LESSON) return;
  if (document.querySelector('.ebd-pro-teaser')) return;
  var anchor = document.querySelector('.footer-support');
  if (!anchor) return;
  var box = document.createElement('section');
  box.className = 'ebd-pro-teaser';
  box.innerHTML =
    '<div class="pro-teaser-label">' + icon('shield') + ' Conteúdo PRO</div>' +
    '<h3>Materiais exclusivos para professores e igrejas participantes</h3>' +
    '<p>Esta lição possui recursos adicionais para preparação e condução da aula, incluindo Guia do Professor, apresentação em PDF e Áudio-Lição.</p>' +
    '<a href="PRO_EBD_Digital.html">Saiba como acessar</a>';
  anchor.parentNode.insertBefore(box, anchor);
}

// ============================================================
// Init
// ============================================================
document.addEventListener('DOMContentLoaded', function () {
  buildTopbar();
  buildDrawer();
  buildBottomNav();
  relocateFooterNav();
  buildWeekReading();
  buildFooterSuggest();
  buildProTeaser();
  buildCopyright();
});

// ---------- Collapses (já existentes) ----------
document.addEventListener('click', function (e) {
  var btn = e.target.closest('.collapse-btn');
  if (btn) {
    btn.closest('.collapse').classList.toggle('open');
  }
});

// ---------- Caixa de oração (mantida) ----------
var SUPPORT_BOX_HTML =
  '<div class="collapse" id="apoio">' +
    '<button class="collapse-btn">Precisamos da sua oração <svg class="chev" viewBox="0 0 24 24"><path d="M4 8l8 8 8-8"/></svg></button>' +
    '<div class="collapse-body"><div class="collapse-inner">' +
      '<p>Por favor ore por esse projeto para que ele continue acessível ao maior número de pessoas possível ao redor do mundo. Contamos com seu apoio!</p>' +
    '</div></div>' +
  '</div>';

document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.support-box-slot').forEach(function (slot) {
    slot.outerHTML = SUPPORT_BOX_HTML;
  });
});

function ebdCopyLink(btn) {
  var url = window.location.href;
  var label = btn.querySelector('span');
  var original = label ? label.textContent : null;
  function done(ok) {
    if (label) {
      label.textContent = ok ? 'Link copiado!' : 'Não foi possível copiar';
      setTimeout(function () { label.textContent = original; }, 2200);
    } else {
      btn.setAttribute('title', ok ? 'Link copiado!' : 'Não foi possível copiar');
      setTimeout(function () { btn.removeAttribute('title'); }, 2200);
    }
    btn.classList.toggle('copied', ok);
    setTimeout(function () { btn.classList.remove('copied'); }, 2200);
  }
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(url).then(function () { done(true); }, function () { done(false); });
  } else {
    try {
      var tmp = document.createElement('textarea');
      tmp.value = url;
      document.body.appendChild(tmp);
      tmp.select();
      document.execCommand('copy');
      document.body.removeChild(tmp);
      done(true);
    } catch (e) {
      done(false);
    }
  }
}
