// ============================================================
// CERBERUS ESCAPE ROOM — APP.JS
// State machine + puzzle logic. No dependencies.
// ============================================================

// ---- State -------------------------------------------------
const State = {
  INTRO:     'INTRO',
  STAGE_0:   'STAGE_0',   // Lockdown screen (after bad login triggers alert)
  STAGE_1:   'STAGE_1',   // Identify key & plug in Key A
  STAGE_2:   'STAGE_2',   // Decode cipher
  STAGE_3:   'STAGE_3',   // Enter codeword
  STAGE_4:   'STAGE_4',   // Dual auth with Key B
  WIN:       'WIN',
  FAIL:      'FAIL',
};

let currentState = State.INTRO;
let timerInterval = null;
let secondsLeft = CONFIG.TIMER_SECONDS;
let keyAAuthenticated = false;
let keyBAuthenticated = false;
let otpBuffer = "";
let activeCredential = null;
let sessionCode = '—';

// ---- Credential picker -------------------------------------
function pickCredential() {
  const creds = CONFIG.LOGIN_CREDENTIALS;
  const idx = Math.floor(Math.random() * creds.length);
  activeCredential = creds[idx];
  sessionCode = String.fromCharCode(65 + idx); // 0→A, 1→B, 2→C, 3→D

  const codeEl = document.getElementById('session-code-value');
  if (codeEl) codeEl.textContent = sessionCode;
}

// ---- Init --------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  pickCredential();
  setupLoginForm();
  setupYubiKeyListener();
  showScreen('screen-intro');
});

// ---- Screen routing ----------------------------------------
function showScreen(screenId) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const target = document.getElementById(screenId);
  if (target) target.classList.add('active');
}

function setHUD(visible, stageText) {
  const hud = document.getElementById('hud');
  if (visible) {
    hud.classList.add('visible');
    document.getElementById('hud-stage').textContent = stageText || '';
  } else {
    hud.classList.remove('visible');
  }
}

// ---- Timer -------------------------------------------------
function startTimer() {
  secondsLeft = CONFIG.TIMER_SECONDS;
  renderTimer();
  timerInterval = setInterval(() => {
    secondsLeft--;
    renderTimer();
    if (secondsLeft <= 0) {
      clearInterval(timerInterval);
      goFail();
    }
  }, 1000);
}

function stopTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
}

function renderTimer() {
  const el = document.getElementById('hud-timer');
  const m = Math.floor(secondsLeft / 60).toString().padStart(2, '0');
  const s = (secondsLeft % 60).toString().padStart(2, '0');
  el.textContent = `T-${m}:${s}`;
  el.classList.remove('warning', 'danger');
  if (secondsLeft <= 30)       el.classList.add('danger');
  else if (secondsLeft <= 90)  el.classList.add('warning');
}

function getTimeRemaining() {
  const m = Math.floor(secondsLeft / 60).toString().padStart(2, '0');
  const s = (secondsLeft % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

// ---- Intro -------------------------------------------------
function beginMission() {
  playSound('beep');
  currentState = State.STAGE_0;
  showScreen('screen-stage0');
  // HUD not shown yet — timer starts after lockdown trigger
}

// ---- Stage 0: Login form -----------------------------------
function setupLoginForm() {
  const form = document.getElementById('login-form');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    handleLogin();
  });
}

function handleLogin() {
  const emailEl = document.getElementById('login-email');
  const passEl  = document.getElementById('login-pass');
  const errEl   = document.getElementById('login-error');

  const email = emailEl.value.trim();
  const pass  = passEl.value;

  // Wrong credentials — show error and stay on login
  if (email !== activeCredential.email || pass !== activeCredential.password) {
    errEl.textContent = "Authentication failed. Check your credentials.";
    passEl.value = '';
    passEl.focus();
    playSound('beep');
    return;
  }

  // Correct credentials → trigger the drama
  errEl.textContent = '';
  playSound('alarm');

  // Brief "Welcome back" flash before lockdown
  const panel = document.querySelector('.login-panel');
  panel.style.transition = 'opacity 0.3s';
  panel.style.opacity = '0';

  setTimeout(() => {
    transitionToLockdown();
  }, 600);
}

function transitionToLockdown() {
  currentState = State.STAGE_1; // Move past stage 0 — lockdown is the bridge
  showScreen('screen-lockdown');
  setHUD(true, '● LOCKDOWN ACTIVE');
  startTimer();
  focusYubiKeyInput();
}

