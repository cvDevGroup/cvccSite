// ============================================================
// CERBERUS ESCAPE ROOM — CONFIG
// Edit before each event. Do NOT share publicly.
// ============================================================

const CONFIG = {
  // ---- Timer ------------------------------------------------
  TIMER_SECONDS: 300, // 5 minutes (300 seconds)

  // ---- Roster -----------------------------------------------
  // Single source of truth for all users.
  // email + password: used for Stage 0 login (one user chosen at random each game).
  // keyPrefix: first 12 chars of the YubiKey OTP — use Live OTP Capture in admin.
  //   Leave blank ("") until a key is assigned; blanks are excluded from play.
  // keySuffix: shown on the physical roster prop card.
  // KEY_B_USER_ID: always used for Stage 4 (dual auth). Excluded from Stage 0/1 pool.
  //   All other users with a keyPrefix are eligible for Stage 0 login + Stage 1 key.
  KEY_B_USER_ID: "CVCC2026-45",

  ROSTER: [
    { id: "CVCC2026-61", firstName: "Tommy",    lastName: "Luangrath", name: "Tommy Luangrath",  dept: "Check-in Volunteer",    email: "t.luangrath@cvcc.dev", password: "dontlayafinger", keyPrefix: "ccccccfhgnlg", keySuffix: "CVCC2026-61", favoriteColor: "Yellow", favoriteSweet: "Butterfinger" },
    { id: "CVCC2026-21", firstName: "Mitchell", lastName: "Weston",    name: "Mitchell Weston",  dept: "Sponsor Coordinator",   email: "m.weston@cvcc.dev",    password: "password123",    keyPrefix: "ccccccfhgngl", keySuffix: "CVCC2026-21", favoriteColor: "Red",    favoriteSweet: "PayDay"       },
    { id: "CVCC2026-45", firstName: "Jessica",  lastName: "Torres",    name: "Jessica Torres",   dept: "Organizer",             email: "j.torres@cvcc.dev",    password: "Volunteer#1",    keyPrefix: "ccccccelrtgt", keySuffix: "CVCC2026-45", favoriteColor: "Blue",   favoriteSweet: "Left Twix"    },
    { id: "CVCC2026-87", firstName: "Dan",      lastName: "Bunmander", name: "Dan Bunmander",    dept: "Activities Specialist", email: "d.bunmander@cvcc.dev", password: "cake4me",        keyPrefix: "cccccdbhnrnc", keySuffix: "CVCC2026-87", favoriteColor: "White",  favoriteSweet: "Cake"         },
  ],

  // ---- Stage 2: Cipher ------------------------------------
  // Encoded string displayed on screen. ROT-3 (Caesar +3).
  // "THE CODE IS: DELTA" → encoded with ROT-3 → "WKH FRGH LV: GHOWD"
  ENCODED_MESSAGE: "WKH FRGH LV: GHOWD",
  CODEWORD: "DELTA", // Players decode and type this in Stage 3

  // ---- Stage 4: Second key hint ---------------------------
  // Shown as a clue on screen after stage 3 passes.
  KEY_B_HINT: "Locate the secondary authentication device.\nCheck the volunteer station for the backup hardware key.",

  // ---- Admin panel PIN ------------------------------------
  ADMIN_PIN: "1337",

  // ---- Win screen QR URL ----------------------------------
  // Replace with actual Yubico landing page or giveaway URL
  WIN_QR_URL: "https://www.yubico.com",

  // ---- Audio (set false to disable) -----------------------
  AUDIO_ENABLED: true,

  // ---- Demo mode ------------------------------------------
  // Set to false when no physical YubiKeys are available.
  // Adds a visible "Simulate YubiKey Touch" button on stages 1 and 4
  // so the game can be run and tested without hardware.
  // Set back to true before any real event.
  YUBIKEY_REQUIRED: false,

  // ---- Stage toggles --------------------------------------
  // Set any stage to false to skip it entirely during play.
  // Can also be changed live from the admin panel (stored in localStorage,
  // which takes precedence over these defaults).
  STAGES_ENABLED: {
    s0: true, // Stage 0 — Login
    s1: true, // Stage 1 — Identify committer (Key A)
    s2: false, // Stage 2 — Decrypt cipher
    s3: false, // Stage 3 — Enter codeword
    s4: true, // Stage 4 — Dual auth (Key B)
  },
};
