'use strict';
/* 공통 로직 — index.html(간편)·original.html(서시법) 공용. hexagrams.js 다음에 로드 */

// ===== DOM =====
const $ = id => document.getElementById(id);
const tapZone = $('tapZone');
const autoBtn = $('autoBtn');
const resetBtn = $('resetBtn');
const progressText = $('progressText');
const tapInfo = $('tapInfo');
const tapCount = $('tapCount');
const hexagramStack = $('hexagramStack');
const resultCard = $('resultCard');
const resultBadge = $('resultBadge');
const hexagramName = $('hexagramName');
const trigramNote = $('trigramNote');
const hexagramKeyword = $('hexagramKeyword');
const hexCompare = $('hexCompare');
const exampleQuestion = $('exampleQuestion');
const resultIntro = $('resultIntro');
const coreReading = $('coreReading');
const situationMeaning = $('situationMeaning');
const practicalList = $('practicalList');
const actionList = $('actionList');
const exampleText = $('exampleText');
const changeText = $('changeText');
const questionInput = $('question');
const livePreview = $('livePreview');
const liveLinePreview = $('liveLinePreview');
const liveLineText = $('liveLineText');

// ===== 공유 상태 =====
let lines = [];       // 아래(1효)부터 위(6효) 순서
let drawRun = 0;      // 리셋 시 진행 중인 연출을 취소하기 위한 토큰
let busy = false;     // 연출 진행 중 중복 입력 방지

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
function vibrate(pattern) {
  try { if (navigator.vibrate) navigator.vibrate(pattern); } catch (e) {}
}

// ===== 난수 =====
// 전통 확률 (시초점, 계사전 '대연지수' 방식): 노음 6 = 1/16, 소양 7 = 5/16, 소음 8 = 7/16, 노양 9 = 3/16
// 터치 입력(시각·좌표·누른 시간)을 해시로 누적하고 보안 난수와 XOR로 섞는다.
// 한쪽이 균등 난수이므로 입력 패턴이 치우쳐도 확률은 유지되고, 입력으로 결과를 노릴 수도 없다.
const LINE_WEIGHTS = [
  { value: 6, weight: 1 },
  { value: 7, weight: 5 },
  { value: 8, weight: 7 },
  { value: 9, weight: 3 }
];

let entropyState = [0x243f6a88, 0x85a308d3, 0x13198a2e, 0x03707344];
let entropyCount = 0;

function mixEntropy(...values) {
  let [h1, h2, h3, h4] = entropyState;
  for (const v of values) {
    const k = ((Number(v) || 0) * 1000) | 0;
    h1 = h2 ^ Math.imul(h1 ^ k, 597399067);
    h2 = h3 ^ Math.imul(h2 ^ k, 2869860233);
    h3 = h4 ^ Math.imul(h3 ^ k, 951274213);
    h4 = h1 ^ Math.imul(h4 ^ k, 2716044179);
  }
  entropyState = [h1, h2, h3, h4];
}

function userEntropyWord() {
  mixEntropy(performance.now(), entropyCount++);
  let [h1, h2, h3, h4] = entropyState;
  h1 = Math.imul(h3 ^ (h1 >>> 18), 597399067);
  h2 = Math.imul(h4 ^ (h2 >>> 22), 2869860233);
  h3 = Math.imul(h1 ^ (h3 >>> 17), 951274213);
  h4 = Math.imul(h2 ^ (h4 >>> 19), 2716044179);
  return (h1 ^ h2 ^ h3 ^ h4) >>> 0;
}

function secureWord() {
  try {
    if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
      const a = new Uint32Array(1);
      crypto.getRandomValues(a);
      return a[0];
    }
  } catch (e) {}
  return (Math.random() * 4294967296) >>> 0;
}

function randomUnit() {
  return ((userEntropyWord() ^ secureWord()) >>> 0) / 4294967296;
}

function mapValueToLine(value) {
  return {
    value,
    type: (value === 7 || value === 9) ? 'yang' : 'yin',
    changing: (value === 6 || value === 9)
  };
}

function randomLine() {
  const total = LINE_WEIGHTS.reduce((sum, item) => sum + item.weight, 0);
  let r = randomUnit() * total;
  for (const item of LINE_WEIGHTS) {
    if (r < item.weight) return mapValueToLine(item.value);
    r -= item.weight;
  }
  return mapValueToLine(8);
}

