export const CV_PDF_URL = '/assets/aistudio/Rifat_CV_b643f068.pdf';
export const CV_DOWNLOAD_FILENAME = 'Rifat_Ashhab_Bin_Sharif_CV.pdf';

export interface ProjectGallerySlide {
  src: string;
  label: string;
  caption: string;
}

export interface HowItWorksStep {
  step: string;
  title: string;
  detail: string;
}

export interface ProjectItem {
  id: string;
  index: string;
  category: 'ai' | 'website' | 'video' | 'graphics';
  title: string;
  desc: string;
  longDesc?: string;
  tags: string[];
  link: string;
  img: string;
  featured?: boolean;
  year: string;
  deliverable: string;
  gallery?: ProjectGallerySlide[];
  howItWorks?: HowItWorksStep[];
  highlights?: string[];
}

export interface ExperienceItem {
  id: string;
  date: string;
  role: string;
  company: string;
  companyUrl?: string;
  bullets: string[];
  defaultOpen?: boolean;
}

export interface MilestoneItem {
  number: string;
  title: string;
  subtitle: string;
  url: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export interface TechArsenalCategory {
  category: string;
  skills: string[];
}

export const NATIONAL_CERTIFICATION = {
  id: '#009686',
  title: 'AI VISIONARY – LEVEL 6',
  issuer: "Rakyat Digital / I'm AI Ready",
  score: '95/100',
  summary:
    'Certified top tier across 6 dimensions: Cognitive, Behavioral, Technical Skills, Real-World Exposure, Mindset, and Career Track.'
};

export const EDUCATION_INFO = {
  university: "Taylor's University",
  location: 'Subang Jaya, MY',
  degree: 'Bachelor of Computer Science',
  specialization: 'Specialization: Artificial Intelligence'
};

export const TECH_ARSENAL_CATEGORIES: TechArsenalCategory[] = [
  {
    category: 'AI & COMPUTER VISION',
    skills: [
      'Gemini API',
      'Tencent WorkBuddy Agentic AI',
      'Google Places API',
      'MediaPipe Vision',
      'Prompt Engineering',
      'RAG Systems',
      'Autonomous Agents'
    ]
  },
  {
    category: 'FRONTEND & 3D WEB',
    skills: [
      'React.js',
      'Next.js',
      'TypeScript',
      'Three.js (WebGL)',
      'HTML5 Canvas',
      'Tailwind CSS',
      'Vanilla JS'
    ]
  },
  {
    category: 'BACKEND & INFRASTRUCTURE',
    skills: [
      'Node.js',
      'Express',
      'Discord.js v14',
      'WebSockets',
      'Firebase',
      'Cloudflare',
      'Netlify'
    ]
  },
  {
    category: 'GAME ENGINES & AUDIOVISUAL',
    skills: [
      'Luau (Roblox Studio)',
      'Video Cinematography & Editing',
      'Sound Design',
      'Motion Design',
      'Blender 3D',
      'Figma'
    ]
  }
];

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'vixa-lead-finder',
    index: '01',
    category: 'ai',
    title: 'Vixa Lead Finder & Client Tracker',
    desc: 'Global B2B lead discovery and website auditing engine powered by the Google Places API and Node.js. Finds businesses anywhere in the world, scans and scores their websites, and automatically extracts emails, phone numbers, and linked social media profiles.',
    longDesc:
      'Vixa Lead Finder (Vixa Client Tracker) is a proprietary full-stack B2B lead intelligence, website auditing, and outbound CRM platform built to automate agency client acquisition worldwide. By combining the Google Places API with a custom Node.js web crawler and DOM analyzer, the system discovers businesses in any city or niche globally, immediately identifies high-value prospects with no website or poorly optimized websites, scrapes their live sites for emails, phone numbers, and social media links, and generates actionable Business Audit Reports ready for instant WhatsApp or email outreach.',
    tags: ['Google Places API', 'Node.js', 'Web Scraper & Scorer', 'Lead Automation'],
    link: '#',
    img: '/assets/aistudio/image_7e3b73bb.png',
    featured: true,
    year: '2026',
    deliverable: 'Global B2B Lead Intelligence & Website Scoring Suite',
    gallery: [
      {
        src: '/assets/aistudio/image_7e3b73bb.png',
        label: '01. Global Search Dashboard',
        caption:
          'Search any city, state, or country worldwide by industry category (e.g., Salons, Hotels, Restaurants, Dentists) with configurable result batching (up to 40+ leads per query) and recent search history.'
      },
      {
        src: '/assets/aistudio/image_808a5476.png',
        label: '02. Lead Cards & Contact Scraper',
        caption:
          'Categorizes every business into "No Website" (Prime Lead), "Low Quality", or "Has Website". Automatically crawls linked websites to compute a 0–100 Website Quality Score, extracts emails (e.g., enquiries@...), and provides one-click WhatsApp outreach and CSV export.'
      },
      {
        src: '/assets/aistudio/image_ee1b3996.png',
        label: '03. Deep Business Audit Report',
        caption:
          'Generates a comprehensive Business Audit Report per lead—evaluating Website Status, Quality Score (70/100), HTTPS security, server response time (0.3s Fast), specific SEO/DOM issues ("No meta description", "No H1 heading"), Google Rating, and an overall Opportunity Score (1–10).'
      },
      {
        src: '/assets/aistudio/image_05c358a0.png',
        label: '04. Contacted CRM & Deduplication',
        caption:
          'Built-in Contacted Clients History CRM: leads marked as "Data Entered" store scraped emails, phone numbers, and social media URLs (Facebook, Instagram, etc.) and are automatically excluded from future searches so the sales team never double-contacts a prospect.'
      },
      {
        src: '/assets/aistudio/image_8c37edb5.png',
        label: '05. Node.js Server & Quota CLI',
        caption:
          'Custom Node.js backend server running on localhost:3000 with multi-user team authentication (4 configured seats) and real-time Google Places API daily quota tracking (350 calls/day).'
      },
      {
        src: '/assets/aistudio/image_6daf2afc.png',
        label: '06. Cross-Platform System Package',
        caption:
          'Self-contained production distribution featuring server.js, app.js, persistent local JSON/data storage, and native one-click launchers for both Windows (Start Vixa.bat) and macOS (Start Vixa.app / .command).'
      }
    ],
    howItWorks: [
      {
        step: '01',
        title: 'Global Google Places API Discovery',
        detail:
          'Users enter any location worldwide (e.g., Subang Jaya, Kuala Lumpur, Houston TX, Miami, Dhaka) and select a target business vertical. The Node.js server queries the Google Places API, retrieving verified business profiles, coordinates, star ratings, review counts, phone numbers, and website URLs.'
      },
      {
        step: '02',
        title: 'Automated Website Crawler & 100-Point Scoring Engine',
        detail:
          'For every business returned, the backend automatically inspects its web presence. If no website exists, it flags the business as a red "NO WEBSITE — Prime Lead". If a website exists, the crawler measures HTTP/HTTPS security, response latency (e.g., 0.3s), meta descriptions, H1 headings, and mobile readiness to compute a 0–100 Website Quality Score.'
      },
      {
        step: '03',
        title: 'Deep Email, Phone & Social Media Extraction',
        detail:
          'While scanning the target website HTML, the parser extracts mailto: links, regex-matched business emails (e.g., enquiries@...), phone numbers, and linked social media profiles (Facebook pages, Instagram handles, etc.), surfacing them directly on the lead card with one-click copy and direct WhatsApp deep-links.'
      },
      {
        step: '04',
        title: 'Business Audit Report & Opportunity Scoring',
        detail:
          'Clicking "Audit" on any lead opens a structured Business Audit Report calculating an Opportunity Score (out of 10), listing exact technical deficiencies found on their website, and providing a "Copy Full Report" button so sales reps can paste a tailored technical pitch directly to the prospect.'
      },
      {
        step: '05',
        title: 'Persistent CRM History, Smart Deduplication & CSV Export',
        detail:
          'Reps can filter leads by All Results, No Website, Low Quality, Has Website, Contacted, or Signed, and sort by Priority, Rating, or A–Z. Marking a lead as "Data Entered" saves it into the Contacted Clients History database and suppresses it from future searches. Full datasets can also be exported to CSV in one click.'
      }
    ],
    highlights: [
      'Worldwide B2B search across any city and business category via Google Places API',
      'Automated 0–100 Website Quality Scorer checking HTTPS, response time, H1 tags, and meta descriptions',
      'Built-in web scraper extracting business emails, phone numbers, and linked Facebook/Instagram profiles',
      'One-click WhatsApp outreach integration and copyable Business Audit Reports',
      'Contacted Clients History CRM that automatically deduplicates and hides previously entered leads',
      'Multi-user Node.js server with 350/day API quota telemetry and one-click Windows (.bat) & Mac (.app) launchers'
    ]
  },
  {
    id: 'clientops-desk',
    index: '02',
    category: 'ai',
    title: 'ClientOps Desk — Autonomous Margin Guardian',
    desc: 'Local-first agentic web application powered by Tencent WorkBuddy. Transforms a raw inbound client inquiry into 8 verified commercial, legal, and technical deliverables on disk while enforcing a strict ≥20% agency profit margin.',
    longDesc:
      'ClientOps Desk (Track 2: Agentic • Powered by Tencent WorkBuddy) is a full-stack, local-first autonomous operations command center designed for digital agencies. It automates the entire client onboarding, financial quoting, legal scoping, and margin-protection pipeline. When a raw client brief is submitted, the Node.js local bridge and Tencent WorkBuddy agent cross-reference agency rate cards (with 10%–25% risk buffers), strip budget-breaking scope creep into a formal Change Order, compute a safe counter-offer that defends a minimum 20.00% profit margin, and write 8 verified commercial, legal, and technical deliverables directly to the local hard drive—which the frontend reads in real time via the Browser File System Access API with zero cloud uploads.',
    tags: ['Tencent WorkBuddy', 'Agentic AI', 'Node.js Bridge', 'File System Access API'],
    link: '#',
    img: '/assets/aistudio/image_958e6d06.png',
    featured: true,
    year: '2026',
    deliverable: 'Autonomous Agency Operations & Margin Protection Engine',
    gallery: [
      {
        src: '/assets/aistudio/image_958e6d06.png',
        label: '01. Pipeline Overview & 8-Step Flow',
        caption:
          'Tab 1 (Pipeline Overview): Displays the "Launch Autonomous Pipeline" prompt bar, auto-extracted Inbound Client Data (Horizon Estate Ventures · Marcus Lin · RM 120,000 Budget Limit · 45 Days Deadline), and the 8-step Tencent WorkBuddy Execution Flow linked directly to local disk files.'
      },
      {
        src: '/assets/aistudio/image_d3ca39c6.png',
        label: '02. Autonomous Commercial Model & Matrix',
        caption:
          'Tab 2 (Financial Model): Dynamically parses outputs/01_financial_estimate.csv to populate Extracted Budget Ceiling (RM 120,000), Tier A MVP (RM 120,990 / 480 hrs), Tier B Full Scope, Pushback Target (RM 64,000), and the 7-column Service Breakdown Table with 10%–25% risk buffers.'
      },
      {
        src: '/assets/aistudio/image_90c4b63e.png',
        label: '03. Deliverables & Legal SOW Viewer',
        caption:
          'Tab 3 (Deliverables & Contracts): Live disk-verified viewer ("Verified on Disk ✓") rendering all 8 generated artifacts—including 02_scope_of_work.md (Statement of Work & Commercial Agreement), 6-slide Executive Pitch Deck, Negotiation Addendum, Change Order, ICS/JSON payloads, and SHA-256 Audit Log.'
      }
    ],
    howItWorks: [
      {
        step: '01',
        title: 'Tier 1 — Dark Bento Command Center & Two-Way Local Disk I/O',
        detail:
          'Engineered with a high-contrast Dark Bento UI and 4-tier typography. Outbound inquiries are dispatched via POST to localhost:3000/api/submit-inquiry when clicking "Deploy Agent", while inbound deliverables are read directly from the local outputs/ directory using the native Browser File System Access API (window.showDirectoryPicker()) with zero cloud uploads.'
      },
      {
        step: '02',
        title: 'Tier 2 — Node.js & Express Local Bridge Server',
        detail:
          'Runs locally on port 3000 to bypass browser sandbox write restrictions. It receives the raw client inquiry payload from the UI, overwrites inputs/client_inquiry.txt on the hard drive via fs.writeFile, and triggers Tencent WorkBuddy headlessly via child_process.exec.'
      },
      {
        step: '03',
        title: 'Tier 3 — Tencent WorkBuddy Autonomous Brain & Margin Guardian',
        detail:
          'Reads inputs/client_inquiry.txt, cross-references inputs/rate_card.csv (6 service lines with 10% to 25% risk buffers), and executes prompts/master_system_prompt.txt. It models Tier A (MVP) vs Tier B (Full Scope), isolates budget-breaking features into a Change Order, and computes a negotiation counter-offer defending a minimum 20.00% profit margin.'
      },
      {
        step: '04',
        title: 'Dynamic Multi-Format Deliverable Parsing (CSV, MD, ICS, JSON, LOG)',
        detail:
          'The UI dynamically parses all 8 files on disk: regex-splitting 01_financial_estimate.csv into the 7-column Service Breakdown Table, extracting client metadata from 02_scope_of_work.md, splitting 03_client_proposal_slides.md into an interactive 6-slide presentation deck with dynamic industry themes, and rendering 06_client_negotiation_addendum.md and 07_change_order_request_01.md.'
      },
      {
        step: '05',
        title: 'Operational Dispatch (iCalendar & FPX Payment JSON) + Audit Provenance',
        detail:
          'Generates production-ready 04_sprint_calendar_schedule.ics milestone files and 05_fpx_payment_intent.json Malaysian FPX/card payment gateway payloads, backed by 00_execution_audit.log recording margin red flags, scope violations caught, self-corrections, and SHA-256 hashes.'
      }
    ],
    highlights: [
      'Powered by Tencent WorkBuddy (Track 2: Agentic) with 100% dynamic local disk synchronization',
      'Transforms a single raw client prompt into 8 verified commercial, legal, and technical artifacts',
      'Autonomous Commercial Matrix parsing 7-column CSV estimates with 10%–25% risk buffers across Tier A (MVP) & Tier B (Enterprise)',
      'Built-in Scope Creep Interceptor (Change Order generator) and Negotiation Pushback Addendum defending ≥20% profit margins',
      'Interactive 6-slide Executive Pitch Deck player with Dynamic Industry Theme Engine (Healthcare, Real Estate, Retail, Tech)',
      'Generates ready-to-run .ics Sprint Calendars, Malaysian FPX payment JSON payloads, and SHA-256 execution audit logs'
    ]
  },
  {
    id: 'clubez-bot-v2',
    index: '03',
    category: 'ai',
    title: 'ClubEZ Bot v2.0 — Official Discord Suite',
    desc: 'High-performance Discord.js v14 bot engine & web command suite replacing Sapphire and MEE6. Features Gemini AI auto-moderation, hard leveling (120 × Level^1.85), 934×282 Canvas Studio rank cards, TempVoice (15 controls), and an Autonomous AI Server Architect.',
    longDesc:
      'ClubEZ Bot v2.0 is a custom full-stack Discord community operating system and high-performance Discord.js v14 bot engine built with Node.js (v18+), SQLite in WAL mode (better-sqlite3), @napi-rs/canvas GPU/CPU rendering, Gemini 3.8 Flash neural auto-moderation, and PM2 zero-downtime clustering. Designed to completely replace paid legacy bots like Sapphire and MEE6, it combines a dark command dashboard (with Live Simulator, Bot Code viewer, AI Server Architect, and 1-click Standalone .ZIP exporter) with real-time neural toxicity filtering, incremental SQLite moderation case ledgers (#0001, #0002), dynamic voice XP tracking (8 XP/min), TempVoice rooms with 15 interactive controls, and custom 934×282 Canvas rank & welcome cards.',
    tags: ['Discord.js v14', 'Gemini AI Shield', 'SQLite WAL', 'Canvas Studio'],
    link: 'https://vixa.pro',
    img: '/assets/aistudio/image_bf6c0db6.png',
    featured: false,
    year: '2026',
    deliverable: 'Autonomous Discord Suite & Bot Engine (v2.0)',
    gallery: [
      {
        src: '/assets/aistudio/image_bf6c0db6.png',
        label: '01. Command Dashboard & Overview',
        caption:
          'Home Overview for Club EZKEN showing Shield Enabled & Gateway Active telemetry (21 Members, 45 Channels, 35 Roles, 9 Approved Level Tiers, 8 XP/min VC rate, 4 Recorded Mod Cases) alongside Hard Leveling & VC XP, Smart AI Moderation, and Welcome Canvas Studio modules.'
      },
      {
        src: '/assets/aistudio/image_c6977fff.png',
        label: '02. Server Modules & AI Architect',
        caption:
          'Interactive server module grid featuring Self & Reaction Roles, TempVoice System (15 in-chat controls, privacy locks & auto-cleanup), Ticket Tool System (1-click private tickets & transcripts), Autonomous AI Server Architect, and Standalone GitHub-ready Bot Package (.ZIP) exporter.'
      },
      {
        src: '/assets/aistudio/image_bb1957b1.png',
        label: '03. Gemini AI & Heuristic Auto-Mod',
        caption:
          'AI & Auto Moderation control center featuring 5 active neural & heuristic shields (Gemini AI Toxicity & Harassment Shield, Scam/Nitro Phishing filter, Unauthorized Invite regex blocker, Mass Mention Raid Suppression >4 pings, and Explicit/NSFW filter) plus a live Smart AI Warning simulator.'
      }
    ],
    howItWorks: [
      {
        step: '01',
        title: 'Gemini AI Neural & Heuristic Auto-Moderation Shield',
        detail:
          'Scans every message in real time using Gemini 3.8 Flash alongside regex/heuristic filters. Automatically deletes toxic insults, Nitro/Steam phishing links, unauthorized discord.gg invites, mass-mention raids (>4 pings), and NSFW slurs—logging the deleted content to Moderation History and dispatching a contextual Smart AI Warning with DO/DON\'T advice.'
      },
      {
        step: '02',
        title: 'Hard Leveling Matrix (120 × Level^1.85) & Dynamic Voice XP',
        detail:
          'Implements a steep mathematical progression curve across 9 approved role tiers (@ROOKIE through @STAR SUPPORTER) synchronized via /syncpermissions. Tracks both text activity and active voice channel participation (8 XP/min via voiceStateUpdate) with zero external API lag.'
      },
      {
        step: '03',
        title: 'High-Speed Canvas Studio (934×282 Rank Cards & Welcome Banners)',
        detail:
          'Uses @napi-rs/canvas GPU/CPU rendering to generate instant 934×282 PNG Rank Cards (/rank) styled in signature Club EZKEN crimson (#E50914) with avatar, tier badge, VC hours, and XP progress, plus dynamic Welcome Banners featuring a live member counter and departure deduction detector.'
      },
      {
        step: '04',
        title: 'Incremental SQLite WAL Case Ledger & Staff Triage Dispatcher',
        detail:
          'Powered by better-sqlite3 in Write-Ahead Logging (WAL) mode for sub-millisecond local queries. Every punitive action (/warn, /mute, /kick, /ban, /unban, /purge) records an incremental Case ID (#0001, #0002) inspectable via /case view and editable via /case edit, while /report dispatches interactive staff triage cards to #mod-reports with [Timeout 1h], [Ban], and [Dismiss] buttons.'
      },
      {
        step: '05',
        title: 'Autonomous AI Server Architect, TempVoice (15 Controls) & PM2 Export',
        detail:
          'Includes an Autonomous AI Server Architect that builds channels, role hierarchies, and workflows from plain English, a 15-control TempVoice room generator, a 1-click Ticket Tool with text transcripts, a 2-minute YouTube RSS stream poller, and a 1-click Standalone Bot (.ZIP) generator ready for 24/7 PM2 zero-downtime clustering.'
      }
    ],
    highlights: [
      'Replaces paid Sapphire & MEE6 subscriptions with a self-hosted Node.js v18+, Discord.js v14 & SQLite WAL engine',
      'Gemini AI Toxicity & Harassment Shield with live contextual Smart AI Warning simulator and deleted-message audit logs',
      'Steep 9-tier Hard Leveling Matrix (120 × Level^1.85) with 8 XP/min Voice Channel XP tracking and /syncpermissions',
      'Custom 934×282 PNG Canvas Rank Cards & Welcome Studio with dynamic member join counter and departure deduction detector',
      'TempVoice System (15 in-chat room controls), 1-click Ticket System with transcripts, and lag-free Button/SelectMenu Reaction Roles',
      'Autonomous AI Server Architect + 1-click Standalone Bot Package (.ZIP) with PM2 ecosystem.config.cjs clustering'
    ]
  },
  {
    id: 'ni-group-enterprise',
    index: '04',
    category: 'website',
    title: 'N&I Group Enterprise',
    desc: 'Full-stack platform revamp for a major woven factory and trading corp, generating a +40% increase in inbound leads with sub-second page performance.',
    longDesc:
      'Complete digital infrastructure and corporate web platform remaster for N&I Group, a major woven manufacturing and international trading enterprise. Engineered for sub-second page loads, clear B2B product specification discovery, and frictionless international buyer inquiries.',
    tags: ['Node.js', '+40% Inbound ROI', 'Corporate'],
    link: 'https://niremastered.netlify.app',
    img: 'https://cdn.jsdelivr.net/gh/ezken-dev/ez-musics@main/ni%20portfolio%20original.png',
    year: '2025',
    deliverable: 'Enterprise Full-Stack Platform (+40% Leads)',
    highlights: [
      'Delivered a measurable +40% increase in qualified B2B inbound leads',
      'Sub-second page load performance and modern responsive architecture',
      'End-to-end product catalog and corporate capability showcase'
    ]
  },
  {
    id: 'the-hearth',
    index: '05',
    category: 'website',
    title: 'The Hearth',
    desc: 'Immersive multiplayer hangout experience engineered with Luau and DataStore persistence. Features complex narrative triggers and deep interactive mechanics.',
    longDesc:
      'The Hearth is a highly-rated multiplayer social and narrative experience built in Roblox Studio using Luau and persistent DataStore architecture. Engineered under Fonity Studios with custom atmospheric lighting, interactive environmental triggers, and synchronized multiplayer state systems.',
    tags: ['Luau', 'Roblox Studio', 'DataStore'],
    link: 'https://www.roblox.com/games/127072693793890/The-Hearth-Highly-Rated',
    img: 'https://cdn.jsdelivr.net/gh/ezken-dev/ez-musics@main/The%20hearth.png',
    year: '2025',
    deliverable: 'Multiplayer Luau Experience'
  },
  {
    id: 'vixa-expense-tracker',
    index: '06',
    category: 'website',
    title: 'Vixa Expense Tracker',
    desc: 'Intelligent financial tracking dashboard with automated insights and real-time analytics.',
    longDesc:
      'Vixa Expense Tracker is a streamlined FinTech web application built with React that provides real-time expense categorization, cash-flow visualization, and automated budget analytics.',
    tags: ['FinTech', 'Dashboard', 'React'],
    link: 'https://vixa-expense.netlify.app',
    img: 'https://raw.githubusercontent.com/ezken-dev/ez-musics/main/image_2025-10-03_192422572.png',
    year: '2025',
    deliverable: 'Financial Analytics Application'
  },
  {
    id: 'vixa-ai-suite',
    index: '07',
    category: 'ai',
    title: 'Vixa Corp & Vixa AI Suite',
    desc: 'Flagship agency platform & production SaaS suite featuring a Text Humanizer, Study Bot, Essay Engine, and automated 24/7 client concierge Vixa Assistant.',
    longDesc:
      'Vixa Corp & Vixa AI Suite is the flagship digital agency portal and multi-tool generative AI SaaS platform built under Vixa Corp. It unifies high-contrast web engineering with an advanced AI Text Humanizer, an interactive Study Companion Bot, a structured Essay Composer, and the 24/7 Vixa Assistant concierge.',
    tags: ['Gemini API', 'RAG', 'SaaS'],
    link: 'https://vixa.pro',
    img: '/assets/aistudio/image_af78b877.png',
    featured: false,
    year: '2025',
    deliverable: 'Agency Flagship & Production AI SaaS Platform',
    howItWorks: [
      {
        step: '01',
        title: 'Multi-Mode Generative Prompt Pipeline',
        detail:
          'Routes user inputs through specialized system prompt pipelines tailored for natural syntax humanization, academic structuring, or interactive Q&A tutoring.'
      },
      {
        step: '02',
        title: '24/7 Autonomous Client Concierge (Vixa Assistant)',
        detail:
          'Handles inbound agency inquiries around the clock, qualifying client requirements and guiding visitors through Vixa Corp services.'
      }
    ],
    highlights: [
      'Integrated AI Text Humanizer, Study Bot, and Essay Engine in one unified SaaS dashboard',
      'Automated 24/7 Vixa Assistant client concierge',
      'Responsive, low-latency streaming interface'
    ]
  },
  {
    id: 'aura-ai-speech-coach',
    index: '08',
    category: 'ai',
    title: 'Aura AI Speech Coach',
    desc: 'Real-time vocal cadence analyzer utilizing Web Audio and AI pipelines to evaluate and improve public speaking delivery.',
    longDesc:
      'Aura AI Speech Coach is a mobile-first vocal training application that captures live microphone audio via the Web Audio API, analyzes speaking pace, filler words, and tonal confidence using Gemini AI pipelines, and delivers actionable coaching feedback.',
    tags: ['Gemini API', 'Web Audio', 'Mobile First'],
    link: 'https://aura-bd.netlify.app',
    img: 'https://raw.githubusercontent.com/ezken-dev/ez-musics/main/image_2025-10-03_192258728.png',
    year: '2025',
    deliverable: 'Real-Time Vocal Cadence Analyzer'
  },
  {
    id: 'knowproducts-lens',
    index: '09',
    category: 'ai',
    title: 'KnowProducts Scanner',
    desc: 'Mobile camera computer vision scanner powered by Gemini Vision that identifies physical items and retrieves estimated supplier footprints.',
    longDesc:
      'KnowProducts Lens pairs mobile camera capture with Gemini Vision and MediaPipe to recognize physical retail products in real time and surface supply-chain origin data, estimated supplier footprints, and product specifications.',
    tags: ['Gemini Vision', 'MediaPipe', 'E-Com'],
    link: 'https://knowproducts.netlify.app',
    img: 'https://raw.githubusercontent.com/ezken-dev/ez-musics/main/image_2025-10-03_192653912.png',
    year: '2025',
    deliverable: 'AI Vision Supply-Chain Scanner'
  },
  {
    id: 'fonity-studio-portal',
    index: '10',
    category: 'website',
    title: 'Fonity Studio Portal',
    desc: 'Sleek, high-performance studio web portal built for speed and fluid responsiveness.',
    tags: ['Web Dev', 'Studio', 'Tailwind'],
    link: 'https://fonity-dev.netlify.app',
    img: 'https://cdn.jsdelivr.net/gh/ezken-dev/ez-musics@main/image_2025-06-29_182951756.png',
    year: '2025',
    deliverable: 'Studio Web Portal'
  },
  {
    id: 'ezken-os',
    index: '11',
    category: 'website',
    title: 'EzKen OS - Apex Edition',
    desc: 'Lightweight zero-framework browser operating system featuring window multitasking, productivity tools, and a reactive Focus Pet companion.',
    tags: ['Vanilla JS', 'HTML5 Canvas', 'Web OS'],
    link: 'https://ezken-dev.github.io',
    img: 'https://raw.githubusercontent.com/ezken-dev/Arrow-pics/main/image_2026-04-28_003143755.png',
    featured: false,
    year: 'Jan 2025',
    deliverable: 'Zero-Framework Web Operating System'
  },
  {
    id: 'royal-cafe-web-app',
    index: '12',
    category: 'website',
    title: 'Royal Cafe Web App',
    desc: 'Elegant and highly interactive functional web experience designed for the premium hospitality sector.',
    tags: ['UI/UX', 'Frontend'],
    link: 'https://royalcafe-demo.netlify.app',
    img: 'https://cdn.jsdelivr.net/gh/ezken-dev/ez-musics@main/image_2025-06-29_182648099.png',
    year: '2025',
    deliverable: 'Hospitality Digital Flagship'
  },
  {
    id: 'python-security-auth',
    index: '13',
    category: 'video',
    title: 'Python Security Auth',
    desc: 'Secure login/registration system developed entirely with Python.',
    tags: ['Python', 'Security'],
    link: 'https://youtu.be/46LQ54XqBgs',
    img: 'https://i.ytimg.com/vi/46LQ54XqBgs/hqdefault.jpg',
    year: '2024',
    deliverable: 'Security Authentication System'
  },
  {
    id: 'python-gui-notepad',
    index: '14',
    category: 'video',
    title: 'Python GUI Notepad',
    desc: 'Fully functional desktop application engineered using Python and Tkinter for a lightweight footprint.',
    tags: ['Python', 'Software'],
    link: 'https://youtu.be/CdV_qLnVdvk',
    img: 'https://i.ytimg.com/vi/CdV_qLnVdvk/hqdefault.jpg',
    year: '2024',
    deliverable: 'Desktop Productivity Utility'
  },
  {
    id: 'fonity-gameshop',
    index: '15',
    category: 'website',
    title: 'Fonity GameShop',
    desc: 'High-performance e-commerce storefront for the gaming industry.',
    tags: ['E-Commerce', 'UI/UX'],
    link: 'https://fonity-gameshop.netlify.app',
    img: 'https://raw.githubusercontent.com/ezken-dev/ez-musics/main/image_2025-10-03_192153239.png',
    year: '2025',
    deliverable: 'Digital Gaming Storefront'
  },
  {
    id: 'yumzee-interface',
    index: '16',
    category: 'website',
    title: 'YUMZEE Interface',
    desc: 'Modern, responsive food-service demonstration interface highlighting clean UX principles.',
    tags: ['Design', 'Demo'],
    link: 'https://yumzee-demo.netlify.app',
    img: 'https://cdn.jsdelivr.net/gh/ezken-dev/ez-musics@main/image_2025-06-29_182610688.png',
    year: '2025',
    deliverable: 'Interactive Food-Tech UI'
  },
  {
    id: 'blackhole-visualizer',
    index: '17',
    category: 'video',
    title: 'Blackhole Visualizer',
    desc: 'Epic gravitational lensing and particle physics simulation rendered in Blender with custom sound design and SFX.',
    tags: ['VFX', 'Sound Design', '3D Render'],
    link: 'https://youtu.be/Xy3KBysZO9M',
    img: 'https://i.ytimg.com/vi/Xy3KBysZO9M/hqdefault.jpg',
    year: '2024',
    deliverable: 'Blender Cycles Physics & Audio Simulation'
  },
  {
    id: 'earth-cinematic',
    index: '18',
    category: 'video',
    title: 'Earth Cinematic',
    desc: 'Photorealistic planetary render utilizing the Cycles engine for hyper-accurate atmospheric scattering.',
    tags: ['CGI', 'Blender'],
    link: 'https://youtu.be/SjQ-EHnew0E',
    img: 'https://i.ytimg.com/vi/SjQ-EHnew0E/hqdefault.jpg',
    year: '2024',
    deliverable: 'Atmospheric CGI Render'
  },
  {
    id: 'animated-music-teaser',
    index: '19',
    category: 'video',
    title: 'Animated Music Teaser',
    desc: 'Captivating narrative-driven motion graphics teaser and sound design for a digital music release.',
    tags: ['Motion Design', 'Audio Editing'],
    link: 'https://youtu.be/0tDPD6n9iyk',
    img: 'https://i.ytimg.com/vi/0tDPD6n9iyk/hqdefault.jpg',
    year: '2024',
    deliverable: 'Motion Graphics & Sound Direction'
  },
  {
    id: 'roblox-avatar-cgi',
    index: '20',
    category: 'graphics',
    title: 'Roblox Avatar CGI',
    desc: 'Dramatic 3D character posing and cinematic lighting setup produced for a high-profile client.',
    tags: ['3D Art', 'Commission'],
    link: '#',
    img: 'https://cdn.jsdelivr.net/gh/ezken-dev/ez-musics@main/Final%20Rendered%20Ken%20red%20and%20blue.png',
    year: '2024',
    deliverable: 'Bespoke 3D Character Lighting Study'
  },
  {
    id: 'ocean-sunset-render',
    index: '21',
    category: 'graphics',
    title: 'Ocean Sunset Render',
    desc: 'Serene volumetric environmental render focused on fluid dynamics and accurate water caustics.',
    tags: ['Environment', 'Cycles'],
    link: '#',
    img: 'https://cdn.jsdelivr.net/gh/ezken-dev/ez-musics@main/Ocean%20sunset%20blender%20cycles.png',
    year: '2024',
    deliverable: 'Volumetric Fluid Environment CGI'
  },
  {
    id: 'dragon-commission',
    index: '22',
    category: 'graphics',
    title: 'Dragon Commission',
    desc: 'High-fidelity fantasy composition featuring custom character rigs and advanced textural mapping.',
    tags: ['Fantasy', 'Blender'],
    link: '#',
    img: 'https://cdn.jsdelivr.net/gh/ezken-dev/ez-musics@main/Dragon%20final.png',
    year: '2024',
    deliverable: 'Custom Rigged Creature Render'
  },
  {
    id: '3d-donut-render',
    index: '23',
    category: 'graphics',
    title: '3D Donut Render',
    desc: 'Photorealistic modeling, texturing, and particle systems created in Blender.',
    tags: ['Blender', 'CGI'],
    link: '#',
    img: 'https://cdn.jsdelivr.net/gh/ezken-dev/ez-musics@main/Blender%20donut%20third%20render.png',
    year: '2024',
    deliverable: 'Subsurface Scattering & Particle Study'
  }
];

