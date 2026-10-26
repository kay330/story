'use strict';
/* 64괘 영어 데이터. 현재: name / keyword / summary.
   영어 상세 풀이를 추가하려면 각 괘에 core, situation, example, actions[], practical[] 를 채우면
   자동으로 영어 모드의 결과 화면에 반영됩니다(채워진 괘만, 빈 필드는 한국어로 대체). */
const HEXAGRAMS_EN = {
 "100000": {
  "name": "Return (Fu)",
  "keyword": "Return and recovery",
  "summary": "A turning point: a fresh start is coming; move gently and steadily."
 },
 "100001": {
  "name": "Nourishment (Yi)",
  "keyword": "Feeding and caring",
  "summary": "What you feed (body, mind, people) shapes your direction; watch what you take in and what you say."
 },
 "100010": {
  "name": "Difficulty at the Beginning (Zhun)",
  "keyword": "Hardship at the start",
  "summary": "Everything is new and unsettled; progress comes from patient groundwork and trusted helpers."
 },
 "100011": {
  "name": "Increase (Yi)",
  "keyword": "Benefit",
  "summary": "Good currents help you; follow what is good and help others too."
 },
 "100100": {
  "name": "The Arousing (Zhen)",
  "keyword": "Shock",
  "summary": "A shock arrives; be cautious and reflect, and you will come out stronger."
 },
 "100101": {
  "name": "Biting Through (Shi He)",
  "keyword": "Decisive resolution",
  "summary": "Clear the obstacle firmly and fairly instead of avoiding it."
 },
 "100110": {
  "name": "Following (Sui)",
  "keyword": "Following the times",
  "summary": "Adapt to people and circumstances; follow what is right and stay flexible."
 },
 "100111": {
  "name": "Innocence (Wu Wang)",
  "keyword": "Sincerity without scheming",
  "summary": "Act naturally and honestly, without calculation or forcing."
 },
 "101000": {
  "name": "Darkening of the Light (Ming Yi)",
  "keyword": "Light hidden",
  "summary": "In hard times, keep your brightness inside and do not provoke."
 },
 "101001": {
  "name": "Grace (Bi)",
  "keyword": "Adornment",
  "summary": "Polish the outside, but do not lose the substance."
 },
 "101010": {
  "name": "After Completion (Ji Ji)",
  "keyword": "Completed and in order",
  "summary": "It is accomplished; stay alert, because order can easily slip."
 },
 "101011": {
  "name": "The Family (Jia Ren)",
  "keyword": "Home and close community",
  "summary": "Set your own household right; consistent words and deeds build trust."
 },
 "101100": {
  "name": "Abundance (Feng)",
  "keyword": "Peak abundance",
  "summary": "At the height of fullness the sun begins to set; stay modest."
 },
 "101101": {
  "name": "The Clinging (Li)",
  "keyword": "Clarity and attachment",
  "summary": "Attach yourself to what is right and shine; clarity needs a good support."
 },
 "101110": {
  "name": "Revolution (Ge)",
  "keyword": "Radical change",
  "summary": "Change the old when the time is ripe and trust has been built."
 },
 "101111": {
  "name": "Fellowship with Men (Tong Ren)",
  "keyword": "Fellowship",
  "summary": "Join hands openly with like-minded people for a shared cause, not for private gain."
 },
 "110000": {
  "name": "Approach (Lin)",
  "keyword": "Approaching and growing",
  "summary": "A growing time; approach with care and keep your guard up even as you succeed."
 },
 "110001": {
  "name": "Decrease (Sun)",
  "keyword": "Reducing",
  "summary": "Cutting back (desires, anger, waste) turns out to be a gain."
 },
 "110010": {
  "name": "Limitation (Jie)",
  "keyword": "Healthy limits",
  "summary": "Proper limits create freedom and make things last."
 },
 "110011": {
  "name": "Inner Truth (Zhong Fu)",
  "keyword": "Sincere trust",
  "summary": "Sincerity and reliability are your greatest strength."
 },
 "110100": {
  "name": "The Marrying Maiden (Gui Mei)",
  "keyword": "A hasty, ill-fitting move",
  "summary": "Feelings drive you but your position is not secure; rushing leads to trouble."
 },
 "110101": {
  "name": "Opposition (Kui)",
  "keyword": "Estrangement",
  "summary": "People drift apart; accept differences and begin with small shared things."
 },
 "110110": {
  "name": "The Joyous (Dui)",
  "keyword": "Joy and communication",
  "summary": "Share real joy and beware of flattery."
 },
 "110111": {
  "name": "Treading (Lu)",
  "keyword": "Walking carefully",
  "summary": "You are walking near danger; courtesy and careful steps keep you safe."
 },
 "111000": {
  "name": "Peace (Tai)",
  "keyword": "Harmony and flow",
  "summary": "Above and below connect well; use the good time to build, and do not get careless."
 },
 "111001": {
  "name": "Great Accumulating (Da Chu)",
  "keyword": "Storing up great strength",
  "summary": "Build up ability and character before a big move."
 },
 "111010": {
  "name": "Waiting (Xu)",
  "keyword": "Waiting while preparing",
  "summary": "The time is not ripe yet; keep your routine and prepare instead of forcing a result."
 },
 "111011": {
  "name": "Small Accumulating (Xiao Chu)",
  "keyword": "Small gains, gentle restraint",
  "summary": "Progress is slow and modest; keep building small things steadily."
 },
 "111100": {
  "name": "Great Strength (Da Zhuang)",
  "keyword": "Great power",
  "summary": "You are strong; restrain that force with courtesy and rightness."
 },
 "111101": {
  "name": "Great Possession (Da You)",
  "keyword": "Great abundance",
  "summary": "You hold much; stay modest and use it rightly."
 },
 "111110": {
  "name": "Breakthrough (Guai)",
  "keyword": "A decisive break",
  "summary": "Resolve it decisively, but with caution and restraint."
 },
 "111111": {
  "name": "The Creative (Qian)",
  "keyword": "Pure creative strength",
  "summary": "Strong initiative and drive: a time to take the lead, with patience and integrity."
 },
 "000000": {
  "name": "The Receptive (Kun)",
  "keyword": "Pure receptivity",
  "summary": "Yielding, supportive strength: support and let things grow instead of pushing to the front."
 },
 "010001": {
  "name": "Youthful Folly (Meng)",
  "keyword": "Inexperience and learning",
  "summary": "You do not yet see clearly; stay humble, ask a teacher, and learn before acting."
 },
 "010111": {
  "name": "Conflict (Song)",
  "keyword": "Dispute and tension",
  "summary": "Disagreement is surfacing; avoid pushing it to the bitter end and look for fair mediation."
 },
 "011101": {
  "name": "The Cauldron (Ding)",
  "keyword": "Refining",
  "summary": "Upgrade what you have into something better; refine it and share it."
 },
 "010000": {
  "name": "The Army (Shi)",
  "keyword": "Discipline and leadership",
  "summary": "Big goals need clear rules, a just cause, and a leader people can trust."
 },
 "000010": {
  "name": "Holding Together (Bi)",
  "keyword": "Union and closeness",
  "summary": "Draw close to trustworthy people and commit sincerely, before it is too late."
 },
 "000111": {
  "name": "Standstill (Pi)",
  "keyword": "Blocked communication",
  "summary": "Things are stuck and people are not connecting; hold your values and wait without forcing."
 },
 "001000": {
  "name": "Modesty (Qian)",
  "keyword": "Humility",
  "summary": "Staying humble brings lasting success and respect."
 },
 "000100": {
  "name": "Enthusiasm (Yu)",
  "keyword": "Joy and preparation",
  "summary": "Positive energy gathers; enjoy it, but prepare ahead."
 },
 "011001": {
  "name": "Work on the Decayed (Gu)",
  "keyword": "Repairing what has spoiled",
  "summary": "Old problems have piled up; fix the root causes to renew things."
 },
 "000011": {
  "name": "Contemplation (Guan)",
  "keyword": "Observation",
  "summary": "Look widely and reflect on yourself before acting; lead by example."
 },
 "000001": {
  "name": "Splitting Apart (Bo)",
  "keyword": "Erosion",
  "summary": "Things are wearing away; do not fight it, stop and protect your foundation."
 },
 "011110": {
  "name": "Preponderance of the Great (Da Guo)",
  "keyword": "An overloaded beam",
  "summary": "A heavy load strains the structure; an exceptional time calls for a bold, decisive step."
 },
 "010010": {
  "name": "The Abysmal (Kan)",
  "keyword": "Danger upon danger",
  "summary": "Trouble upon trouble; keep your sincerity and flow through it like water."
 },
 "001110": {
  "name": "Influence (Xian)",
  "keyword": "Mutual attraction",
  "summary": "Hearts respond to each other; sincerity and openness build real bonds."
 },
 "011100": {
  "name": "Duration (Heng)",
  "keyword": "Perseverance",
  "summary": "Lasting results come from steadiness, with change only where the time requires it."
 },
 "001111": {
  "name": "Retreat (Dun)",
  "keyword": "Strategic withdrawal",
  "summary": "Step back at the right time; retreat is not escape but preparation."
 },
 "000101": {
  "name": "Progress (Jin)",
  "keyword": "Rising and recognition",
  "summary": "Like a sunrise, you advance and gain recognition by showing your character."
 },
 "001010": {
  "name": "Obstruction (Jian)",
  "keyword": "Obstacle ahead",
  "summary": "The road is blocked; stop, reflect, and seek help from friends."
 },
 "010100": {
  "name": "Deliverance (Jie)",
  "keyword": "Release",
  "summary": "Tangles unravel; finish quickly and do not linger in the old trouble."
 },
 "011111": {
  "name": "Coming to Meet (Gou)",
  "keyword": "An unexpected encounter",
  "summary": "An unplanned meeting or temptation; deal with it before it grows."
 },
 "000110": {
  "name": "Gathering Together (Cui)",
  "keyword": "Assembling",
  "summary": "People and resources gather; give it a center, order, and preparation."
 },
 "011000": {
  "name": "Pushing Upward (Sheng)",
  "keyword": "Gradual rise",
  "summary": "Rise step by step like a growing tree; accumulate small things."
 },
 "010110": {
  "name": "Oppression (Kun)",
  "keyword": "Exhaustion",
  "summary": "Hard and stifling; keep your principles and you will eventually get through."
 },
 "011010": {
  "name": "The Well (Jing)",
  "keyword": "The inexhaustible well",
  "summary": "Tend the source and serve others; a steady source never runs dry."
 },
 "001001": {
  "name": "Keeping Still (Gen)",
  "keyword": "Stillness",
  "summary": "Stop when it is time to stop and go when it is time to go."
 },
 "001011": {
  "name": "Development (Jian)",
  "keyword": "Gradual progress",
  "summary": "Move forward patiently, one step at a time."
 },
 "001101": {
  "name": "The Wanderer (Lu)",
  "keyword": "A stranger in a strange land",
  "summary": "Keep a low profile and act carefully when you are away from home."
 },
 "011011": {
  "name": "The Gentle (Xun)",
  "keyword": "Penetrating gently",
  "summary": "Persuade gently and repeatedly, without losing your core."
 },
 "010011": {
  "name": "Dispersion (Huan)",
  "keyword": "Dissolving",
  "summary": "Release the tension and gather scattered hearts again."
 },
 "001100": {
  "name": "Preponderance of the Small (Xiao Guo)",
  "keyword": "Small things, not big ones",
  "summary": "Be careful in small matters; do not force big goals now."
 },
 "010101": {
  "name": "Before Completion (Wei Ji)",
  "keyword": "Not yet finished",
  "summary": "Not yet across; the end is also a beginning, so finish carefully."
 }
};
