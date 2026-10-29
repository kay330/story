'use strict';
/* 로컬 저장소(localStorage) — 설정과 '나의 점괘 보관함'.
   브라우저가 저장소를 막은 경우(사생활 보호 모드 등)에는 메모리에만 임시 보관하고, 저장 성공 여부를 반환한다. */

const SETTINGS_KEY = 'juyeok.settings.v1';
const VAULT_KEY = 'juyeok.vault.v1';
const VAULT_MAX = 300;
const memoryStore = {};
let storagePersistent = true;

function lsGet(key) {
  try { return localStorage.getItem(key); } catch (e) { storagePersistent = false; return memoryStore[key] === undefined ? null : memoryStore[key]; }
}
function lsSet(key, value) {
  try { localStorage.setItem(key, value); return true; } catch (e) { storagePersistent = false; memoryStore[key] = value; return false; }
}

// ===== 설정 =====
const DEFAULT_SETTINGS = { theme: 'dark', lang: 'ko' };

function getSettings() {
  let s = {};
  try { s = JSON.parse(lsGet(SETTINGS_KEY)) || {}; } catch (e) { s = {}; }
  return {
    theme: ['dark', 'light'].includes(s.theme) ? s.theme : DEFAULT_SETTINGS.theme,
    lang: ['ko', 'en'].includes(s.lang) ? s.lang : DEFAULT_SETTINGS.lang
  };
}
function setSetting(key, value) {
  const s = getSettings();
  s[key] = value;
  return lsSet(SETTINGS_KEY, JSON.stringify(s));
}

// ===== 테마 =====
function resolveTheme(pref) {
  return pref === 'light' ? 'light' : 'dark';
}
function applyTheme(pref) {
  const theme = resolveTheme(pref);
  document.documentElement.dataset.theme = theme;
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', theme === 'light' ? '#f7f0e6' : '#1a110b');
}
function setTheme(pref) {
  setSetting('theme', pref);
  applyTheme(pref);
}
// ===== 점괘 보관함 =====
// 기록에는 '뽑은 효 값(6~9)'과 질문, 시각만 저장한다. 괘 이름·풀이는 열 때마다 최신 데이터로 다시 만든다.
function validRecord(r) {
  return r && typeof r.id === 'string' && Array.isArray(r.values) && r.values.length === 6
    && r.values.every(v => v === 6 || v === 7 || v === 8 || v === 9);
}

function vaultList() {
  let arr = [];
  try { arr = JSON.parse(lsGet(VAULT_KEY)) || []; } catch (e) { arr = []; }
  if (!Array.isArray(arr)) arr = [];
  return arr.filter(validRecord).sort((a, b) => (b.savedAt || 0) - (a.savedAt || 0));
}

function vaultWrite(arr) {
  return lsSet(VAULT_KEY, JSON.stringify(arr));
}

function vaultGet(id) {
  return vaultList().find(r => r.id === id) || null;
}

// 저장 후 { ok, id, record } 반환. ok=false 이면 이 브라우저에서는 영구 저장이 안 된 것.
function vaultAdd({ values, question, method }) {
  const record = {
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 7),
    savedAt: Date.now(),
    values: values.slice(),
    question: (question || '').slice(0, 500),
    method: method === 'yarrow' ? 'yarrow' : 'simple'
  };
  const list = vaultList();
  list.unshift(record);
  const ok = vaultWrite(list.slice(0, VAULT_MAX));
  return { ok, id: record.id, record };
}

// 저장된 기록의 질문만 고친다. 성공하면 true.
function vaultUpdateQuestion(id, question) {
  const list = vaultList();
  const rec = list.find(r => r.id === id);
  if (!rec) return false;
  rec.question = (question || '').trim().slice(0, 500);
  return vaultWrite(list);
}

function vaultRemove(id) {
  return vaultWrite(vaultList().filter(r => r.id !== id));
}
function vaultClear() {
  return vaultWrite([]);
}
