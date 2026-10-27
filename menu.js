'use strict';
/* 좌측 상단 메뉴(서랍) + 설정 창 + 나의 점괘 보관함 창 + 개인정보 보호 안내 창.
   모든 페이지에서 공용으로 쓰며, 서랍·창은 이 파일이 body에 직접 만든다.
   요구 사항: 페이지에 #menuBtn 버튼이 있어야 하고, i18n.js · store.js · core.js 다음에 로드한다. */

/* ★ 나중에 페이지를 만들면 여기 href만 바꾸면 됩니다. (action 항목은 창을 엽니다) */
const MENU_ITEMS = [
  { id: 'about',    key: 'menu.about',    glyph: '☯', href: 'about.html' },
  { id: 'list',     key: 'menu.list',     glyph: '☰', href: 'hexagram-list.html' },
  { id: 'vault',    key: 'menu.vault',    glyph: '☷', action: 'vault' },
  { id: 'settings', key: 'menu.settings', glyph: '⚙', action: 'settings' },
  { id: 'privacy',  key: 'menu.privacy',  glyph: '🔒', action: 'privacy' },
  { id: 'contact',  key: 'menu.contact',  glyph: '✉', href: 'mailto:mubig864@gmail.com' }
];

(function () {
  const menuBtn = document.getElementById('menuBtn');
  if (!menuBtn) return;

  const el = (tag, cls, attrs) => {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (attrs) Object.keys(attrs).forEach(k => e.setAttribute(k, attrs[k]));
    return e;
  };

  // ---------- 서랍 ----------
  const backdrop = el('div', 'drawer-backdrop');
  const drawer = el('nav', 'drawer', { id: 'drawer', 'aria-labelledby': 'drawerTitle' });
  drawer.inert = true;

  const drawerHead = el('div', 'drawer-head');
  const drawerTitle = el('h2', null, { id: 'drawerTitle', 'data-i18n': 'menu.title' });
  const drawerClose = el('button', 'icon-btn', { type: 'button', 'data-i18n-aria': 'menu.close' });
  drawerClose.textContent = '✕';
  drawerHead.append(drawerTitle, drawerClose);

  const list = el('ul', 'drawer-list');
  MENU_ITEMS.forEach(item => {
    const li = el('li');
    const node = item.href ? el('a', 'drawer-item', { href: item.href }) : el('button', 'drawer-item', { type: 'button' });
    node.dataset.menuId = item.id;
    const glyph = el('span', 'drawer-glyph', { 'aria-hidden': 'true' });
    glyph.textContent = item.glyph;
    const label = el('span', null, { 'data-i18n': item.key });
    node.append(glyph, label);
    if (item.action) node.addEventListener('click', () => { closeDrawer(false); openSheet(item.action); });
    li.appendChild(node);
    list.appendChild(li);
  });
  drawer.append(drawerHead, list);

  // ---------- 설정 창 ----------
  const settingsDlg = el('dialog', 'sheet', { 'aria-labelledby': 'settingsTitle' });
  settingsDlg.innerHTML =
    '<div class="sheet-head"><h2 id="settingsTitle" data-i18n="settings.title"></h2>' +
    '<button type="button" class="icon-btn" data-close data-i18n-aria="settings.close">✕</button></div>' +
    '<div class="sheet-body">' +
    '<div class="setting-row"><h3 data-i18n="settings.theme"></h3>' +
    '<div class="seg" role="group" data-seg="theme">' +
    '<button type="button" data-val="dark" data-i18n="settings.theme.dark"></button>' +
    '<button type="button" data-val="light" data-i18n="settings.theme.light"></button></div></div>' +
    '<div class="setting-row"><h3 data-i18n="settings.lang"></h3>' +
    '<div class="seg" role="group" data-seg="lang">' +
    '<button type="button" data-val="ko" data-i18n="settings.lang.ko"></button>' +
    '<button type="button" data-val="en" data-i18n="settings.lang.en"></button></div>' +
    '<p class="hint" data-i18n="settings.langHint"></p></div></div>';

  // ---------- 개인정보 보호 안내 창 ----------
 const privacyDlg = el('dialog', 'sheet', { 'aria-labelledby': 'privacyTitle' });
  privacyDlg.innerHTML =
    '<div class="sheet-head"><h2 id="privacyTitle" data-i18n="privacy.title"></h2>' +
    '<button type="button" class="icon-btn" data-close data-i18n-aria="settings.close">✕</button></div>' +
    '<div class="sheet-body" style="line-height: 1.7; font-size: 0.92rem; word-break: keep-all;">' +
    '<p style="margin-bottom: 14px;" data-i18n-html="privacy.p1"></p>' +
    '<p style="margin-bottom: 14px;" data-i18n-html="privacy.p2"></p>' +
    '<p style="margin-bottom: 14px;" data-i18n-html="privacy.p3"></p>' +
    '<p style="margin-bottom: 0;" data-i18n-html="privacy.p4"></p>' +
    '</div>';

  // ---------- 보관함 창 ----------
  const vaultDlg = el('dialog', 'sheet', { 'aria-labelledby': 'vaultTitle' });
  vaultDlg.innerHTML =
    '<div class="sheet-head"><h2 id="vaultTitle" data-i18n="vault.title"></h2>' +
    '<button type="button" class="icon-btn" data-close data-i18n-aria="settings.close">✕</button></div>' +
    '<div class="sheet-body">' +
    '<p class="vault-count" id="vaultCount"></p>' +
    '<p class="vault-warn hidden" id="vaultWarn" data-i18n="vault.unavailable"></p>' +
    '<p class="vault-empty hidden" id="vaultEmpty" data-i18n="vault.empty"></p>' +
    '<ul class="vault-list" id="vaultList"></ul>' +
    '<div class="vault-foot"><button type="button" class="ghost" id="vaultClear" data-i18n="vault.clear"></button></div></div>';

  document.body.append(backdrop, drawer, settingsDlg, privacyDlg, vaultDlg);

  // ---------- 서랍 열고 닫기 ----------
  const appRoot = document.querySelector('.app');
  function openDrawer() {
    document.body.classList.add('menu-open');
    drawer.inert = false;
    if (appRoot) appRoot.inert = true;
    menuBtn.setAttribute('aria-expanded', 'true');
    const first = drawer.querySelector('.drawer-item');
    if (first) first.focus();
  }
  function closeDrawer(restoreFocus) {
    document.body.classList.remove('menu-open');
    drawer.inert = true;
    if (appRoot) appRoot.inert = false;
    menuBtn.setAttribute('aria-expanded', 'false');
    if (restoreFocus !== false) menuBtn.focus();
  }
  menuBtn.setAttribute('aria-controls', 'drawer');
  menuBtn.setAttribute('aria-expanded', 'false');
  menuBtn.addEventListener('click', () => (document.body.classList.contains('menu-open') ? closeDrawer() : openDrawer()));
  drawerClose.addEventListener('click', () => closeDrawer());
  backdrop.addEventListener('click', () => closeDrawer());
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && document.body.classList.contains('menu-open')) closeDrawer();
  });

  // ---------- 창(dialog) 열고 닫기 ----------
  function openSheet(name) {
    let dlg = settingsDlg;
    if (name === 'vault') {
      dlg = vaultDlg;
      renderVault();
    } else if (name === 'privacy') {
      dlg = privacyDlg;
    } else {
      syncSettingsUI();
    }
    if (dlg.showModal) dlg.showModal(); else dlg.setAttribute('open', '');
  }
  [settingsDlg, privacyDlg, vaultDlg].forEach(dlg => {
    dlg.addEventListener('click', e => {
      if (e.target === dlg || e.target.closest('[data-close]')) dlg.close();   // 바깥(배경) 클릭 또는 ✕
    });
    dlg.addEventListener('close', () => menuBtn.focus({ preventScroll: true }));
  });

  // ---------- 설정 ----------
  function syncSettingsUI() {
    const s = getSettings();
    settingsDlg.querySelectorAll('[data-seg="theme"] button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.val === s.theme)));
    settingsDlg.querySelectorAll('[data-seg="lang"] button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.val === s.lang)));
  }
  settingsDlg.addEventListener('click', e => {
    const b = e.target.closest('.seg button');
    if (!b) return;
    const kind = b.parentElement.dataset.seg;
    if (kind === 'theme') setTheme(b.dataset.val);
    if (kind === 'lang') setLang(b.dataset.val);
    syncSettingsUI();
  });

  // ---------- 보관함 ----------
  const vaultListEl = vaultDlg.querySelector('#vaultList');
  const vaultCountEl = vaultDlg.querySelector('#vaultCount');
  const vaultEmptyEl = vaultDlg.querySelector('#vaultEmpty');
  const vaultWarnEl = vaultDlg.querySelector('#vaultWarn');
  const vaultClearBtn = vaultDlg.querySelector('#vaultClear');

  const formatDate = ts => new Date(ts).toLocaleString(getLang() === 'en' ? 'en-US' : 'ko-KR', { dateStyle: 'medium', timeStyle: 'short' });

  // 두 번 눌러야 실행되는 버튼 (확인 창 대신 — 일부 환경에서는 confirm()이 막혀 있음)
  function armedClick(btn, label, sureKey, run) {
    let timer = null;
    btn.addEventListener('click', e => {
      e.stopPropagation();
      if (btn.dataset.armed) { clearTimeout(timer); run(); return; }
      btn.dataset.armed = '1';
      btn.textContent = t(sureKey);
      btn.classList.add('danger');
      timer = setTimeout(() => {
        delete btn.dataset.armed;
        btn.textContent = t(label);
        btn.classList.remove('danger');
      }, 3000);
    });
  }

  function renderVault() {
    const records = vaultList();
    vaultListEl.replaceChildren();
    vaultCountEl.textContent = records.length ? t('vault.count', { n: records.length }) : '';
    vaultEmptyEl.classList.toggle('hidden', records.length > 0);
    vaultWarnEl.classList.toggle('hidden', storagePersistent);
    vaultClearBtn.classList.toggle('hidden', records.length === 0);
    vaultClearBtn.textContent = t('vault.clear');
    vaultClearBtn.classList.remove('danger');
    delete vaultClearBtn.dataset.armed;

    records.forEach(rec => {
      let info;
      try { info = analyzeValues(rec.values); } catch (e) { console.error('보관함 기록을 표시하지 못했습니다:', e); return; }   // 기록 하나가 이상해도 창은 열리도록
      const li = el('li', 'vault-item');

      const mini = el('div', 'vault-mini');
      mini.appendChild(miniHexagram(info.lineList, info.changingIdx));

      const body = el('div', 'vault-info');
      const title = el('div', 'vault-title');
      const nameFrom = shortName(info.reading.name);
      title.textContent = info.changingIdx.length ? `${nameFrom} ${t('vault.arrow')} ${shortName(info.changed.name)}` : nameFrom;
      const meta = el('div', 'vault-meta');
      meta.textContent = `${formatDate(rec.savedAt)} · ${t('vault.method.' + rec.method)}`;
      const q = el('div', 'vault-q');
      q.textContent = rec.question ? rec.question : t('vault.noQuestion');
      if (!rec.question) q.classList.add('muted');
      body.append(title, meta, q);

      const actions = el('div', 'vault-actions');
      const viewBtn = el('button', 'secondary small', { type: 'button' });
      viewBtn.textContent = t('vault.view');
      viewBtn.addEventListener('click', () => openSaved(rec.id));
      const delBtn = el('button', 'ghost small', { type: 'button' });
      delBtn.textContent = t('vault.delete');
      armedClick(delBtn, 'vault.delete', 'vault.deleteSure', () => { vaultRemove(rec.id); renderVault(); });
      actions.append(viewBtn, delBtn);

      li.append(mini, body, actions);
      vaultListEl.appendChild(li);
    });
  }
  armedClick(vaultClearBtn, 'vault.clear', 'vault.clearSure', () => { vaultClear(); renderVault(); });

  function openSaved(id) {
    vaultDlg.close();
    if (document.getElementById('resultCard') && typeof renderSavedReading === 'function') {
      location.hash = 'view=' + id;   // hashchange → handleViewHash()가 결과를 그린다
    } else {
      location.href = 'index.html#view=' + id;
    }
  }

  // 언어가 바뀌면 열려 있는 보관함·설정도 다시 그린다
  onLangChange(() => { if (vaultDlg.open) renderVault(); });
  // 다른 탭에서 보관함이 바뀌면 반영
  window.addEventListener('storage', e => { if (e.key === VAULT_KEY && vaultDlg.open) renderVault(); });

  // 서랍 안의 링크를 눌러 이동할 때 현재 페이지와 같은 곳이면 닫기만
  drawer.addEventListener('click', e => {
    const a = e.target.closest('a.drawer-item');
    if (a && a.getAttribute('href') === location.pathname.split('/').pop()) closeDrawer(false);
  });
})();

// ===== 시작: 저장된 설정 적용 =====
(function bootstrap() {
  const s = getSettings();
  applyTheme(s.theme);
  setLang(s.lang, false);
  if (typeof handleViewHash === 'function') {
    handleViewHash();
    window.addEventListener('hashchange', handleViewHash);
  }
})();