export const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    id: 'vixa-corp',
    date: 'JULY 2025 – PRESENT',
    role: 'Founder & Lead Architect',
    company: 'VIXA CORP (vixa.pro)',
    companyUrl: 'https://vixa.pro',
    defaultOpen: true,
    bullets: [
      'Founded digital engineering agency delivering custom SaaS platforms, AI integrations, and full-stack software.',
      'Architected ClientOps Desk (Powered by Tencent WorkBuddy) — an autonomous agency operations & margin guardian generating 8 verified commercial, legal, and technical deliverables from raw client briefs.',
      'Engineered Vixa Lead Finder & Client Tracker using Google Places API to discover global leads, audit & score websites, and extract verified emails, phone numbers, and social links.',
      'Led full-stack platform revamp for N&I Group, generating a +40% increase in inbound leads with sub-second page performance.'
    ]
  },
  {
    id: 'taylors-gamedev',
    date: 'AUGUST 2026 – PRESENT',
    role: 'Technical Media Producer & Sound Designer',
    company: "TAYLOR'S GAMEDEV SOCIETY (@gamedev.taylors)",
    companyUrl: 'https://www.instagram.com/gamedev.taylors/',
    defaultOpen: false,
    bullets: [
      'Directs end-to-end promotional cinematography, video editing, and custom sound design for major game dev showcases, tournaments, and campus launch events.'
    ]
  },
  {
    id: 'liora-label',
    date: 'JULY 2025 – MAY 2026',
    role: 'E-Commerce Engineer',
    company: 'LIORA Label',
    defaultOpen: false,
    bullets: [
      'Architected high-conversion storefront & automated supply-chain data sync.',
      'Sourced global suppliers and streamlined end-to-end e-commerce fulfillment operations.'
    ]
  },
  {
    id: 'fonity-studios',
    date: 'JUNE 2024 – PRESENT',
    role: 'Co-Founder & Lead Engine Dev',
    company: 'FONITY STUDIOS',
    companyUrl: 'https://fonity-dev.netlify.app',
    defaultOpen: false,
    bullets: [
      'Co-founded Fonity Studios in June 2024, engineering Luau multiplayer mechanics & DataStore persistence on the Roblox platform.',
      'Built the Fonity Studio Portal and Fonity GameShop digital asset storefront.'
    ]
  }
];