// ===== 렌더링 =====
function renderLineGraphic(container, line) {
  if (line.type === 'yang') {
    container.innerHTML = '<div class="yang-line"></div>';
  } else {
    container.innerHTML = '<div class="yin-wrap"><div class="yin-line-left"></div><div class="yin-line-right"></div></div>';
  }
  if (line.changing) {
    const mark = document.createElement('div');
    mark.className = 'changing-mark';
    mark.textContent = '변';
    container.appendChild(mark);
  }
}

function describeLine(line, index) {
  const lineType = line.type === 'yang' ? '양효' : '음효';
  const changeType = line.changing ? '변화가 예정된 효입니다.' : '안정적으로 작용하는 효입니다.';
  return `${index}번째로 뽑힌 효는 ${lineType}이며, ${changeType}`;
}

function renderLiveLine(line, index) {
  livePreview.style.display = 'block';
  liveLinePreview.innerHTML = '';
  renderLineGraphic(liveLinePreview, line);
  liveLineText.textContent = describeLine(line, index);
  tapInfo.textContent = `${index} 번째 효를 뽑았습니다`;
}

function renderLines() {
  progressText.textContent = `현재 효: ${lines.length} / 6`;
  const frag = document.createDocumentFragment();
  const combined = [...Array(6 - lines.length).fill(null), ...[...lines].reverse()];
  combined.forEach((line, index) => {
    const row = document.createElement('div');
    row.className = 'line-row';
    const label = document.createElement('div');
    label.className = 'line-label';
    label.textContent = `${6 - index}효`;
    const box = document.createElement('div');
    box.className = 'iching-line';
    if (line) renderLineGraphic(box, line);
    else box.innerHTML = '<div class="empty-line"></div>';
    row.append(label, box);
    frag.appendChild(row);
  });
  hexagramStack.replaceChildren(frag);
}

// ===== 결과 =====
const sentence = s => /[.!?]$/.test(s) ? s : s + '.';
const TRIGRAMS = {
  '111': ['☰', '하늘'], '110': ['☱', '연못'], '101': ['☲', '불'], '100': ['☳', '우레'],
  '011': ['☴', '바람'], '010': ['☵', '물'], '001': ['☶', '산'], '000': ['☷', '땅']
};

// 괘 이름이 뜻하는 위·아래 자연물 (키는 아래→위 순서이므로 앞 3개가 아래, 뒤 3개가 위)
function trigramText(binary) {
  const lower = TRIGRAMS[binary.slice(0, 3)], upper = TRIGRAMS[binary.slice(3)];
  return `위 ${upper[0]} ${upper[1]} · 아래 ${lower[0]} ${lower[1]}`;
}

// 작은 괘 그림 (위가 6효). highlight: 변하는 효의 인덱스 목록(0 = 1효)
function miniHexagram(lineList, highlight) {
  const box = document.createElement('div');
  box.className = 'mini-hex';
  for (let i = 5; i >= 0; i--) {
    const row = document.createElement('div');
    row.className = 'iching-line' + (highlight.includes(i) ? ' hl' : '');
    renderLineGraphic(row, lineList[i]);
    box.appendChild(row);
  }
  return box;
}

function hexFigure(title, name, lineList, highlight) {
  const fig = document.createElement('div');
  fig.className = 'hex-figure';
  const t = document.createElement('div'); t.className = 'hex-figure-title'; t.textContent = title;
  const n = document.createElement('div'); n.className = 'hex-figure-name'; n.textContent = name.split(' (')[0];
  fig.append(t, miniHexagram(lineList, highlight), n);
  return fig;
}

const shortName = n => n.split(' (')[0];
// 한글 조사 선택: 마지막 글자의 받침 유무 (ㄹ 받침은 '로' 계열 취급)
function josa(word, withBatchim, without, rieulSame = false) {
  const c = word.charCodeAt(word.length - 1) - 0xAC00;
  if (c < 0 || c > 11171) return without;
  const jong = c % 28;
  if (jong === 0 || (rieulSame && jong === 8)) return without;
  return withBatchim;
}

