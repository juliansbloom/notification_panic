'use strict';

// ===== NOTIFICATION DATA =====
const NOTIFICATIONS = [
  // ── GOOD (difficulty 1) ──
  { id:  1, app: 'Instagram',  icon: '📸', title: 'You gained 50 new followers!',        subtitle: 'People are loving your vibe',                type: 'GOOD', ttl: 4, weight: 1 },
  { id:  2, app: 'Messages',   icon: '😂', title: 'Alex sent you memes',                 subtitle: '3 videos, 2 images · you need to see these',  type: 'GOOD', ttl: 4, weight: 1 },
  { id:  3, app: 'Fortnite',   icon: '🎮', title: 'Rare skin unlocked!',                 subtitle: 'Galaxy Wraith Skin added to your locker',      type: 'GOOD', ttl: 5, weight: 1 },
  { id:  4, app: 'Messages',   icon: '❤️', title: 'Crush replied!!',                     subtitle: 'omg hey!! what are you up to? 😊',             type: 'GOOD', ttl: 4, weight: 1 },
  { id:  5, app: 'TikTok',     icon: '🎵', title: 'Your video went viral!',              subtitle: '10K views in the last hour 🔥',               type: 'GOOD', ttl: 4, weight: 1 },
  { id:  6, app: 'Cash App',   icon: '💸', title: 'You received $20.00!',               subtitle: 'Transfer from: Mom 💕',                        type: 'GOOD', ttl: 4, weight: 1 },
  { id:  7, app: 'Discord',    icon: '🎮', title: 'The squad is online!',               subtitle: 'Join the voice channel · 4 people waiting',   type: 'GOOD', ttl: 4, weight: 1 },
  { id:  8, app: 'YouTube',    icon: '▶️', title: 'Your video hit 1,000 views!',        subtitle: "You're growing fast — keep it up 🚀",          type: 'GOOD', ttl: 5, weight: 1 },
  { id:  9, app: 'Snapchat',   icon: '👻', title: 'New snap from your bestie!',         subtitle: 'She sent you something 👀',                    type: 'GOOD', ttl: 4, weight: 1 },
  { id: 10, app: 'Twitter/X',  icon: '🐦', title: 'Your tweet is going viral!',         subtitle: '5K retweets and still climbing 📈',            type: 'GOOD', ttl: 4, weight: 1 },
  { id: 11, app: 'Messages',   icon: '🎉', title: "Party invite from Jake!",            subtitle: "Jake's house · Saturday · BE THERE 🎉",       type: 'GOOD', ttl: 4, weight: 1 },
  { id: 12, app: 'Amazon',     icon: '📦', title: 'Your package was delivered!',        subtitle: 'Left safely at your front door ✅',            type: 'GOOD', ttl: 5, weight: 1 },
  { id: 13, app: 'School',     icon: '🌟', title: 'Teacher comment on your essay',      subtitle: '"Exceptional work! This is an A+" 🎓',         type: 'GOOD', ttl: 4, weight: 1 },
  { id: 14, app: 'Spotify',    icon: '🎧', title: 'New playlist made just for you',     subtitle: 'Based on your recent listening history',       type: 'GOOD', ttl: 5, weight: 1 },

  // ── BAD (difficulty 1) ──
  { id: 15, app: 'Family',     icon: '😅', title: 'Mom tagged you in a baby photo',     subtitle: 'Summer 2009 · The Pool Incident 👶',           type: 'BAD',  ttl: 4, weight: 1 },
  { id: 16, app: 'School',     icon: '📚', title: 'New homework assigned',              subtitle: '15-page essay due tomorrow morning 📝',        type: 'BAD',  ttl: 4, weight: 1 },
  { id: 17, app: 'System',     icon: '🔋', title: 'Battery at 1%',                      subtitle: 'Connect to charger immediately',               type: 'BAD',  ttl: 3, weight: 1 },
  { id: 18, app: 'System',     icon: '💾', title: 'Storage almost full',               subtitle: 'Only 23 MB remaining on your device',          type: 'BAD',  ttl: 4, weight: 1 },
  { id: 19, app: 'Messages',   icon: '😰', title: 'Dad: We need to talk.',             subtitle: 'Delivered 2:47 PM · Read',                     type: 'BAD',  ttl: 4, weight: 1 },
  { id: 20, app: 'Messages',   icon: '💔', title: 'Crush: Seen 2h ago',               subtitle: 'No reply... 🦗',                               type: 'BAD',  ttl: 4, weight: 1 },
  { id: 21, app: 'Instagram',  icon: '😬', title: "Ex reposted your old photo",        subtitle: 'To their story · 47 people already saw it',   type: 'BAD',  ttl: 4, weight: 1 },
  { id: 22, app: 'Bank',       icon: '💳', title: 'Account balance: $0.47',            subtitle: 'You are broke. Again.',                        type: 'BAD',  ttl: 4, weight: 1 },
  { id: 23, app: 'Dentist',    icon: '🦷', title: 'Appointment reminder',              subtitle: 'Tomorrow · 8:00 AM · Yes, really.',            type: 'BAD',  ttl: 5, weight: 1 },
  { id: 24, app: 'Family',     icon: '😱', title: 'Aunt Karen commented on your post', subtitle: '"This generation I tell you..." 😤',           type: 'BAD',  ttl: 4, weight: 1 },
  { id: 25, app: 'Twitter/X',  icon: '🔥', title: "You're being ratio'd",              subtitle: "Quote tweets are... not favorable",            type: 'BAD',  ttl: 4, weight: 1 },
  { id: 26, app: 'Messages',   icon: '😤', title: 'Group chat',                        subtitle: 'Sam: why was I not invited?? 😡',              type: 'BAD',  ttl: 4, weight: 1 },
  { id: 27, app: 'System',     icon: '📡', title: 'WiFi disconnected',                 subtitle: 'In the middle of your game. 0 bars.',          type: 'BAD',  ttl: 3, weight: 1 },
  { id: 28, app: 'Alarm',      icon: '⏰', title: 'WAKE UP!!',                         subtitle: 'You have 5 minutes before school starts',      type: 'BAD',  ttl: 3, weight: 1 },

  // ── TRICKY GOOD (difficulty 2) ──
  { id: 29, app: 'Instagram',  icon: '📸', title: 'Crush liked your post',             subtitle: 'Your latest photo · just now 💫',              type: 'GOOD', ttl: 3, weight: 2 },
  { id: 30, app: 'Instagram',  icon: '📈', title: 'You gained new followers!',         subtitle: '12 real accounts followed you today',          type: 'GOOD', ttl: 3, weight: 2 },
  { id: 31, app: 'Messages',   icon: '💬', title: 'Alex is typing...',                 subtitle: 'Read your last message · now responding',      type: 'GOOD', ttl: 3, weight: 2 },
  { id: 32, app: 'School',     icon: '📝', title: 'Exam results are posted',           subtitle: '"Your grade is ready to view" 👀',             type: 'GOOD', ttl: 3, weight: 2 },
  { id: 33, app: 'Spotify',    icon: '🎵', title: 'Crush updated your shared playlist',subtitle: 'Added: "Perfect" by Ed Sheeran ❤️',            type: 'GOOD', ttl: 3, weight: 2 },
  { id: 34, app: 'Instagram',  icon: '👀', title: 'Someone viewed your profile',       subtitle: 'They visited 3 times today...',                type: 'GOOD', ttl: 3, weight: 2 },

  // ── TRICKY BAD (difficulty 2) ──
  { id: 35, app: 'Instagram',  icon: '😬', title: 'Crush liked your post',             subtitle: 'Photo from 3 years ago · liked at 2:17 AM',   type: 'BAD',  ttl: 3, weight: 2 },
  { id: 36, app: 'Instagram',  icon: '🤖', title: 'You gained new followers!',         subtitle: '3 accounts · 0 posts · joined today',          type: 'BAD',  ttl: 3, weight: 2 },
  { id: 37, app: 'Messages',   icon: '😶', title: 'Alex stopped typing',               subtitle: 'Read your message 1h ago... no reply',         type: 'BAD',  ttl: 3, weight: 2 },
  { id: 38, app: 'School',     icon: '😰', title: 'Exam results are posted',           subtitle: '"Please come see me after class" — Mr. Ross', type: 'BAD',  ttl: 3, weight: 2 },
  { id: 39, app: 'Spotify',    icon: '💔', title: 'Crush updated your shared playlist',subtitle: 'Added: "We Are Never Getting Back Together"',  type: 'BAD',  ttl: 3, weight: 2 },
  { id: 40, app: 'TikTok',     icon: '😱', title: 'Your old video resurfaced',         subtitle: 'People are leaving comments again... 💀',      type: 'BAD',  ttl: 3, weight: 2 },
];

