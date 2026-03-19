# Project Cerberus — YubiKey Escape Room

A 5-minute conference escape room experience built for developer audiences. Players trigger a simulated AI containment breach by logging in with a found password, then race to abort the sequence using hardware YubiKeys.

No backend. No external dependencies. Runs as a Hugo page within the cvccSite project.

---

## Requirements

| Item | Count | Notes |
|---|---|---|
| iPad (10th gen+ or Pro/Air) | 1–2 | USB-C preferred |
| YubiKey 5 NFC or 5C | 2–4 | Need at least 2 for the final stage |
| USB-C to USB-A adapter | 1 | If your keys are USB-A type |
| Printed props | — | See [Props](#props) section below |

---

## Quick Start

1. **Configure your keys** — see [YubiKey Setup](#yubikey-setup) below
2. Edit `static/escape-room/config.js` with your key prefixes
3. Run `hugo serve` (or deploy the site) and open `/escape-room/` in Safari on the iPad
4. Enable Guided Access (optional but recommended for kiosk mode)
5. Run through the game once as a staff member to verify everything works

---

## YubiKey Setup

Each YubiKey has a unique OTP prefix — the first 12 characters of its output. You need these to tell the game which key is which.

**To find a key's prefix:**

1. Open any text editor on any computer (or use the Admin Panel's OTP capture tool)
2. Click into the text field
3. Plug in the YubiKey and touch the gold contact
4. The key will type a 44-character string — copy the **first 12 characters**
5. Repeat for each key

**Then open `static/escape-room/config.js` and set:**

```js
KEY_A_PREFIX: "ccccccfhgnlr",  // Key A — used in Stage 1
KEY_B_PREFIX: "ccccccelrtgt",  // Key B — used in Stage 4
```

Replace the example values with the ones you captured.

---

## Configuration (`static/escape-room/config.js`)

All event-specific settings live in one place:

| Setting | Description |
|---|---|
| `TIMER_SECONDS` | Game duration in seconds (default: 300 = 5 min) |
| `LOGIN_EMAIL` / `LOGIN_PASSWORD` | Credentials on the sticky note prop |
| `KEY_A_PREFIX` / `KEY_B_PREFIX` | First 12 chars of each YubiKey's OTP |
| `ROSTER` | Team member names and fingerprint suffixes shown on the roster prop |
| `ENCODED_MESSAGE` | The ROT-3 encoded string displayed in Stage 2 |
| `CODEWORD` | The decoded answer players type in Stage 3 (default: `DELTA`) |
| `ADMIN_PIN` | 4-digit PIN for the admin panel (default: `1337`) |
| `WIN_QR_URL` | URL encoded into the QR code on the win screen |
| `AUDIO_ENABLED` | Set to `false` to disable all sounds |

> **Note:** If you change `CODEWORD`, update `ENCODED_MESSAGE` to match. ROT-3 shifts each letter forward by 3 positions (A→D, B→E, etc.). Example: `DELTA` encoded with ROT-3 becomes `GHOWD`.

---

## Running on iPad (Recommended)

### Opening the game

The escape room is served by Hugo as part of the cvccSite project.

**Option A — Hugo dev server (local, for testing)**
1. On a laptop connected to the same Wi-Fi, run:
   ```bash
   hugo serve --bind 0.0.0.0
   ```
2. On the iPad, open Safari and navigate to `http://<your-laptop-ip>:1313/escape-room/`

**Option B — Deployed site**
1. Deploy the Hugo site as normal (`hugo` → publish `public/`)
2. On the iPad, navigate to `https://yoursite.com/escape-room/`

### Kiosk mode (Guided Access)

To prevent players from accidentally leaving the app:

1. Go to **Settings → Accessibility → Guided Access** and turn it on
2. Open Safari with `/escape-room/` loaded
3. Triple-click the side button to start Guided Access
4. Tap **Start** — the iPad is now locked to that screen
5. Triple-click again and enter your passcode to exit

---

## Admin Panel (`/escape-room/admin/`)

Open `/escape-room/admin/` in a browser (separately from the game) for event management.

- **PIN-gated** — enter the 4-digit `ADMIN_PIN` from `config.js`
- **OTP Capture** — click the input box, touch a YubiKey, and the prefix is extracted automatically
- **Config display** — shows current key prefixes, codeword, and timer duration loaded from `config.js`
- **Reset button** — redirects to `/escape-room/` (use between groups)

---

## Game Flow

```
INTRO → Stage 0 (login with sticky note creds — triggers lockdown)
      → Stage 1 (find correct key on roster, plug in Key A)
      → Stage 2 (decode ROT-3 cipher using the cipher wheel prop)
      → Stage 3 (type the 5-letter codeword)
      → Stage 4 (find hidden Key B, plug in for dual auth)
      → WIN or FAIL (if timer expires)
```

**Timer:** Starts the moment lockdown triggers (after Stage 0 login). The HUD counts down with color warnings — amber at 90 seconds, red at 30 seconds.

---

## Props

Print and laminate these before the event:

| Prop | Content | Used In |
|---|---|---|
| **Sticky note** | `m.reeves@cerberus.io` / `Summer2024!` (or whatever is in `config.js`) | Stage 0 |
| **Team Roster card** | 4 names, departments, and key fingerprint suffixes from `config.js` | Stage 1 |
| **ROT-3 Cipher Wheel** | Alphabet with +3 shift — A=D, B=E, C=F, etc. | Stage 2 |
| **YubiKey labels** | Small sticker on each key with the team member's name | Stage 1 |
| **"Authorized Personnel Only" sign** | Flavor/immersion | Desk dressing |

**For the Team Roster card**, the fingerprint suffixes to print are the last 4 characters of each prefix defined in `config.js → ROSTER`. The target key (M. Reeves) should match the terminal display in Stage 1.

**Hiding Key B** (Stage 4 options):
- Taped under the table
- Inside a small combination lockbox
- In a sealed envelope labeled "BREAK ONLY IN EMERGENCY"

---

## Sounds (Optional)

Drop the following MP3 files into `static/escape-room/sounds/` to enable audio:

| File | Used For |
|---|---|
| `beep.mp3` | Button presses, successful key auth |
| `alarm.mp3` | Lockdown trigger, fail screen |
| `success.mp3` | Win screen |

If files are missing, the game runs silently. Audio can also be globally disabled with `AUDIO_ENABLED: false` in `config.js`.

Free sources: [freesound.org](https://freesound.org), [mixkit.co](https://mixkit.co/free-sound-effects/), [zapsplat.com](https://www.zapsplat.com)

---

## Reset Between Groups

1. Tap **Reset** in the admin panel (or navigate to `/escape-room/`)
2. Retrieve Key B from its hiding spot and re-hide it
3. Reposition any moved props
4. Ready in ~60 seconds

---

## Difficulty Tuning

| Setting | Easier | Harder |
|---|---|---|
| Timer | 7 min (`420`) | 4 min (`240`) |
| Cipher | ROT-3 with a cheat sheet | Remove the cipher wheel |
| Key B hiding spot | In plain sight, labeled | Locked box with combination clue |
| Keys required | 2 keys | Add a third prefix and stage |

---

## Troubleshooting

**YubiKey isn't being detected**
- Make sure the hidden input is focused — tap anywhere on an active key-auth screen to refocus
- Verify the prefix in `config.js` matches the key by capturing it fresh in the admin panel
- Check that the key is fully inserted and you're touching the gold contact (not just resting your finger)

**Login form isn't accepting credentials**
- Double-check `LOGIN_EMAIL` and `LOGIN_PASSWORD` in `config.js` — values are case-sensitive
- Confirm the sticky note prop matches exactly what's in the config

**Audio not playing**
- iOS requires a user interaction before playing audio — this is handled, but if sounds are missing the game continues silently
- Make sure MP3 files are present in `static/escape-room/sounds/` and `AUDIO_ENABLED` is `true`

**Timer is wrong**
- `TIMER_SECONDS` in `config.js` is in seconds — `300` = 5 minutes, `420` = 7 minutes