function buildChangeParagraphs(changingIdx, lineList, reading, changed) {
  if (!changingIdx.length) {
    return [`바뀌는 효가 없어서 “${shortName(reading.name)}”의 흐름이 큰 변화 없이 이어질 가능성이 큽니다. 위 풀이를 지금 상황에 그대로 적용해 보세요.`];
  }
  const fmt = arr => arr.length === 6 ? '여섯 효 모두' : arr.map(i => i + 1).join('·') + '효';
  const yang = changingIdx.filter(i => lineList[i].type === 'yang');
  const yin = changingIdx.filter(i => lineList[i].type === 'yin');
  const how = [];
  if (yang.length) how.push(`${fmt(yang)}${yang.length === 6 ? '의' : '는'} 양이 극에 달해 음으로`);
  if (yin.length) how.push(`${fmt(yin)}${yin.length === 6 ? '의' : '는'} 음이 극에 달해 양으로`);
  const out = [
    `바뀌는 자리는 ${changingIdx.length === 6 ? '여섯 효 모두' : '아래에서부터 세어 ' + fmt(changingIdx)}입니다. ${how.join(', ')} 바뀝니다. 지금 상황이 고정되어 있지 않고, 선택과 태도에 따라 방향이 달라질 수 있다는 뜻입니다.`,
    `그 결과 “${shortName(reading.name)}”에서 “${shortName(changed.name)}”${josa(shortName(changed.name), '으로', '로', true)} 옮겨 가는 흐름입니다. 지괘 “${shortName(changed.name)}”${josa(shortName(changed.name), '은', '는')} ${sentence(changed.summary)}`,
    `변화 후의 괘가 권하는 첫 행동은 이렇습니다: ${changed.actions[0]}`
  ];
  if (changingIdx.length >= 4) out.push('바뀌는 효가 많을수록 상황이 크게 흔들릴 수 있으니, 지금의 결정은 한 번 더 신중히 살펴보세요.');
  return out;
}

function showResult() {
  const bits = line => line.type === 'yang' ? '1' : '0';
  const binary = lines.map(bits).join('');
  const changedLines = lines.map(l => mapValueToLine(l.changing ? (l.type === 'yang' ? 8 : 7) : l.value));
  const changedBinary = changedLines.map(bits).join('');
  const reading = HEXAGRAMS[binary];
  const changed = HEXAGRAMS[changedBinary];
  const question = questionInput.value.trim();
  const changingIdx = lines.map((l, i) => l.changing ? i : -1).filter(i => i >= 0);

  resultBadge.textContent = changingIdx.length
    ? `바뀌는 효 ${changingIdx.length}개` + (changingIdx.length === 6 ? ' (모두)' : ` (${changingIdx.map(i => i + 1).join(', ')}효)`)
    : '바뀌는 효 없음';
  hexagramName.textContent = reading.name;
  trigramNote.textContent = trigramText(binary);
  hexagramKeyword.textContent = reading.keyword;
  resultIntro.textContent = reading.summary;

  const figures = [hexFigure('본괘 (지금)', reading.name, lines, changingIdx)];
  if (changingIdx.length) {
    const arrow = document.createElement('div'); arrow.className = 'hex-arrow'; arrow.textContent = '→';
    figures.push(arrow, hexFigure('지괘 (변화 후)', changed.name, changedLines, changingIdx));
  }
  hexCompare.replaceChildren(...figures);

  coreReading.textContent = reading.core;
  exampleQuestion.textContent = question ? `입력하신 질문: “${question}” — 아래 사례와 비교하며 내 상황에 대입해 보세요.` : '';
  exampleQuestion.style.display = question ? '' : 'none';
  exampleText.textContent = reading.example;
  situationMeaning.textContent = reading.situation;
  changeText.replaceChildren(...buildChangeParagraphs(changingIdx, lines, reading, changed).map(t => {
    const p = document.createElement('p'); p.textContent = t; return p;
  }));
  const toItems = arr => arr.map(item => { const li = document.createElement('li'); li.textContent = item; return li; });
  actionList.replaceChildren(...toItems(reading.actions));
  practicalList.replaceChildren(...toItems(reading.practical));
  resultCard.classList.remove('hidden');
  setTimeout(() => resultCard.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
}

// 페이지별 resetAll()이 공통으로 마무리하는 부분
function resetCommon(tapInfoText) {
  lines = [];
  tapInfo.textContent = tapInfoText;
  livePreview.style.display = 'none';
  liveLinePreview.innerHTML = '';
  liveLineText.textContent = '';
  resultCard.classList.add('hidden');
  renderLines();
}