// ---- Stage 1: Identify the breach + plug in Key A ----------
function enterStage1() {
  currentState = State.STAGE_1;
  showScreen('screen-stage1');
  setHUD(true, '● STAGE 1 — IDENTIFY BREACH');

  // Show the target fingerprint suffix
  const el = document.getElementById('stage1-fp');
  if (el) {
    const target = CONFIG.ROSTER.find(r => r.isTarget);
    el.textContent = `...${target ? target.keySuffix : '????'}`;
  }
  const demoBtn = document.getElementById('demo-key-a');
  if (demoBtn) demoBtn.style.display = CONFIG.YUBIKEY_REQUIRED ? 'none' : 'block';
  setStage1Status('info', CONFIG.YUBIKEY_REQUIRED ? 'Plug in the correct YubiKey and touch it.' : 'Demo mode: use the button below to simulate a key touch.');
  focusYubiKeyInput();
}

function setStage1Status(type, msg) {
  const el = document.getElementById('stage1-status');
  if (!el) return;
  el.className = `status-msg ${type}`;
  el.textContent = msg;
}

// ---- Stage 2: Cipher display -------------------------------
function enterStage2() {
  currentState = State.STAGE_2;
  showScreen('screen-stage2');
  setHUD(true, '● STAGE 2 — DECRYPT MESSAGE');

  const el = document.getElementById('stage2-encoded');
  if (el) el.textContent = CONFIG.ENCODED_MESSAGE;
  focusYubiKeyInput();
}

// Stage 2 advances automatically via button — no YubiKey needed
function stage2Continue() {
  playSound('beep');
  enterStage3();
}

// ---- Stage 3: Enter codeword -------------------------------
let codewordBuffer = '';

function enterStage3() {
  currentState = State.STAGE_3;
  codewordBuffer = '';
  showScreen('screen-stage3');
  setHUD(true, '● STAGE 3 — ENTER CODEWORD');

  const refEl = document.getElementById('stage3-encoded-ref');
  if (refEl) refEl.textContent = CONFIG.ENCODED_MESSAGE;

  renderCodeword();
  setStage3Status('info', 'Type the decoded codeword on the keyboard.');
  // For stage 3, we capture keypresses directly (not YubiKey)
  focusYubiKeyInput();
}

function renderCodeword() {
  const boxes = document.querySelectorAll('.code-char-box');
  boxes.forEach((box, i) => {
    const ch = codewordBuffer[i] || '';
    box.textContent = ch;
    box.classList.toggle('filled', ch !== '');
    box.classList.remove('error');
  });
}

function setStage3Status(type, msg) {
  const el = document.getElementById('stage3-status');
  if (!el) return;
  el.className = `status-msg ${type}`;
  el.textContent = msg;
}

// ---- Stage 4: Dual auth ------------------------------------
function enterStage4() {
  currentState = State.STAGE_4;
  showScreen('screen-stage4');
  setHUD(true, '● STAGE 4 — DUAL AUTHENTICATION');

  // Key A slot is already filled
  setSlotState('slot-a', 'authenticated', '✓ AUTHENTICATED');
  setSlotState('slot-b', 'waiting', 'INSERT KEY B');

  const hint = document.getElementById('stage4-hint');
  if (hint) hint.textContent = CONFIG.KEY_B_HINT;

  const demoBtn = document.getElementById('demo-key-b');
  if (demoBtn) demoBtn.style.display = CONFIG.YUBIKEY_REQUIRED ? 'none' : 'block';
  setStage4Status('info', CONFIG.YUBIKEY_REQUIRED ? 'Locate Key B and plug it in, then touch it.' : 'Demo mode: use the button below to simulate a key touch.');
  focusYubiKeyInput();
}

function setSlotState(slotId, className, statusText) {
  const slot = document.getElementById(slotId);
  if (!slot) return;
  slot.className = `key-slot ${className}`;
  const statusEl = slot.querySelector('.key-slot-status');
  if (statusEl) statusEl.textContent = statusText;
}

function setStage4Status(type, msg) {
  const el = document.getElementById('stage4-status');
  if (!el) return;
  el.className = `status-msg ${type}`;
  el.textContent = msg;
}

