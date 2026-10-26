'use strict';
/* 다국어(한국어/English) — 번역 사전 + 적용 엔진.
   - 정적 문구: HTML 요소에 data-i18n / data-i18n-html / data-i18n-placeholder / data-i18n-aria 속성
   - 동적 문구: 코드에서 t('키', {값}) 호출
   - 새 문구를 추가할 때는 ko·en 양쪽에 같은 키를 넣으세요 (없으면 한국어로 대체되고, 그것도 없으면 키가 보입니다). */

const I18N = {
  ko: {
    'doc.title.index': '주역점 앱',
    'doc.title.original': '주역점 앱 - 서시법',
    'doc.title.about': '주역이란 - 주역점',
    'doc.title.list': '주역 64괘 설명 - 주역점',

    'app.name': '주역점',
    'app.sub': '주역점은 우연히 얻어진 6개 효(爻)로 괘(卦)를 만들어 현재의 상황과 변화의 방향을 설명합니다. 고정된 운명이 아닌 변화의 형세를 참고하세요.',
    'nav.toOriginal': '전통기법으로 보기',
    'nav.back': '돌아가기',
    'nav.toDraw': '점 보러 가기',

    'menu.open': '메뉴 열기',
    'menu.close': '메뉴 닫기',
    'menu.title': '메뉴',
    'menu.about': '주역이란',
    'menu.list': '주역 64괘 설명 보기',
    'menu.vault': '나의 점괘 보관함',
    'menu.settings': '설정',

    'settings.title': '설정',
    'settings.theme': '화면 모드',
    'settings.theme.dark': '다크',
    'settings.theme.light': '라이트',
    'settings.lang': '언어',
    'settings.lang.ko': '한국어',
    'settings.lang.en': 'English',
    'settings.langHint': '영어 모드에서는 괘 이름과 한 줄 요약, 화면 문구가 영어로 표시됩니다. 상세 풀이는 현재 한국어로만 제공됩니다.',
    'settings.close': '닫기',

    'vault.title': '나의 점괘 보관함',
    'vault.empty': '아직 저장된 점괘가 없습니다. 결과 화면에서 “보관함에 저장”을 눌러 보세요.',
    'vault.count': '{n}개 저장됨 · 이 기기의 브라우저에만 보관됩니다',
    'vault.view': '보기',
    'vault.delete': '삭제',
    'vault.deleteSure': '정말 삭제?',
    'vault.clear': '전체 삭제',
    'vault.clearSure': '정말 모두 삭제?',
    'vault.noQuestion': '(질문 없음)',
    'vault.arrow': '→',
    'vault.unavailable': '이 브라우저에서는 저장 공간을 사용할 수 없어, 페이지를 닫으면 기록이 사라집니다.',
    'vault.method.simple': '간편',
    'vault.method.yarrow': '서시법',

    'result.save': '보관함에 저장',
    'result.saved': '저장됨 ✓',
    'result.savedToast': '보관함에 저장했습니다',
    'result.saveFail': '저장 공간을 사용할 수 없어 임시로만 저장되었습니다',
    'result.fromVault': '보관함에서 불러온 점괘 · {date}',
    'result.langNote': 'The detailed interpretation below is currently available in Korean only.',

    'q.heading': '(질문) 현재 상황을 파악하고 올바른 변화의 방향 찾기',
    'q.placeholder': '(예시)\n• 이직 후 어떤 상황에 직면하며, 주의할 점은?\n• 현재 OO상황의 원인과 대처 방법은?',

    'tap.hint': '화면을 터치해 효를 뽑으세요',
    'tap.info': '탭 1번 = 효 1개',
    'tap.infoOriginal': '서죽이 나타날 때마다 좌우로 가르세요',
    'tap.aria': '효 뽑기 탭 영역',
    'tap.drawing': '효를 뽑는 중입니다…',
    'tap.deciding': '효가 정해지고 있습니다…',
    'tap.allSet': '여섯 효가 모두 정해졌습니다…',
    'tap.phase1': '마음을 가다듬는 중…',
    'tap.phase2': '기운을 모으는 중…',
    'tap.phase3': '효가 모습을 드러냅니다…',
    'bagua.aria': '팔괘 이미지',

    'progress': '현재 효: {n} / 6',
    'live.heading': '내가 뽑은 효',
    'btn.reset': '다시 하기',
    'btn.auto': '자동 뽑기',
    'stack.heading': '현재 만들어진 괘',
    'line.label': '{n}효',
    'line.yang': '양효',
    'line.yin': '음효',
    'line.changing': '변화가 예정된 효입니다.',
    'line.stable': '안정적으로 작용하는 효입니다.',
    'line.desc': '{i}번째로 뽑힌 효는 {type}이며, {change}',
    'line.drawn': '{i} 번째 효를 뽑았습니다',

    'trigram.heaven': '하늘', 'trigram.lake': '연못', 'trigram.fire': '불', 'trigram.thunder': '우레',
    'trigram.wind': '바람', 'trigram.water': '물', 'trigram.mountain': '산', 'trigram.earth': '땅',
    'trigram.line': '위 {u} · 아래 {l}',

    'result.badge.none': '바뀌는 효 없음',
    'result.badge.one': '바뀌는 효 1개 ({list}효)',
    'result.badge.some': '바뀌는 효 {n}개 ({list}효)',
    'result.badge.all': '바뀌는 효 6개 (모두)',
    'result.termNote': '<b>본괘</b>는 지금의 모습, <b>지괘</b>는 변화 후의 모습입니다. <b>바뀌는 효</b>는 붉게 표시된 자리이며, 아래에서부터 1효·2효…로 셉니다.',
    'result.figNow': '본괘 (지금)',
    'result.figAfter': '지괘 (변화 후)',
    'result.core': '핵심 해석',
    'result.example': '이런 경우라면',
    'result.situation': '지금 상황에서의 의미',
    'result.change': '변화의 방향',
    'result.todo': '지금 해볼 일',
    'result.moreTips': '생활 속 적용 팁 더 보기',
    'result.questionEcho': '입력하신 질문: “{q}” — 아래 사례와 비교하며 내 상황에 대입해 보세요.',
    'result.disclaimer': '이 풀이는 미래를 맞히는 예언이 아니라, 지금의 상황과 마음가짐을 정리해 보는 참고 자료입니다. 중요한 결정은 사실과 조언을 함께 확인하세요.',
    'footer.author': 'Mubig',

    'chg.none': '바뀌는 효가 없어서 “{name}”의 흐름이 큰 변화 없이 이어질 가능성이 큽니다. 위 풀이를 지금 상황에 그대로 적용해 보세요.',
    'chg.p1': '바뀌는 자리는 {where}입니다. {how} 바뀝니다. 지금 상황이 고정되어 있지 않고, 선택과 태도에 따라 방향이 달라질 수 있다는 뜻입니다.',
    'chg.whereAll': '여섯 효 모두',
    'chg.whereSome': '아래에서부터 세어 {list}',
    'chg.yang': '{list}{josa} 양이 극에 달해 음으로',
    'chg.yin': '{list}{josa} 음이 극에 달해 양으로',
    'chg.p2': '그 결과 “{from}”에서 “{to}”{josa1} 옮겨 가는 흐름입니다. 지괘 “{to}”{josa2} {summary}',
    'chg.p3': '변화 후의 괘가 권하는 첫 행동은 이렇습니다: {action}',
    'chg.many': '바뀌는 효가 많을수록 상황이 크게 흔들릴 수 있으니, 지금의 결정은 한 번 더 신중히 살펴보세요.',

    'orig.title': '서시법(筮蓍法)',
    'orig.desc': '서시법은 풀 줄기(시초)나 대나무 막대기(서죽)를 손으로 나누고 셈하여 주역의 점괘를 뽑는 가장 전통적인 방법으로 서죽법(筮竹法)이라고도 합니다.',
    'orig.stepsTitle': '(방법)',
    'orig.step1': '대나무 막대기 49개를 두 무리로 나눕니다.',
    'orig.step2': '오른쪽 무리에서 1개를 걸어 둡니다.',
    'orig.step3': '각 무리를 4개씩 세고, 남은 서죽(1~4개)을 덜어냅니다.',
    'orig.step4': '남은 대나무 막대기로 위 과정을 3회 반복하면 효 1개가 정해집니다.',
    'orig.reminder': '방향성이 필요한 상황을 생각하고 집중하세요.',
    'orig.splitMsg': '대나무 막대기를 가르세요',
    'orig.previewAria': '대나무 막대기 49개. 좌우로 드래그해 두 무리로 나눕니다.',
    'orig.leftGroup': '왼쪽 무리',
    'orig.rightGroup': '오른쪽 무리',
    'orig.leftN': '왼쪽 {n}개',
    'orig.rightN': '오른쪽 {n}개',
    'orig.splitHere': '가르는 위치',
    'orig.progress': '가르기 진행: {n}/3',
    'orig.takeUp': '서죽을 손에 쥡니다…',
    'orig.dividing': '서죽을 나누는 중…',
    'orig.roundNow': '{r}변 진행 중 · 서죽 {n}개',
    'orig.tray': '덜어낸 서죽 {n}',
    'orig.cap0': '大衍之數 · 오십에서 하나를 덜어 마흔아홉을 씁니다',
    'orig.cap1': '{r}변 · 分二 — 서죽을 둘로 나눕니다',
    'orig.cap2': '{r}변 · 掛一 — 하나를 걸어 둡니다',
    'orig.cap3': '{r}변 · 揲四 — 넷씩 헤아립니다',
    'orig.cap4': '{r}변 · 歸奇 — 걸어 둔 것과 남은 것을 덜어냅니다',
    'orig.cap5': '{r}변 끝 — 남은 서죽 {n}개',
    'orig.cap6': '남은 {n}개를 넷씩 묶습니다',
    'orig.val6': '노음(老陰) · 변하는 음',
    'orig.val7': '소양(少陽) · 안정된 양',
    'orig.val8': '소음(少陰) · 안정된 음',
    'orig.val9': '노양(老陽) · 변하는 양',
    'orig.valDefault': '효',
    'orig.dragInfo': '{n}번째 가르기 · 아래 서죽을 좌우로 드래그하고 놓으세요.',
    'orig.splitDone': '서죽이 갈라졌습니다. 움직임을 지켜보세요…',
    'orig.firstCalc': '첫 번째 변을 계산합니다. 다음 변에서는 다시 직접 가르세요.',

    'page.soon': '이 페이지는 준비 중입니다. 곧 찾아뵙겠습니다.',
    'page.about.title': '주역이란',
    'page.list.title': '주역 64괘 설명'
  },

  en: {
    'doc.title.index': 'I Ching Oracle',
    'doc.title.original': 'I Ching Oracle - Yarrow Stalk Method',
    'doc.title.about': 'About the I Ching',
    'doc.title.list': 'The 64 Hexagrams',

    'app.name': 'I Ching',
    'app.sub': 'The I Ching builds a hexagram (卦) from six lines (爻) drawn by chance and describes your present situation and the direction of change. Treat it as a map of shifting circumstances, not a fixed fate.',
    'nav.toOriginal': 'Traditional method',
    'nav.back': 'Back',
    'nav.toDraw': 'Cast a reading',

    'menu.open': 'Open menu',
    'menu.close': 'Close menu',
    'menu.title': 'Menu',
    'menu.about': 'About the I Ching',
    'menu.list': 'Browse the 64 Hexagrams',
    'menu.vault': 'My Saved Readings',
    'menu.settings': 'Settings',

    'settings.title': 'Settings',
    'settings.theme': 'Appearance',
    'settings.theme.dark': 'Dark',
    'settings.theme.light': 'Light',
    'settings.lang': 'Language',
    'settings.lang.ko': '한국어',
    'settings.lang.en': 'English',
    'settings.langHint': 'In English mode, the interface, hexagram names and one-line summaries are in English. Detailed interpretations are currently available in Korean only.',
    'settings.close': 'Close',

    'vault.title': 'My Saved Readings',
    'vault.empty': 'No saved readings yet. Tap “Save to my readings” on a result.',
    'vault.count': '{n} saved · stored only in this browser on this device',
    'vault.view': 'View',
    'vault.delete': 'Delete',
    'vault.deleteSure': 'Really delete?',
    'vault.clear': 'Delete all',
    'vault.clearSure': 'Really delete all?',
    'vault.noQuestion': '(no question)',
    'vault.arrow': '→',
    'vault.unavailable': 'Storage is unavailable in this browser, so your readings will be lost when you close the page.',
    'vault.method.simple': 'Simple',
    'vault.method.yarrow': 'Yarrow',

    'result.save': 'Save to my readings',
    'result.saved': 'Saved ✓',
    'result.savedToast': 'Saved to your readings',
    'result.saveFail': 'Storage is unavailable, so this was saved temporarily only',
    'result.fromVault': 'Loaded from your saved readings · {date}',
    'result.langNote': 'The detailed interpretation below is currently available in Korean only.',

    'q.heading': '(Question) Understand your situation and find the right direction of change',
    'q.placeholder': '(Examples)\n• What will I face after changing jobs, and what should I watch out for?\n• What is behind my current situation, and how should I respond?',

    'tap.hint': 'Tap the screen to draw a line',
    'tap.info': '1 tap = 1 line',
    'tap.infoOriginal': 'Swipe to split the stalks each time they appear',
    'tap.aria': 'Tap area for drawing a line',
    'tap.drawing': 'Drawing a line…',
    'tap.deciding': 'The line is being decided…',
    'tap.allSet': 'All six lines are set…',
    'tap.phase1': 'Settling your mind…',
    'tap.phase2': 'Gathering your focus…',
    'tap.phase3': 'The line is taking shape…',
    'bagua.aria': 'Eight trigrams',

    'progress': 'Lines: {n} / 6',
    'live.heading': 'The line I drew',
    'btn.reset': 'Start over',
    'btn.auto': 'Auto draw',
    'stack.heading': 'Hexagram so far',
    'line.label': 'Line {n}',
    'line.yang': 'yang (solid)',
    'line.yin': 'yin (broken)',
    'line.changing': 'is about to change.',
    'line.stable': 'stays stable.',
    'line.desc': 'Line {i} is a {type} line that {change}',
    'line.drawn': 'Line {i} drawn',

    'trigram.heaven': 'Heaven', 'trigram.lake': 'Lake', 'trigram.fire': 'Fire', 'trigram.thunder': 'Thunder',
    'trigram.wind': 'Wind', 'trigram.water': 'Water', 'trigram.mountain': 'Mountain', 'trigram.earth': 'Earth',
    'trigram.line': 'Upper {u} · Lower {l}',

    'result.badge.none': 'No changing lines',
    'result.badge.one': '1 changing line ({list})',
    'result.badge.some': '{n} changing lines ({list})',
    'result.badge.all': '6 changing lines (all)',
    'result.termNote': 'The <b>primary hexagram</b> is how things are now; the <b>resulting hexagram</b> is how they look after the change. <b>Changing lines</b> are marked in red and counted from the bottom: line 1, line 2…',
    'result.figNow': 'Primary (now)',
    'result.figAfter': 'Resulting (after change)',
    'result.core': 'Core meaning',
    'result.example': 'In a case like this',
    'result.situation': 'What it means for you now',
    'result.change': 'Direction of change',
    'result.todo': 'What to do now',
    'result.moreTips': 'More everyday tips',
    'result.questionEcho': 'Your question: “{q}” — compare it with the example below and apply it to your own situation.',
    'result.disclaimer': 'This reading is not a prediction of the future but a reference for sorting out your present situation and mindset. For important decisions, check the facts and seek advice as well.',
    'footer.author': 'Mubig',

    'chg.none': 'No lines are changing, so the situation of “{name}” is likely to continue without major change. Apply the reading above to your situation as it is.',
    'chg.p1': 'What changes: {where}. {how}. This means your situation is not fixed; your choices and attitude can shift its direction.',
    'chg.whereAll': 'all six lines',
    'chg.whereSome': '{list}, counted from the bottom',
    'chg.yang': '{list}: yang at its extreme turns to yin',
    'chg.yin': '{list}: yin at its extreme turns to yang',
    'chg.p2': 'The flow moves from “{from}” to “{to}”. The resulting hexagram, “{to}” ({keyword}): {summary}',
    'chg.p3': '',
    'chg.many': 'With this many changing lines, the situation can swing a lot, so take one more careful look before deciding.',

    'orig.title': 'Yarrow-stalk method (筮蓍法)',
    'orig.desc': 'The yarrow-stalk method divides and counts yarrow stems (or bamboo sticks) by hand to obtain an I Ching reading. It is the most traditional way of casting a hexagram.',
    'orig.stepsTitle': '(Steps)',
    'orig.step1': 'Divide the 49 bamboo sticks into two groups.',
    'orig.step2': 'Hang one stick from the right-hand group.',
    'orig.step3': 'Count each group off in fours and set aside the remainders (1–4 sticks).',
    'orig.step4': 'Repeat this with the remaining sticks three times to decide one line.',
    'orig.reminder': 'Hold a situation in mind that needs direction, and concentrate.',
    'orig.splitMsg': 'Split the bamboo sticks',
    'orig.previewAria': '49 bamboo sticks. Drag left or right to divide them into two groups.',
    'orig.leftGroup': 'Left group',
    'orig.rightGroup': 'Right group',
    'orig.leftN': 'Left {n}',
    'orig.rightN': 'Right {n}',
    'orig.splitHere': 'Split here',
    'orig.progress': 'Split progress: {n}/3',
    'orig.takeUp': 'Taking up the stalks…',
    'orig.dividing': 'Dividing the stalks…',
    'orig.roundNow': 'Change {r} in progress · {n} stalks',
    'orig.tray': 'Set aside: {n}',
    'orig.cap0': '大衍之數 · From fifty, set one aside and use forty-nine',
    'orig.cap1': 'Change {r} · 分二 — divide the stalks in two',
    'orig.cap2': 'Change {r} · 掛一 — hang one stalk',
    'orig.cap3': 'Change {r} · 揲四 — count off by fours',
    'orig.cap4': 'Change {r} · 歸奇 — set aside the hung stalk and the remainders',
    'orig.cap5': 'Change {r} done — {n} stalks left',
    'orig.cap6': 'Group the remaining {n} in fours',
    'orig.val6': 'Old yin · changing yin',
    'orig.val7': 'Young yang · stable yang',
    'orig.val8': 'Young yin · stable yin',
    'orig.val9': 'Old yang · changing yang',
    'orig.valDefault': 'Line',
    'orig.dragInfo': 'Split {n} · Drag the stalks left or right, then release.',
    'orig.splitDone': 'The stalks are split. Watch what happens…',
    'orig.firstCalc': 'Calculating the first change. Split again yourself for the next one.',

    'page.soon': 'This page is under construction. Coming soon.',
    'page.about.title': 'About the I Ching',
    'page.list.title': 'The 64 Hexagrams'
  }
};