// ===== CONFIG =====
const CFG = {
  startSocial:       100,
  startRep:          100,
  wrongPenalty:      15,
  expirePenalty:     10,
  swipeThreshold:    75,   // px — commit swipe
  snapBackThreshold: 40,   // px — show overlay hint
};

// ===== STATE =====
let G = {};

function resetState() {
  G = {
    running:      false,
    social:       CFG.startSocial,
    rep:          CFG.startRep,
    time:         0,
    correct:      0,
    combo:        0,
    bestCombo:    0,
    panicLevel:   0,
    highScore:    parseInt(localStorage.getItem('np_hs') || '0', 10),
    activeCard:   null,   // { el, notif, rafId }
    peekNotif:    null,   // next notification ready to show
    gameTimerId:  null,
    pendingSpawn: null,
  };
}

// ===== DOM =====
const $ = id => document.getElementById(id);
const SCREENS = { menu: $('screen-menu'), game: $('screen-game'), gameover: $('screen-gameover') };
const DOM = {
  barSocial:    $('bar-social'),
  barRep:       $('bar-rep'),
  valSocial:    $('val-social'),
  valRep:       $('val-rep'),
  valTime:      $('val-time'),
  panicFill:    $('panic-fill'),
  panicVal:     $('panic-val'),
  cardArea:     $('card-area'),
  comboDisplay: $('combo-display'),
  feedbackLayer:$('feedback-layer'),
  menuHS:       $('menu-highscore'),
  goReason:     $('gameover-reason'),
  goIcon:       $('gameover-icon'),
  statTime:     $('stat-time'),
  statCorrect:  $('stat-correct'),
  statCombo:    $('stat-combo'),
  newBest:      $('new-best'),
};

