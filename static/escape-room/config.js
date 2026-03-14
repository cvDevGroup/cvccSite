// ============================================================
// CERBERUS ESCAPE ROOM — CONFIG
// Edit before each event. Do NOT share publicly.
// ============================================================

const CONFIG = {
  // ---- Timer ------------------------------------------------
  TIMER_SECONDS: 300, // 5 minutes (300 seconds)

  // ---- Stage 0 login credentials ---------------------------
  // One set is chosen at random each time the game loads.
  // Each object: { name, email, password }
  LOGIN_CREDENTIALS: [
    { name: "A. Wright", email: "a.wright@cvcc.dev",  password: "CodeCamp2026!" },
    { name: "J. Torres", email: "j.torres@cvcc.dev",  password: "Volunteer#1"   },
    { name: "S. Kim",    email: "s.kim@cvcc.dev",     password: "AppDev2026"    },
    { name: "R. Patel",  email: "r.patel@cvcc.dev",   password: "AVTech#99"     },
  ],

  // ---- Stage 1: YubiKey prefixes ---------------------------
  // First 12 chars of OTP output identify which physical key was used.
  // To find these: open a text editor, plug in the key, touch it,
  // copy the first 12 characters of the output.
  KEY_A_PREFIX: "ccccccfhgnlr", // Key A — primary / stage 1
  KEY_B_PREFIX: "ccccccelrtgt", // Key B — secondary / stage 4

  // ---- Stage 1: Team roster (displayed on physical prop) ---
  // 'suffix' is the last 4 chars shown on the roster card.
  // The app matches on the full prefix above; this is just for
  // generating the prop printout reference.
  ROSTER: [
    { name: "A. Wright",  dept: "Site Reliability", keySuffix: "gnlr", isTarget: true  },
    { name: "J. Torres",  dept: "Web Volunteer",    keySuffix: "rt7x", isTarget: false },
    { name: "S. Kim",     dept: "App Dev",          keySuffix: "2mk9", isTarget: false },
    { name: "R. Patel",   dept: "AV & Networking",  keySuffix: "9cbe", isTarget: false },
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
};
