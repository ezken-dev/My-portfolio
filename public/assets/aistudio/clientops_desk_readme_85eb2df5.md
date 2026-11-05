# ⚡ ClientOps Desk — Autonomous Operations & Margin Guardian

**Track 2: Agentic** • **100% Dynamic Engine** • **Powered by Tencent WorkBuddy**

**ClientOps Desk** is a full-stack, local-first agentic web application designed for digital agencies. It automates the entire client onboarding, financial quoting, legal scoping, and margin-protection pipeline—transforming a raw inbound client inquiry into **8 verified commercial, legal, and technical deliverables** directly on your local hard drive.

---

## 🏗️ 1. Workspace & Directory Architecture

The project is housed in `C:\Client OPS\ClientOps-WorkBuddy\` and operates as a hybrid local-agent workspace:

```text
ClientOps-WorkBuddy/
├── .workbuddy-ai/       # Tencent WorkBuddy local agent config, state, and execution rules
├── backend/             # Node.js Local Bridge Server (server.js, package.json, node_modules)
├── docs/                # Supporting project documentation and reference materials
├── inputs/              # Agent input source (client_inquiry.txt & rate_card.csv)
├── outputs/             # Target directory where WorkBuddy writes the 8 deliverables
├── prompts/             # Houses master_system_prompt.txt (margin & formatting rules)
├── bridge.py            # Auxiliary Python bridge script
├── index.html           # Single-file Dark Bento UI Command Center (Frontend)
└── README.md            # Project documentation and architectural handoff
```

*(Note: A standalone `C:\Client OPS\UI-Test\` folder is also maintained with a complete set of the 8 generated artifacts for rapid UI testing.)*

---

## ⚙️ 2. The 3-Tier Technical Stack

### Tier 1: The Frontend Command Center (`index.html`)
* **ChainStock Dark Bento UI Kit:** Engineered with Tailwind CSS featuring a pure carbon-black canvas (`#080808`), dark charcoal Bento cards (`#141414`), crisp `#262626` borders, and high-contrast Neon Lime (`#C6F135`) accents.
* **4-Tier Typography System:**
  * **Space Grotesk:** Major headers, dynamic slide titles, and financial KPI figures.
  * **Outfit:** Interactive buttons, navigation tabs, and uppercase tracking-widest labels.
  * **Manrope:** High-legibility body prose and service breakdown tables.
  * **JetBrains Mono:** Terminal audit logs, cryptographic hashes, JSON/ICS payloads, and line-item numbers.
* **Cinematic Animations:**
  * **Boot Sequence Intro:** Multi-ring neon spinner that initializes the environment and triggers staggered card entrances.
  * **Matrix Laser Scanner:** A glowing `#C6F135` laser line sweeps across the screen while Bento cards pop and flash when new disk data is ingested.
  * **Smooth Crossfades & Shines:** Tab transitions use cubic-bezier slide-ups, and buttons feature a skewed glass light-sweep on hover.
* **Two-Way Local Disk Integration:**
  1. **Outbound (Write):** The **"Launch Autonomous Pipeline"** bar sends raw client inquiries via `POST` to `http://localhost:3000/api/submit-inquiry` when clicking **Deploy Agent**.
  2. **Inbound (Read):** Uses the native Browser File System Access API (`window.showDirectoryPicker()`) via the **Connect Folder** and **Rescan** buttons to read `outputs/` directly from disk with zero cloud uploads.

### Tier 2: The Local Bridge Server (`backend/server.js`)
* Runs locally via Node.js and Express on `http://localhost:3000` with CORS enabled.
* Bypasses browser sandbox restrictions by catching the web app's JSON payload and using `fs.writeFile` to overwrite `inputs/client_inquiry.txt` on the local hard drive.
* Includes `child_process.exec` support so a CLI command can be attached to trigger WorkBuddy headlessly upon file save.

### Tier 3: The Autonomous Brain (Tencent WorkBuddy)
* Reads `inputs/client_inquiry.txt`, cross-references `inputs/rate_card.csv` (6 service lines with $10\%$ to $25\%$ risk buffers), and executes the rules inside `prompts/master_system_prompt.txt`.
* Performs commercial modeling, strips budget-breaking features into a formal Change Order, calculates a safe counter-offer that defends a minimum $20.00\%$ profit margin, and writes all 8 deliverables to `outputs/`.

---

## 📂 3. The 8 Autonomous Deliverables & Dynamic UI Parsing

When `outputs/` is linked, `index.html` dynamically parses 8 specific files across three main tabs (**1. Pipeline Overview**, **2. Financial Model & Pricing**, and **3. Deliverables & Contracts**):