// ===== DRAG STATE (global, single touch/mouse) =====
const drag = {
  active:  false,
  card:    null,
  notif:   null,
  startX:  0,
  startY:  0,
  curX:    0,
};

// ===== INIT =====
function init() {
  resetState();
  DOM.menuHS.textContent = `Best: ${G.highScore}s`;

  $('btn-play').addEventListener('click', startGame);
  $('btn-retry').addEventListener('click', startGame);
  $('btn-menu').addEventListener('click', showMenu);

  // Global drag listeners
  document.addEventListener('mousemove',  onDragMove);
  document.addEventListener('mouseup',    onDragEnd);
  document.addEventListener('touchmove',  onTouchMove, { passive: false });
  document.addEventListener('touchend',   onDragEnd,   { passive: true });
  document.addEventListener('touchcancel',onDragEnd,   { passive: true });

  showScreen('menu');
}

// ===== SCREEN MANAGEMENT =====
function showScreen(name) {
  Object.values(SCREENS).forEach(s => s.classList.remove('active'));
  SCREENS[name].classList.add('active');
}

// ===== START GAME =====
function startGame() {
  // Clear any in-flight timers
  clearInterval(G.gameTimerId);
  clearTimeout(G.pendingSpawn);
  cancelActiveDrag();

  resetState();
  G.running = true;

  DOM.cardArea.innerHTML = '';
  updateHUD();
  showScreen('game');

  // Kick off game clock
  G.gameTimerId = setInterval(gameTick, 1000);

  // First card after a brief intro pause
  G.pendingSpawn = setTimeout(spawnCard, 600);
}

// ===== GAME TICK (every 1 s) =====
function gameTick() {
  if (!G.running) return;

  G.time++;
  DOM.valTime.textContent = `${G.time}s`;

  // Difficulty ramp every 20 s
  if (G.time % 20 === 0) {
    G.panicLevel = Math.min(100, G.panicLevel + 14);
    DOM.panicFill.style.width = G.panicLevel + '%';
    DOM.panicVal.textContent  = G.panicLevel + '%';
  }
}

// Spawn interval formula (ms) – matches design doc
function getSpawnInterval() {
  return Math.max(400, 1500 - G.time * 20);
}

// TTL reduction based on time survived (ms)
function getCardTTL(baseTTL) {
  return Math.max(1800, baseTTL * 1000 - G.time * 25);
}

// ===== PICK RANDOM NOTIFICATION =====
function pickNotif() {
  const maxWeight = G.panicLevel < 40 ? 1 : 2;
  const pool = NOTIFICATIONS.filter(n => n.weight <= maxWeight);
  return pool[Math.floor(Math.random() * pool.length)];
}