export const MILESTONES_DATA: MilestoneItem[] = [
  {
    number: '01',
    title: 'Vixa Lead Finder & Client Tracker',
    subtitle: 'Google Places API · Website Scorer · Lead Scraper',
    url: 'https://vixa.pro'
  },
  {
    number: '02',
    title: 'ClientOps Desk — Margin Guardian',
    subtitle: 'Tencent WorkBuddy · Agentic Ops · 8 Deliverables',
    url: 'https://vixa.pro'
  },
  {
    number: '03',
    title: 'N&I Group Enterprise (+40% Leads)',
    subtitle: 'Sub-Second Full-Stack Platform · 2025',
    url: 'https://niremastered.netlify.app'
  },
  {
    number: '04',
    title: 'Aura AI & KnowProducts Scanner',
    subtitle: 'Gemini Vision · Web Audio · MediaPipe',
    url: 'https://aura-bd.netlify.app'
  }
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: '01',
    title: 'DISCOVER & ARCHITECT',
    description:
      'Mapping system architecture, generative AI pipelines, and measurable business KPIs before writing a single line of code.'
  },
  {
    number: '02',
    title: 'REAL-TIME INFRASTRUCTURE',
    description:
      'Engineering low-latency Node.js, Express, local agentic bridges, and WebSocket backends with autonomous agent capabilities.'
  },
  {
    number: '03',
    title: 'HIGH-CONTRAST UI & 3D WEB',
    description:
      'Crafting responsive interfaces with React, Next.js, TypeScript, Tailwind CSS, Three.js (WebGL), and HTML5 Canvas.'
  },
  {
    number: '04',
    title: 'AI & VISION INTEGRATION',
    description:
      'Embedding Gemini API, Tencent WorkBuddy, Google Places API, and MediaPipe Vision into production workflows.'
  },
  {
    number: '05',
    title: 'SHIP & SCALE ROI',
    description:
      'Deploying on Cloudflare, Netlify, and Firebase with sub-second performance that drives +40% client inbound growth.'
  }
];