| File Name | Format | Role & How the UI Parses It |
| :--- | :--- | :--- |
| **`00_execution_audit.log`** | Text Log | **Proof of Reliability:** Logs `margin_red_flags`, `scope_violations_caught`, `self_corrections_executed`, prior run comparisons (*UrbanKicks*, *Apex*, *MediSync*), and `sha256` provenance hashes. Rendered in the dark terminal viewer (`#audit-log-terminal`). |
| **`01_financial_estimate.csv`** | CSV | **Commercial Matrix:** 7-column breakdown (*Package Tier, Service Scope, Hours, Rate/Hr, Base Cost, Risk Buffer %, Line Total*). Parsed via a custom regex splitter that ignores commas inside quotes, calculates total billable hours, and populates the **Tier A (MVP)** and **Tier B (Full Scope)** KPI cards. |
| **`02_scope_of_work.md`** | Markdown | **Legal Contract:** Rendered via `marked.js` in Tab 3. Also scanned via regex in Tab 1 to auto-extract **Client Name**, **Contact**, **Budget Limit** (synced to Tab 2's Budget Ceiling KPI), **Deadline**, and **Project Context**. |
| **`03_client_proposal_slides.md`** | Markdown | **Executive Pitch Deck:** 6-slide presentation split by `---` dividers. Parsed into an interactive slide player with Prev/Next controls, fullscreen mode, asterisk sanitization, and a **Dynamic Industry Theme Engine** (`#00E5FF` Neon Blue for Healthcare/MediSync, `#FF9100` Neon Orange for Real Estate/Apex, `#E040FB` Neon Purple for Retail/UrbanKicks, and `#C6F135` Neon Lime for Tech). |
| **`04_sprint_calendar_schedule.ics`** | iCalendar | **Sprint Schedule:** Production-ready calendar file mapping sprint milestones. Displayed in the **Code (ICS/JSON)** viewer and bundled for one-click download. |
| **`05_fpx_payment_intent.json`** | JSON | **Payment Payload:** Structured payment gateway payload for Malaysian FPX and credit card milestone collection. Displayed alongside the `.ics` file in Tab 3. |
| **`06_client_negotiation_addendum.md`** | Markdown | **Pushback Strategy:** Pre-computed counter-offer strategy when a client demands a discount (e.g., defending a $22.00\%$ margin at RM 22,000 via template-UI savings). Scanned via contextual regex to populate the **Pushback Target** KPI card in Tab 2. |
| **`07_change_order_request_01.md`** | Markdown | **Scope Creep Interceptor:** Isolates out-of-scope requests (such as *Insurance Direct Billing* and *Bahasa Melayu* localization) into a formal upsell document. Linked to the **2. View Change Order** quick scenario button. |

---

## 🚀 4. Setup & Operating Instructions

### Step 1: Start the Local Backend Bridge
1. Open **Command Prompt** and navigate to the backend directory:
   ```cmd
   cd "C:\Client OPS\ClientOps-WorkBuddy\backend"
   ```
2. Install dependencies (only required once):
   ```cmd
   npm install express cors
   ```
3. Launch the bridge server:
   ```cmd
   node server.js
   ```
   *(Keep this terminal window open in the background. You should see `✅ Local Bridge Server running at http://localhost:3000`.)*

### Step 2: Launch the Web App & Link Your Disk
1. Open `C:\Client OPS\ClientOps-WorkBuddy\index.html` in any modern Chromium browser (Chrome, Edge, Opera GX, Brave).
2. Click the neon **📁 Connect Folder** button in the top right corner and select your `ClientOps-WorkBuddy` (or `outputs`) directory.
3. The app will trigger the neon scanner animation and load all 8 deliverables into the dashboard.

### Step 3: Deploy a New Client Inquiry
1. Paste a raw client brief into the **"Launch Autonomous Pipeline"** text box at the top of the dashboard.
2. Click **⚡ Deploy Agent**.
3. The backend server will immediately overwrite `inputs/client_inquiry.txt` on your hard drive.
4. Once Tencent WorkBuddy finishes generating the updated files in `outputs/`, click the **Rescan** button in the top right corner of the web app to refresh the entire UI.

---

## 🔄 5. Handoff Prompt for Future Sessions

If you are starting a new chat session to continue developing this project, paste the following context prompt:

> *"I am continuing work on **ClientOps Desk**, a local-first agentic web application powered by Tencent WorkBuddy. It uses a single-file frontend (`index.html`) styled with a ChainStock Dark Bento UI Kit (`#080808` background, `#141414` cards, `#C6F135` neon lime accents, and Space Grotesk/Outfit/Manrope/JetBrains Mono fonts). It connects to a local Node.js Express bridge (`backend/server.js`) on port 3000 that writes inquiries from the UI to `inputs/client_inquiry.txt`, while the frontend reads WorkBuddy's 8 generated deliverables from `outputs/` using the Browser File System Access API. Please help me with the next phase of automation and feature development."*