// ===== SPAWN CARD =====
function spawnCard() {
  if (!G.running) return;
  if (G.activeCard) return; // safety: only one card at a time

  const notif = pickNotif();
  G.peekNotif  = pickNotif(); // pre-pick next for peek

  const el = buildCard(notif);
  DOM.cardArea.innerHTML = '';

  // Peek card (next one, behind)
  const peekEl = buildCard(G.peekNotif);
  peekEl.classList.add('peek-card');
  DOM.cardArea.appendChild(peekEl);

  // Active card
  el.classList.add('active-card', 'anim-drop-in');
  DOM.cardArea.appendChild(el);

  const rafId = startTimerBar(el, notif);
  G.activeCard = { el, notif, rafId };

  attachCardDragListeners(el, notif);
}

// ===== BUILD CARD ELEMENT =====
function buildCard(notif) {
  const el = document.createElement('div');
  el.className = 'notif-card';
  el.innerHTML = `
    <div class="swipe-overlay swipe-overlay-left">🗑️</div>
    <div class="swipe-overlay swipe-overlay-right">✅</div>
    <div class="card-inner">
      <div class="card-icon">${notif.icon}</div>
      <div class="card-body">
        <div class="card-app">${notif.app}</div>
        <div class="card-title">${notif.title}</div>
        <div class="card-subtitle">${notif.subtitle}</div>
      </div>
      <div class="card-time">now</div>
    </div>
    <div class="card-timer"></div>
  `;
  return el;
}

// ===== TIMER BAR ANIMATION =====
function startTimerBar(el, notif) {
  const timerEl  = el.querySelector('.card-timer');
  const ttl      = getCardTTL(notif.ttl);
  const start    = performance.now();

  function tick(now) {
    if (!G.activeCard || G.activeCard.el !== el) return;
    const elapsed  = now - start;
    const progress = Math.max(0, 1 - elapsed / ttl);
    timerEl.style.width = (progress * 100) + '%';

    if (progress < 0.25)      timerEl.style.background = 'var(--bad)';
    else if (progress < 0.55) timerEl.style.background = 'var(--rep)';
    else                      timerEl.style.background = 'var(--accent)';

    if (elapsed >= ttl) {
      handleExpire(el, notif);
      return;
    }
    G.activeCard.rafId = requestAnimationFrame(tick);
  }

  return requestAnimationFrame(tick);
}

// ===== AUTO-EXPIRE =====
function handleExpire(el, notif) {
  if (!G.activeCard || G.activeCard.el !== el) return;
  clearActiveCard();

  const penalty = CFG.expirePenalty;
  if (notif.type === 'GOOD') {
    changeScore('social', -penalty);
    showFloat(`-${penalty} Social ❤️`, 'var(--bad)');
  } else {
    changeScore('rep', -penalty);
    showFloat(`-${penalty} Rep 🔥`, 'var(--bad)');
  }
  G.combo = 0;
  updateComboDisplay();

  el.classList.add('anim-shake');
  if (navigator.vibrate) navigator.vibrate([30, 20, 30]);

  setTimeout(() => {
    el.remove();
    checkGameOver();
    if (G.running) scheduleNextCard();
  }, 380);
}

// ===== ATTACH DRAG LISTENERS =====
function attachCardDragListeners(el, notif) {
  el.addEventListener('mousedown', e => {
    startDrag(e.clientX, e.clientY, el, notif);
  });
  el.addEventListener('touchstart', e => {
    const t = e.touches[0];
    startDrag(t.clientX, t.clientY, el, notif);
  }, { passive: true });
}

// ===== DRAG START =====
function startDrag(x, y, el, notif) {
  if (!G.running) return;
  if (G.activeCard?.el !== el) return;
  drag.active = true;
  drag.card   = el;
  drag.notif  = notif;
  drag.startX = x;
  drag.startY = y;
  drag.curX   = 0;
  el.classList.add('is-dragging');
  // Timer keeps running during drag — real phones don't pause notifications
}

// ===== DRAG MOVE =====
function onDragMove(e) {
  if (!drag.active) return;
  const x = e.clientX ?? e.clientX;
  moveDrag(x);
}

function onTouchMove(e) {
  if (!drag.active) return;
  e.preventDefault();
  moveDrag(e.touches[0].clientX);
}