// ---- Win / Fail --------------------------------------------
function goWin() {
  stopTimer();
  currentState = State.WIN;
  showScreen('screen-win');
  setHUD(false);
  playSound('success');

  const timeEl = document.getElementById('win-time');
  if (timeEl) timeEl.textContent = `Time remaining: ${getTimeRemaining()}`;

  setTimeout(() => spawnConfetti(), 300);
}

function goFail() {
  stopTimer();
  currentState = State.FAIL;
  showScreen('screen-fail');
  setHUD(false);
  playSound('alarm');
}

function resetGame() {
  stopTimer();
  currentState = State.INTRO;
  keyAAuthenticated = false;
  keyBAuthenticated = false;
  otpBuffer = '';
  codewordBuffer = '';
  secondsLeft = CONFIG.TIMER_SECONDS;
  pickCredential();

  // Reset login form
  const emailEl = document.getElementById('login-email');
  const passEl  = document.getElementById('login-pass');
  const errEl   = document.getElementById('login-error');
  if (emailEl) emailEl.value = '';
  if (passEl)  passEl.value  = '';
  if (errEl)   errEl.textContent = '';

  const panel = document.querySelector('.login-panel');
  if (panel) { panel.style.opacity = ''; panel.style.transition = ''; }

  setHUD(false);
  showScreen('screen-intro');
}

// ---- YubiKey listener -------------------------------------
// The YubiKey types its OTP as fast keystrokes, ending with Enter.
// We keep a hidden input focused during stages that need it,
// and listen for keydown to detect End-of-OTP.

function setupYubiKeyListener() {
  const input = document.getElementById('yubikey-input');
  if (!input) return;

  // Capture typing into otpBuffer (for YubiKey OTP stages)
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const otp = input.value.trim();
      input.value = '';
      if (otp.length > 0) {
        handleOTPOrKeypress(otp);
      }
    }
  });

  // Also intercept body keydown for stage 3 (regular keyboard)
  document.addEventListener('keydown', (e) => {
    handleBodyKeydown(e);
  });
}

function focusYubiKeyInput() {
  const input = document.getElementById('yubikey-input');
  if (input) {
    // Small delay ensures the screen transition has settled
    setTimeout(() => input.focus(), 100);
  }
}

// Refocus hidden input if user taps anywhere during key stages
document.addEventListener('click', () => {
  if ([State.STAGE_1, State.STAGE_4].includes(currentState)) {
    focusYubiKeyInput();
  }
});

// ---- Keyboard handler for stage 3 codeword entry ----------
function handleBodyKeydown(e) {
  if (currentState !== State.STAGE_3) return;
  if (e.target.id === 'login-email' || e.target.id === 'login-pass') return;

  const key = e.key.toUpperCase();

  if (e.key === 'Backspace') {
    codewordBuffer = codewordBuffer.slice(0, -1);
    renderCodeword();
    setStage3Status('info', 'Type the decoded codeword on the keyboard.');
    return;
  }

  if (e.key === 'Enter') {
    validateCodeword();
    return;
  }

  if (/^[A-Z]$/.test(key) && codewordBuffer.length < CONFIG.CODEWORD.length) {
    codewordBuffer += key;
    renderCodeword();

    if (codewordBuffer.length === CONFIG.CODEWORD.length) {
      setTimeout(validateCodeword, 200);
    }
  }
}

function validateCodeword() {
  if (codewordBuffer.toUpperCase() === CONFIG.CODEWORD.toUpperCase()) {
    setStage3Status('ok', '✓ Codeword accepted. Sequence partially halted.');
    playSound('beep');
    // Mark boxes green briefly, then advance
    document.querySelectorAll('.code-char-box').forEach(b => b.classList.add('filled'));
    setTimeout(() => enterStage4(), 1200);
  } else {
    setStage3Status('error', '✗ Invalid codeword. Try again.');
    playSound('beep');
    document.querySelectorAll('.code-char-box').forEach(b => b.classList.add('error'));
    setTimeout(() => {
      codewordBuffer = '';
      renderCodeword();
      setStage3Status('info', 'Type the decoded codeword on the keyboard.');
    }, 900);
  }
}

// ---- OTP handler (YubiKey stages 1 & 4) -------------------
function handleOTPOrKeypress(otp) {
  switch (currentState) {
    case State.STAGE_1:
      handleStage1OTP(otp);
      break;
    case State.STAGE_4:
      handleStage4OTP(otp);
      break;
    default:
      break;
  }
}