let currentLang = 'ko';
const langListeners = [];

function getLang() { return currentLang; }

function t(key, params) {
  const dict = I18N[currentLang] || I18N.ko;
  let s = dict[key];
  if (s === undefined) s = I18N.ko[key];
  if (s === undefined) return key;
  if (params) s = s.replace(/\{(\w+)\}/g, (m, k) => (params[k] !== undefined ? params[k] : m));
  return s;
}

function onLangChange(fn) { langListeners.push(fn); }

// 정적 문구를 현재 언어로 갱신 (번역 사전에 없는 키는 건드리지 않음)
function applyI18n(root) {
  root = root || document;
  const has = k => (I18N[currentLang] && I18N[currentLang][k] !== undefined) || I18N.ko[k] !== undefined;
  root.querySelectorAll('[data-i18n]').forEach(el => { if (has(el.dataset.i18n)) el.textContent = t(el.dataset.i18n); });
  root.querySelectorAll('[data-i18n-html]').forEach(el => { if (has(el.dataset.i18nHtml)) el.innerHTML = t(el.dataset.i18nHtml); });
  root.querySelectorAll('[data-i18n-placeholder]').forEach(el => { el.placeholder = t(el.dataset.i18nPlaceholder); });
  root.querySelectorAll('[data-i18n-aria]').forEach(el => { el.setAttribute('aria-label', t(el.dataset.i18nAria)); });
  const titleKey = document.documentElement.dataset.titleKey;
  if (titleKey) document.title = t(titleKey);
}

function setLang(lang, persist) {
  if (!I18N[lang]) lang = 'ko';
  currentLang = lang;
  document.documentElement.lang = lang;
  if (persist !== false && typeof setSetting === 'function') setSetting('lang', lang);
  applyI18n();
  langListeners.forEach(fn => { try { fn(lang); } catch (e) { console.error(e); } });
}