function moveDrag(clientX) {
  const deltaX  = clientX - drag.startX;
  drag.curX     = deltaX;
  const rotation = deltaX * 0.08;

  drag.card.style.transform = `translateX(${deltaX}px) rotate(${rotation}deg)`;

  const leftOverlay  = drag.card.querySelector('.swipe-overlay-left');
  const rightOverlay = drag.card.querySelector('.swipe-overlay-right');

  if (deltaX < -CFG.snapBackThreshold) {
    leftOverlay.style.opacity  = Math.min(0.95, Math.abs(deltaX) / 110);
    rightOverlay.style.opacity = 0;
  } else if (deltaX > CFG.snapBackThreshold) {
    rightOverlay.style.opacity = Math.min(0.95, deltaX / 110);
    leftOverlay.style.opacity  = 0;
  } else {
    leftOverlay.style.opacity  = 0;
    rightOverlay.style.opacity = 0;
  }
}

// ===== DRAG END =====
function onDragEnd() {
  if (!drag.active) return;
  drag.active = false;

  const el    = drag.card;
  const notif = drag.notif;
  const deltaX = drag.curX;
  el.classList.remove('is-dragging');

  if (deltaX < -CFG.swipeThreshold) {
    resolveSwipe('left', el, notif);
  } else if (deltaX > CFG.swipeThreshold) {
    resolveSwipe('right', el, notif);
  } else {
    // Snap back — timer already running, just reset transform
    el.style.transform = '';
    el.querySelector('.swipe-overlay-left').style.opacity  = 0;
    el.querySelector('.swipe-overlay-right').style.opacity = 0;
  }

  drag.card  = null;
  drag.notif = null;
}

// ===== RESOLVE SWIPE =====
function resolveSwipe(direction, el, notif) {
  if (!G.activeCard || G.activeCard.el !== el) return;
  cancelAnimationFrame(G.activeCard.rafId);
  clearActiveCard();

  const isCorrect =
    (direction === 'right' && notif.type === 'GOOD') ||
    (direction === 'left'  && notif.type === 'BAD');

  if (isCorrect) {
    G.correct++;
    G.combo++;
    if (G.combo > G.bestCombo) G.bestCombo = G.combo;
    updateComboDisplay();
    if (G.combo >= 3) showCombo(G.combo);
    spawnParticles(el, direction === 'right' ? 'var(--good)' : 'var(--bad)');
  } else {
    G.combo = 0;
    updateComboDisplay();
    if (direction === 'right') {
      // Kept a bad notification
      changeScore('rep', -CFG.wrongPenalty);
      showFloat(`-${CFG.wrongPenalty} Rep 🔥`, 'var(--bad)');
    } else {
      // Deleted a good notification
      changeScore('social', -CFG.wrongPenalty);
      showFloat(`-${CFG.wrongPenalty} Social ❤️`, 'var(--bad)');
    }
    if (navigator.vibrate) navigator.vibrate(80);
  }

  // Animate card off-screen
  el.style.transition = 'transform 0.28s ease-in, opacity 0.28s ease-in';
  el.style.opacity    = '0';
  el.style.transform  = direction === 'left'
    ? 'translateX(-110%) rotate(-18deg)'
    : 'translateX(110%) rotate(18deg)';

  setTimeout(() => {
    el.remove();
    checkGameOver();
    if (G.running) scheduleNextCard();
  }, 280);
}

// ===== SCHEDULE NEXT CARD =====
function scheduleNextCard() {
  G.pendingSpawn = setTimeout(spawnCard, getSpawnInterval());
}

// ===== CLEAR ACTIVE CARD =====
function clearActiveCard() {
  if (G.activeCard) {
    cancelAnimationFrame(G.activeCard.rafId);
    G.activeCard = null;
  }
}

// ===== CANCEL DRAG =====
function cancelActiveDrag() {
  if (drag.active && drag.card) {
    drag.card.style.transform = '';
    drag.card.classList.remove('is-dragging');
  }
  drag.active = false;
  drag.card   = null;
  drag.notif  = null;
}

// ===== SCORE MANAGEMENT =====
function changeScore(type, amount) {
  if (type === 'social') {
    G.social = Math.max(0, Math.min(100, G.social + amount));
    DOM.barSocial.style.width   = G.social + '%';
    DOM.valSocial.textContent   = Math.round(G.social);
    if (amount < 0) flashBar(DOM.barSocial, 'var(--bad)');
  } else {
    G.rep = Math.max(0, Math.min(100, G.rep + amount));
    DOM.barRep.style.width = G.rep + '%';
    DOM.valRep.textContent = Math.round(G.rep);
    if (amount < 0) flashBar(DOM.barRep, 'var(--bad)');
  }
}