function identifyKey(otp) {
  const prefix = otp.slice(0, 12);
  if (prefix === CONFIG.KEY_A_PREFIX) return 'A';
  if (prefix === CONFIG.KEY_B_PREFIX) return 'B';
  return null;
}

function handleStage1OTP(otp) {
  const key = identifyKey(otp);

  if (key === 'A') {
    keyAAuthenticated = true;
    setStage1Status('ok', '✓ Token verified. Commit author confirmed: A. Wright');
    playSound('beep');
    setTimeout(() => enterStage2(), 1400);
  } else if (key === 'B') {
    setStage1Status('error', '✗ Wrong key. Check the roster and select the correct one.');
    playSound('beep');
  } else if (otp.length >= 32) {
    // Looks like a YubiKey OTP but prefix doesn't match either known key
    setStage1Status('error', '✗ Unrecognized key. Not in CERBERUS registry.');
    playSound('beep');
  } else {
    // Probably noise / accidental input — ignore silently
  }
  focusYubiKeyInput();
}

function handleStage4OTP(otp) {
  const key = identifyKey(otp);

  if (key === 'B' && !keyBAuthenticated) {
    keyBAuthenticated = true;
    setSlotState('slot-b', 'authenticated', '✓ AUTHENTICATED');
    setStage4Status('ok', '✓ Dual authentication complete. Aborting sequence...');
    playSound('beep');
    setTimeout(() => goWin(), 1600);
  } else if (key === 'A') {
    setStage4Status('error', '✗ Key A already used. A different key is required.');
    playSound('beep');
    focusYubiKeyInput();
  } else if (key === 'B' && keyBAuthenticated) {
    // Already done — shouldn't happen but handle gracefully
    goWin();
  } else if (otp.length >= 32) {
    setStage4Status('error', '✗ Unrecognized key. Locate the correct secondary key.');
    playSound('beep');
    focusYubiKeyInput();
  }
}

// ---- Confetti ----------------------------------------------
function spawnConfetti() {
  const colors = ['#00ff41', '#ffaa00', '#00aaff', '#ff44aa', '#ffffff'];
  for (let i = 0; i < 80; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    piece.style.left = Math.random() * 100 + 'vw';
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.width  = (Math.random() * 8 + 6) + 'px';
    piece.style.height = (Math.random() * 8 + 6) + 'px';
    piece.style.animationDuration = (Math.random() * 2 + 2.5) + 's';
    piece.style.animationDelay    = (Math.random() * 1.5) + 's';
    document.body.appendChild(piece);
    piece.addEventListener('animationend', () => piece.remove());
  }
}

// ---- Audio -------------------------------------------------
const audioCache = {};

function playSound(name) {
  if (!CONFIG.AUDIO_ENABLED) return;
  try {
    const map = { beep: 'sounds/beep.mp3', success: 'sounds/success.mp3', alarm: 'sounds/alarm.mp3' };
    const src = map[name];
    if (!src) return;
    if (!audioCache[name]) {
      audioCache[name] = new Audio(src);
    }
    const audio = audioCache[name].cloneNode();
    audio.volume = 0.7;
    audio.play().catch(() => {}); // ignore autoplay policy errors
  } catch (e) { /* silent fail */ }
}

// ---- Demo mode simulation ----------------------------------
// Called by the on-screen buttons when YUBIKEY_REQUIRED is false.
// Constructs a mock OTP with the correct prefix so the normal
// key-identification logic passes without a physical key.
function simulateKeyA() {
  handleOTPOrKeypress(CONFIG.KEY_A_PREFIX + 'x'.repeat(32));
}

function simulateKeyB() {
  handleOTPOrKeypress(CONFIG.KEY_B_PREFIX + 'x'.repeat(32));
}

// ---- Lockdown continue button ------------------------------
function lockdownContinue() {
  playSound('beep');
  enterStage1();
}

// ---- Expose to HTML ----------------------------------------
window.beginMission     = beginMission;
window.lockdownContinue = lockdownContinue;
window.stage2Continue   = stage2Continue;
window.resetGame        = resetGame;
window.simulateKeyA     = simulateKeyA;
window.simulateKeyB     = simulateKeyB;