function flashBar(barEl, color) {
  const prev = barEl.style.background;
  barEl.style.background = color;
  setTimeout(() => { barEl.style.background = ''; }, 300);
}

function updateHUD() {
  DOM.barSocial.style.width = G.social + '%';
  DOM.barRep.style.width    = G.rep    + '%';
  DOM.valSocial.textContent = G.social;
  DOM.valRep.textContent    = G.rep;
  DOM.valTime.textContent   = `${G.time}s`;
  DOM.panicFill.style.width = G.panicLevel + '%';
  DOM.panicVal.textContent  = G.panicLevel + '%';
}

function updateComboDisplay() {
  if (G.combo >= 3) {
    DOM.comboDisplay.textContent = `${G.combo}x`;
  } else {
    DOM.comboDisplay.textContent = '';
  }
}

// ===== GAME OVER =====
function checkGameOver() {
  if (G.social <= 0 || G.rep <= 0) triggerGameOver();
}

function triggerGameOver() {
  G.running = false;
  clearInterval(G.gameTimerId);
  clearTimeout(G.pendingSpawn);
  clearActiveCard();
  cancelActiveDrag();

  DOM.cardArea.innerHTML = '';

  const isNewBest = G.time > G.highScore;
  if (isNewBest) {
    G.highScore = G.time;
    localStorage.setItem('np_hs', G.highScore);
    DOM.menuHS.textContent = `Best: ${G.highScore}s`;
  }

  // Choose icon & reason based on which score died
  if (G.social <= 0) {
    DOM.goIcon.textContent   = '👻';
    DOM.goReason.textContent = 'Your social life is completely ruined. No one likes you anymore.';
  } else {
    DOM.goIcon.textContent   = '🔥';
    DOM.goReason.textContent = 'Your reputation is in ashes. The internet will not forget.';
  }

  DOM.statTime.textContent    = `${G.time}s`;
  DOM.statCorrect.textContent = G.correct;
  DOM.statCombo.textContent   = G.bestCombo;
  DOM.newBest.style.display   = isNewBest ? 'block' : 'none';

  showScreen('gameover');
}

// ===== SHOW MENU =====
function showMenu() {
  G.running = false;
  clearInterval(G.gameTimerId);
  clearTimeout(G.pendingSpawn);
  clearActiveCard();
  cancelActiveDrag();
  DOM.cardArea.innerHTML = '';
  DOM.menuHS.textContent = `Best: ${G.highScore}s`;
  showScreen('menu');
}

// ===== FEEDBACK: FLOATING TEXT =====
function showFloat(text, color) {
  const el = document.createElement('div');
  el.className = 'float-text';
  el.style.color = color;
  el.style.top   = '42%';
  el.textContent = text;
  DOM.feedbackLayer.appendChild(el);
  el.addEventListener('animationend', () => el.remove());
}

// ===== FEEDBACK: COMBO POP =====
function showCombo(combo) {
  const size = Math.min(22 + combo * 1.5, 42);
  const el   = document.createElement('div');
  el.className = 'combo-text';
  el.style.color    = 'var(--rep)';
  el.style.fontSize = size + 'px';
  el.style.top      = '35%';
  el.textContent    = combo >= 10 ? `${combo}x INSANE!! 🤯` :
                      combo >= 6  ? `${combo}x COMBO!! 🔥` :
                                    `${combo}x Combo!`;
  DOM.feedbackLayer.appendChild(el);
  el.addEventListener('animationend', () => el.remove());
}

// ===== FEEDBACK: PARTICLES =====
function spawnParticles(cardEl, color) {
  const rect = cardEl.getBoundingClientRect();
  const cx   = rect.left + rect.width  / 2;
  const cy   = rect.top  + rect.height / 2;
  const count = 10;

  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = 5 + Math.random() * 6;
    p.style.cssText = `
      width:${size}px; height:${size}px;
      background:${color};
      left:${cx}px; top:${cy}px;
      opacity:1;
    `;
    document.body.appendChild(p);

    const angle = (i / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.6;
    const dist  = 35 + Math.random() * 55;
    const tx    = Math.cos(angle) * dist;
    const ty    = Math.sin(angle) * dist;

    p.animate([
      { transform: `translate(-50%,-50%) scale(1)`,  opacity: 1 },
      { transform: `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px)) scale(0)`, opacity: 0 },
    ], { duration: 450 + Math.random() * 150, easing: 'ease-out' })
    .addEventListener('finish', () => p.remove());
  }
}

// ===== GO =====
init();
