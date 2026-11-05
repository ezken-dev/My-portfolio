# One-Shot Master Prompt for Google AI Studio

Copy everything inside the prompt block below and paste it directly into **Google AI Studio** along with your existing `index.html` file attached. 

*(Tip: In Google AI Studio, use **Gemini 2.5 Pro** or the latest flagship model with **Temperature set to `0.2`–`0.4`** so it follows every structural and animation detail strictly without skipping any of your 20 projects.)*

---

## 📋 COPY EVERYTHING BELOW THIS LINE INTO GOOGLE AI STUDIO

```text
ROLE & OBJECTIVE:
You are an elite Creative Technologist, Awwwards-winning UI/UX Architect, and Senior Frontend Engineer. 
Your task is to perform a complete, ground-up revamp of my personal portfolio (`index.html`, attached) into a single, self-contained, production-ready `index.html` file.

You must fuse:
1. ALL real personal data, bio, career history, social links, portrait image, and all 20 portfolio projects from my attached `index.html` (for Rifat Ashhab, Founder & Lead Developer at Vixa Corp).
2. The exact brutalist-editorial, dark-noir + crimson-red design system, layout geometry, and typography shown in my reference screenshots (`touquirakhtar.com`).
3. High-end creative coding animations powered by GSAP + ScrollTrigger, Lenis Smooth Scroll, VanillaTilt, and custom CSS/JS motion systems.

CRITICAL OUTPUT REQUIREMENT:
- Output ONLY the complete, valid, single-file `index.html` code containing all HTML5, Tailwind CSS configuration, custom CSS (`<style>`), external CDN libraries, and JavaScript (`<script>`).
- ZERO placeholders, ZERO truncated arrays, and ZERO "// insert rest of projects here" comments. All 20 projects and all sections must be 100% written out and functional in one shot.

====================================================================
1. VISUAL DESIGN SYSTEM & TYPOGRAPHY (THE "CRIMSON NOIR" AESTHETIC)
====================================================================

### A. Color Palette & Surface Architecture
Use CSS custom properties (`:root`) so the site defaults to the signature **Crimson Noir Dark Mode** while retaining a toggleable **Editorial Light Mode**:
- **Dark Mode (Default):**
  - `--bg-main`: `#08080a` (Deep obsidian matte black)
  - `--bg-elevated`: `#0e0e12` (Elevated panel dark charcoal)
  - `--bg-card`: `rgba(18, 18, 22, 0.75)`
  - `--text-main`: `#f4f4f6` (Stark editorial white)
  - `--text-muted`: `#8a8a93` (Technical neutral grey)
  - `--border-hairline`: `rgba(255, 255, 255, 0.09)` (Crisp 1px architectural grid lines)
  - `--accent-primary`: `#e11d48` (Vibrant Crimson / Scarlet Red)
  - `--accent-bright`: `#ff2a4b` (Neon Crimson highlight for dots, hovers, and active states)
  - `--accent-deep`: `#7f1d1d` (Deep blood-crimson for gradients and quote card)
  - `--cyan-rim`: `rgba(56, 189, 248, 0.18)` (Subtle secondary dual-tone rim light behind portrait)
- **Light Mode (`body.light-mode`):**
  - `--bg-main`: `#f6f5f2` (Warm editorial newsprint off-white)
  - `--bg-elevated`: `#eae8e3`
  - `--bg-card`: `rgba(255, 255, 255, 0.85)`
  - `--text-main`: `#111113`
  - `--text-muted`: `#52525b`
  - `--border-hairline`: `rgba(0, 0, 0, 0.1)`
  - `--accent-primary`: `#dc2626`
  - `--accent-bright`: `#e11d48`
  - `--accent-deep`: `#991b1b`

### B. Film Grain & Architectural Grid Lines
- Add a fixed, pointer-events-none SVG fractal-noise overlay across the viewport (`opacity: 0.035`, `z-index: 9990`) to replicate the tactile matte film texture from the reference design.
- Add a fixed top-of-viewport 2px crimson scroll-progress bar (`#scroll-progress`) that scales from `0%` to `100%` width as the user scrolls down the page.
- Structure sections using exposed 1px solid hairline borders (`border-color: var(--border-hairline)`) to create an editorial Swiss-grid layout.

### C. Typography Stack (Google Fonts)
Load these exact Google Fonts:
1. **Condensed Monumental Display (`font-display`):** `'Bebas Neue'` or `'Anton'` (for the giant background `PORTFOLIO` text, `RIFAT.`, section headers like `MORE THAN CODE. CRAFTING EXPERIENCES.`, `KEEP BUILDING. KEEP SHIPPING.`, and large stat numbers `20+`, `3+`).
2. **Primary UI & Editorial Sans (`font-sans`):** `'Plus Jakarta Sans'` or `'Inter'` (weights 300, 400, 500, 600, 700).
3. **Technical Metadata Mono (`font-mono`):** `'JetBrains Mono'` or `'Fira Code'` (for section indices like `01 / SELECTED WORK`, `02 / BEHIND THE CRAFT`, timestamps, and tags).
4. **Handwritten Script Accent (`font-script`):** `'Caveat'` or `'Reenie Beanie'` (specifically for the tilted *"Hello, I'm"* above `RIFAT.` in the hero and the handwritten *"Rifat Ashhab"* signature inside the crimson quote card).

====================================================================
2. REQUIRED CDN LIBRARIES
====================================================================
Include these working CDNs in `<head>`:
- Tailwind CSS (`https://cdn.tailwindcss.com`)
- Font Awesome 6.4.0 (`https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css`)
- GSAP 3.12.5 (`https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js`)
- GSAP ScrollTrigger (`https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js`)
- Lenis Smooth Scroll (`https://unpkg.com/@studio-freight/lenis@1.0.34/dist/lenis.min.js`)
- VanillaTilt 1.8.0 (`https://cdnjs.cloudflare.com/ajax/libs/vanilla-tilt/1.8.0/vanilla-tilt.min.js`)

====================================================================
3. SECTION-BY-SECTION LAYOUT & EXACT CONTENT SPECIFICATION
====================================================================

### A. PRELOADER ("EXECUTIVE PROTOCOL" SEQUENCE)
- Keep an upgraded version of the fast cinematic preloader (`00%` to `100%` in condensed display type with crimson progress bar and monospace status messages: `INITIALIZING VIXA PROTOCOL...` -> `LOADING RIFAT ASHHAB ARCHIVE...` -> `SYSTEM ONLINE.`).
- When complete, curtain-slide the loader upward (`transform: translateY(-100%)`) and trigger the GSAP Hero entrance timeline.

### B. TOP ARCHITECTURAL NAVBAR (Fixed Header with 1px Bottom Hairline)
- Full-width header with `backdrop-filter: blur(16px)` and a 1px bottom border (`var(--border-hairline)`).
- **Left:** Condensed bold uppercase wordmark `RIFAT` with a crimson superscript `®` (`RIFAT®`).
- **Center (Desktop):** Navigation links: `Work` (`#projects`), `About` (`#about`), `Journey` (`#experience`), `Contact` (`#contact`). Include a dynamic crimson dot indicator (`•`) next to the currently active section on scroll.
- **Right:**
  1. `Motion on` / `Motion off` interactive button (`II Motion on`) that pauses/resumes ambient animations and tilt effects for accessibility.
  2. Theme toggle button (Sun/Moon icon) with the radial blur-morph transition.
  3. `Download CV` button (`onclick="window.print()"`).
  4. `Let's talk ↗` CTA link (with crimson `↗` arrow) scrolling to `#contact` or opening `https://vixa.pro`.
  5. Mobile hamburger button that opens a full-screen editorial mobile menu.

### C. HERO SECTION (`#hero` — Exact Reconstruction of Reference Screenshot 1)
1. **Top Metadata Sub-Bar (immediately below the navbar):**
   - Left: Two stacked uppercase lines in small monospace/sans:
     - Line 1 (in crimson `#e11d48`, bold): `FOUNDER & LEAD DEVELOPER`
     - Line 2 (in muted grey): `UI · UX & FULL-STACK ARCHITECT`
   - Right: Pulsing crimson status dot (`•`) + `AVAILABLE FOR NEW PROJECTS` in uppercase tracking-widest mono.

2. **Monumental Background Wordmark (`PORTFOLIO`):**
   - Centered horizontally across the entire hero container (`font-display`, uppercase, `font-size: clamp(6.5rem, 21vw, 24rem)`, `line-height: 0.82`, `letter-spacing: -0.02em`, `user-select: none`, `pointer-events: none`).
   - Styled with a vertical crimson-to-obsidian gradient (`background: linear-gradient(180deg, #dc2626 0%, #7f1d1d 55%, rgba(20, 5, 8, 0.15) 100%)`, `-webkit-background-clip: text`, `color: transparent`).
   - Applies subtle mouse-driven parallax (`translate3d`) and scroll parallax.

3. **3-Column Foreground Hero Grid (overlapping the giant `PORTFOLIO` text):**
   - **Left Column (Intro & CTA — `z-index: 20`):**
     - Tilted handwritten script text (`font-script`, `text-3xl md:text-5xl`, `-rotate-6`, white): `"Hello, I'm"`
     - Massive condensed white headline (`font-display`, `text-7xl md:text-9xl`, tracking-tight): `RIFAT` followed by a crimson square period `.`
     - Crimson uppercase subheadline (`text-lg md:text-xl font-bold tracking-wide text-[#e11d48]`): `FOUNDER & LEAD DEVELOPER`
     - Editorial bio paragraph (`text-sm md:text-base text-theme-muted max-w-sm leading-relaxed`):
       *"Designing interfaces. Shipping digital realities. I turn ambitious ideas into high-performance web applications, AI suites, and 3D experiences—from the first wireframe to launch day."*
     - Action buttons row:
       - Solid crimson button (`bg-[#e11d48] hover:bg-[#be123c] text-white px-7 py-3.5 font-medium inline-flex items-center gap-3`): `See my work ↓` (scrolls to `#projects`)
       - Secondary glass button (`px-6 py-3.5 border border-white/15 hover:border-white/40`): `View Agency ↗` (`https://vixa.pro`)
     - Location/Agency tag below button (`font-mono text-xs text-theme-muted flex items-center gap-2 mt-6`): `<i class="fas fa-location-dot text-[#e11d48]"></i> VIXA CORP · GLOBAL REMOTE`

   - **Center Column (Dramatic Rim-Lit Portrait — `z-index: 15`):**
     - Display Rifat's portrait (`https://raw.githubusercontent.com/ezken-dev/Arrow-pics/main/IMG_0882.PNG`) centered in front of the middle letters (`RTFO`) of the giant `PORTFOLIO` backdrop.
     - Frame and light it with a dual-tone atmospheric glow behind the subject (cyan rim glow on the left, crimson neon glow on the right) and a smooth bottom gradient mask (`mask-image: linear-gradient(to bottom, black 75%, transparent 100%)`) so his portrait blends seamlessly into the dark hero floor just like the reference image.
     - Include a subtle 3D hover tilt and floating status pill on hover (`Rifat Ashhab · Lead Developer`).

   - **Right Column (Purpose Badge & Architectural Metrics — `z-index: 20`):**
     - Top badge: A circular crimson-bordered icon containing a continuously rotating 8-point asterisk (`✳`) next to two lines of crisp text: `"Every pixel."` / `"A purpose."`
     - **3 Stacked Metric Rows** separated by 1px horizontal hairlines (`border-b border-[var(--border-hairline)] py-4 flex items-center gap-6`):
       - Row 1: Giant condensed crimson number `20+` | Right label: `SHIPPED PROJECTS` / `WEB, AI BOTS & 3D MEDIA`
       - Row 2: Giant condensed crimson number `3+` | Right label: `VENTURES & STUDIOS LED` / `VIXA · LIORA · FONITY`
       - Row 3: Giant condensed crimson number `100%` | Right label: `END-TO-END EXECUTION` / `UNDER VIXA CORP ↗` (links to `https://vixa.pro`)

4. **Hero Bottom Bar (Full-width 1px top/bottom border bar):**
   - Left: Circular crimson play/pulse icon + `VIEW FEATURED BUILD` (`VIXA.PRO`) linking to `https://vixa.pro`.
   - Center: `SCROLL TO DISCOVER ↓` (scrolls to `#projects`).
   - Right: `SELECTED WORK / 2024–2026` in monospace.

---

### D. SECTION 01: SELECTED WORK (`#projects` / `#portfolio` — Interactive Showcase + All 20 Projects)
Combine the editorial aesthetic with the 5 signature portfolio animations:
1. **Section Header:**
   - Top index label: `01 / DIGITAL PORTFOLIO` in monospace with a crimson slash.
   - Left Headline: Giant condensed title `SELECTED WORKS.` with `WORKS.` in crimson red (`#e11d48`).
   - Right Interactive Category Filter Pills:
     - `All (20)` (`data-filter="all"`)
     - `AI Bots (3)` (`data-filter="ai"`)
     - `Websites & Apps (9)` (`data-filter="website"`)
     - `Media & 3D (8)` (`data-filter="video"` — matches both `video` and `graphics` categories)
2. **Featured Flagship Spotlight Row (Top Bento Highlight):**
   - Highlight the top 2 flagship builds (`Vixa AI Suite` and `EzKen OS - Apex Edition`) or allow all 20 cards to render in an editorial 3-column bento/architectural grid with:
     - **Index Numbering:** Every card displays a monospace index (`01`, `02`, ... `20`) and category badge in the top corner.
     - **Clip-Path Curtain Reveal & Image Zoom:** When cards enter the viewport (or filter), animate `clip-path: inset(100% 0 0 0)` to `inset(0% 0 0 0)` while the image scales from `1.2` to `1.0`.
     - **1px Specular Mouse-Tracking Border & Glare:** Moving the mouse across any card illuminates a radial crimson/white spotlight along its 1px border (`--mouse-x`, `--mouse-y`).
     - **3D Perspective Tilt:** Powered by VanillaTilt on desktop.
     - **Custom Cursor Follower:** Hovering any project card expands the custom cursor into an `EXPLORE ↗` magnetic badge.
3. **ALL 20 PROJECTS DATA (Must be included verbatim in the JS array):**
   ```javascript
   const projects = [
       { category: 'ai', title: 'Vixa AI Suite', desc: 'SaaS platform featuring a text humanizer, study chatbot, and essay composer.', tags: ['AI', 'SaaS'], link: 'https://vixa-ai.netlify.app', img: 'https://github.com/ezken-dev/ez-musics/blob/main/image_2025-07-20_132348527.png?raw=true' },
       { category: 'website', title: 'EzKen OS - Apex Edition', desc: 'A productive web OS built entirely from scratch with zero frameworks.', tags: ['Vanilla JS', 'Web App'], link: 'https://ezken-dev.github.io', img: 'https://raw.githubusercontent.com/ezken-dev/Arrow-pics/main/image_2026-04-28_003143755.png' },
       { category: 'website', title: 'N&I Group Enterprise', desc: 'Full-stack infrastructure revamp for a major woven factory and trading corp.', tags: ['Node.js', 'Corporate'], link: 'https://niremastered.netlify.app', img: 'https://cdn.jsdelivr.net/gh/ezken-dev/ez-musics@main/ni%20portfolio%20original.png' },
       { category: 'website', title: 'The Hearth', desc: 'Immersive multiplayer hangout experience engineered with Luau. Features complex narrative triggers and deep interactive mechanics.', tags: ['Game Dev', 'Luau'], link: 'https://www.roblox.com/games/127072693793890/The-Hearth-Highly-Rated', img: 'https://cdn.jsdelivr.net/gh/ezken-dev/ez-musics@main/The%20hearth.png' },
       { category: 'ai', title: 'Aura AI Speech Coach', desc: 'Mobile-first application utilizing AI to analyze and improve public speaking.', tags: ['AI', 'Mobile First'], link: 'https://aura-bd.netlify.app', img: 'https://raw.githubusercontent.com/ezken-dev/ez-musics/main/image_2025-10-03_192258728.png' },
       { category: 'website', title: 'Vixa Expense Tracker', desc: 'Intelligent financial tracking dashboard with automated insights.', tags: ['FinTech', 'Dashboard'], link: 'https://vixa-expense.netlify.app', img: 'https://raw.githubusercontent.com/ezken-dev/ez-musics/main/image_2025-10-03_192422572.png' },
       { category: 'website', title: 'Fonity Studio Portal', desc: 'Sleek, high-performance agency portfolio built for speed and fluid responsiveness.', tags: ['Web Dev', 'Agency'], link: 'https://fonity-dev.netlify.app', img: 'https://cdn.jsdelivr.net/gh/ezken-dev/ez-musics@main/image_2025-06-29_182951756.png' },
       { category: 'website', title: 'Royal Cafe Web App', desc: 'Elegant and highly interactive functional web experience designed for the premium hospitality sector.', tags: ['UI/UX', 'Frontend'], link: 'https://royalcafe-demo.netlify.app', img: 'https://cdn.jsdelivr.net/gh/ezken-dev/ez-musics@main/image_2025-06-29_182648099.png' },
       { category: 'video', title: 'Python Security Auth', desc: 'Secure login/registration system developed entirely with Python.', tags: ['Python', 'Security'], link: 'https://youtu.be/46LQ54XqBgs', img: 'https://i.ytimg.com/vi/46LQ54XqBgs/hqdefault.jpg' },
       { category: 'video', title: 'Python GUI Notepad', desc: 'Fully functional desktop application engineered using Python and Tkinter for a lightweight footprint.', tags: ['Python', 'Software'], link: 'https://youtu.be/CdV_qLnVdvk', img: 'https://i.ytimg.com/vi/CdV_qLnVdvk/hqdefault.jpg' },
       { category: 'ai', title: 'KnowProducts Lens', desc: 'Computer vision scanner connecting physical products to supplier data.', tags: ['Vision', 'E-Com'], link: 'https://knowproducts.netlify.app', img: 'https://raw.githubusercontent.com/ezken-dev/ez-musics/main/image_2025-10-03_192653912.png' },
       { category: 'website', title: 'Fonity GameShop', desc: 'High-performance e-commerce storefront for the gaming industry.', tags: ['E-Commerce', 'UI/UX'], link: 'https://fonity-gameshop.netlify.app', img: 'https://raw.githubusercontent.com/ezken-dev/ez-musics/main/image_2025-10-03_192153239.png' },
       { category: 'website', title: 'YUMZEE Interface', desc: 'Modern, responsive food-service demonstration interface highlighting clean UX principles.', tags: ['Design', 'Demo'], link: 'https://yumzee-demo.netlify.app', img: 'https://cdn.jsdelivr.net/gh/ezken-dev/ez-musics@main/image_2025-06-29_182610688.png' },
       { category: 'video', title: 'Blackhole Visualizer', desc: 'Epic gravitational lensing and particle physics simulation rendered in Blender with custom SFX.', tags: ['VFX', '3D Render'], link: 'https://youtu.be/Xy3KBysZO9M', img: 'https://i.ytimg.com/vi/Xy3KBysZO9M/hqdefault.jpg' },
       { category: 'video', title: 'Earth Cinematic', desc: 'Photorealistic planetary render utilizing the Cycles engine for hyper-accurate atmospheric scattering.', tags: ['CGI', 'Blender'], link: 'https://youtu.be/SjQ-EHnew0E', img: 'https://i.ytimg.com/vi/SjQ-EHnew0E/hqdefault.jpg' },
       { category: 'video', title: 'Animated Music Teaser', desc: 'Captivating narrative-driven motion graphics teaser for an upcoming digital music release.', tags: ['Motion', 'Editing'], link: 'https://youtu.be/0tDPD6n9iyk', img: 'https://i.ytimg.com/vi/0tDPD6n9iyk/hqdefault.jpg' },
       { category: 'graphics', title: 'Roblox Avatar CGI', desc: 'Dramatic 3D character posing and cinematic lighting setup produced for a high-profile client.', tags: ['3D Art', 'Commission'], link: '#', img: 'https://cdn.jsdelivr.net/gh/ezken-dev/ez-musics@main/Final%20Rendered%20Ken%20red%20and%20blue.png' },
       { category: 'graphics', title: 'Ocean Sunset Render', desc: 'Serene volumetric environmental render focused on fluid dynamics and accurate water caustics.', tags: ['Environment', 'Cycles'], link: '#', img: 'https://cdn.jsdelivr.net/gh/ezken-dev/ez-musics@main/Ocean%20sunset%20blender%20cycles.png' },
       { category: 'graphics', title: 'Dragon Commission', desc: 'High-fidelity fantasy composition featuring custom character rigs and advanced textural mapping.', tags: ['Fantasy', 'Blender'], link: '#', img: 'https://cdn.jsdelivr.net/gh/ezken-dev/ez-musics@main/Dragon%20final.png' },
       { category: 'graphics', title: '3D Donut Render', desc: 'Photorealistic modeling, texturing, and particle systems created in Blender.', tags: ['Blender', 'CGI'], link: '#', img: 'https://cdn.jsdelivr.net/gh/ezken-dev/ez-musics@main/Blender%20donut%20third%20render.png' }
   ];
   ```
   *(For any project where `link === '#'`, clicking the card should open a sleek lightbox modal showing the high-res render, title, and description instead of doing nothing!)*

---

### E. SECTION 02: BEHIND THE CRAFT (`#about` — Exact Reconstruction of Reference Screenshot 2)
1. **Top Editorial Split Header:**
   - Left:
     - Monospace label: `02 / BEHIND THE CRAFT`
     - Giant condensed 2-line headline (`font-display`, `text-5xl md:text-7xl`):
       - Line 1 (White): `MORE THAN CODE.`
       - Line 2 (White + Crimson): `CRAFTING ` `<span class="text-[#e11d48]">EXPERIENCES.</span>`
   - Right:
     - Editorial bio paragraph (`max-w-md text-theme-muted leading-relaxed text-sm md:text-base`):
       *"I'm Rifat Ashhab, Founder & Lead Developer at Vixa Corp. As a full-stack developer and entrepreneur, I bridge the gap between engineering and business—architecting high-performance web applications, AI SaaS platforms, e-commerce ecosystems, and interactive 3D experiences across React, Next.js, TypeScript, Node.js, Python, and Luau."*

2. **3-Column Architectural Grid Below a 1px Horizontal Divider (`border-t border-b border-[var(--border-hairline)] grid lg:grid-cols-12`):**
   - **Column 1 (`lg:col-span-4`, with right 1px border on desktop): `EXPERTISE & SKILLS`**
     - Sub-label in crimson uppercase mono: `LEADERSHIP & ENGINEERING`
     - Item 1 (with bottom 1px hairline):
       - Flex row: **Full-Stack & AI Architect** (left, bold white) | `2025` (right, crimson mono)
       - Subtitle: *Full-stack web, AI SaaS, and 3D interactive application engineering.*
     - Item 2 (with bottom 1px hairline):
       - Flex row: **Self-taught & always shipping** (left, bold white) | `2023 – NOW` (right, crimson mono)
       - Subtitle: *React · Next.js · TypeScript · Tailwind · Three.js · Node.js*
     - Sub-label in crimson uppercase mono: `CREATIVE & TECH TOOLKIT`
     - Rectangular bordered skill pills (`border border-[var(--border-hairline)] hover:border-[#e11d48] px-3 py-1.5 text-xs transition-colors`):
       `React.js & Next.js`, `TypeScript`, `Tailwind CSS`, `Three.js (3D)`, `Node.js & Firebase`, `REST APIs`, `UI/UX Architecture`, `Agile PM & Leadership`, `Python & AI`, `Luau & Blender CGI`
     - Bottom row of clean monochrome tech icons (`fa-react`, `fa-js`, `fa-node-js`, `fa-python`, `fa-figma`, `fa-github`, `fa-cubes`).

   - **Column 2 (`lg:col-span-4`, with right 1px border on desktop): `FROM CONCEPT TO LAUNCH`**
     - Vertical process timeline with a subtle crimson vertical line connecting circular node indicators (`⊙`) and bold crimson step numbers `01` through `05`:
       - `01` — **DISCOVER**: *Understanding business goals, target users, and the core problem the product needs to solve.*
       - `02` — **ARCHITECTURE**: *Mapping system structure, APIs, and user flows before a single pixel is polished.*
       - `03` — **DESIGN**: *Turning wireframes into a bold, high-contrast interface engineered for every screen size.*
       - `04` — **BUILD**: *Developing fast, scalable, and immersive applications with clean, maintainable code.*
       - `05` — **LAUNCH & SCALE**: *Testing, deploying to production, and leading teams to scale what happens after launch.*

   - **Column 3 (`lg:col-span-4`): SIGNATURE CRIMSON EDITORIAL QUOTE CARD**
     - Full-height deep crimson card (`background: linear-gradient(135deg, #650d1b 0%, #3b0710 100%)`) with subtle diagonal architectural stripe overlays.
     - Top: Giant crimson quotation mark `“`.
     - Middle: Crisp editorial quote in white (`text-2xl md:text-3xl font-light leading-snug`):
       *"From concept and system architecture, to pixel-perfect digital realities."*
     - Below quote: Handwritten script signature (`font-script text-3xl text-white/90`): `"Rifat Ashhab"`
     - Bottom: `LET'S BUILD SOMETHING EXCEPTIONAL.` in small uppercase mono + rotating crimson asterisk `✳`.

---

### F. SECTION 03: THE JOURNEY (`#experience` — Exact Reconstruction of Reference Screenshot 3)
1. **Section Header:**
   - Top row: `03 / THE JOURNEY` (left, mono) | `EXPERIENCE & MILESTONES` (right, mono uppercase).
   - Giant condensed headline (`font-display text-5xl md:text-7xl`): `KEEP BUILDING. KEEP SHIPPING` with a crimson period `.`

2. **2-Column Asymmetric Split (`grid lg:grid-cols-12 gap-12 pt-8 border-t border-[var(--border-hairline)]`):**
   - **Left Column (`lg:col-span-8`): Interactive Accordion Career Timeline**
     - Each experience item sits in a full-width row separated by a 1px horizontal hairline (`border-b border-[var(--border-hairline)]`).
     - Row header layout:
       - Left (`w-32 font-mono text-xs text-[#e11d48]`): Date range
       - Center: Role Title (`text-xl md:text-2xl font-bold`) + Company Name below (`text-sm text-theme-muted`)
       - Right: Interactive `+` / `−` toggle icon that smoothly expands/collapses the bulleted achievements (`max-height` & `opacity` transition).
     - **Item 1 (Expanded by default):**
       - Date: `JUL 2025 - NOW`
       - Role: `Founder & CEO`
       - Company: `Vixa Corp (vixa.pro)`
       - Details:
         - Founded and scaled a digital agency providing high-end web development, AI SaaS, and branding solutions.
         - Managed the full product lifecycle for diverse enterprise clients, including the N&I Group infrastructure remaster.
         - Built and led a multidisciplinary team, implementing structured onboarding and agile delivery workflows.
         - Architected modern, responsive web experiences focusing on extreme performance and user engagement.
     - **Item 2 (Collapsible):**
       - Date: `JUL 2025 - NOW`
       - Role: `E-Commerce Engineer`
       - Company: `Liora`
       - Details:
         - Architected and developed the complete e-commerce web platform for the fashion brand.
         - Sourced global suppliers and managed supply chain logistics to streamline operations.
         - Optimized digital presence and backend integrations to accelerate the brand's market launch.
     - **Item 3 (Collapsible):**
       - Date: `JUN 2025 - NOW`
       - Role: `Lead Developer`
       - Company: `Fonity Studios`
       - Details:
         - Engineered interactive multiplayer experiences (including *The Hearth*) using Luau on the Roblox platform.
         - Built the Fonity Studio Portal and Fonity GameShop e-commerce storefront, managing digital asset distribution for a growing player base.
     - **Item 4 (Collapsible):**
       - Date: `2023 - NOW`
       - Role: `Independent Full-Stack & 3D Creator`
       - Company: `@ezken-dev · Open Source & CGI`
       - Details:
         - Engineered custom desktop software in Python, zero-framework web operating systems (EzKen OS), and photorealistic 3D Blender Cycles simulations.

   - **Right Column (`lg:col-span-4`): `A FEW MILESTONES` — `SHIPPED. LIVE. USED.`**
     - Small mono label: `A FEW MILESTONES`
     - Giant stacked condensed headline (`font-display text-5xl md:text-6xl leading-[0.95] mt-2 mb-8`):
       - `SHIPPED.` (white)
       - `LIVE. USED.` (crimson `#e11d48`)
     - Numbered interactive list with 1px horizontal dividers (`border-t border-b border-[var(--border-hairline)]`):
       - `01` (in red mono) | **Vixa Corp Agency** (`Web Agency · 2025`) | `↗` (`https://vixa.pro`)
       - `02` (in red mono) | **Vixa AI Suite** (`AI SaaS · 2025`) | `↗` (`https://vixa-ai.netlify.app`)
       - `03` (in red mono) | **N&I Group Enterprise** (`Corporate Remaster · 2025`) | `↗` (`https://niremastered.netlify.app`)
       - `04` (in red mono) | **EzKen OS - Apex Edition** (`Web OS · 2026`) | `↗` (`https://ezken-dev.github.io`)

---

### G. SECTION 04: CONTACT & EDITORIAL FOOTER (`#contact`)
- Replicate the sleek bottom contact showcase from Reference Screenshot 3:
  - Left column:
    - Monospace label: `04 / INITIATE CONTACT`
    - Giant condensed headline: `LET'S BUILD THE NEXT DIGITAL REALITY.`
    - Interactive contact rows with circular crimson-bordered icons, labels, and `↗` hover arrows:
      - **AGENCY PORTAL:** `vixa.pro` (`https://vixa.pro`)
      - **LINKEDIN:** `linkedin.com/in/rifatashhab` (`https://www.linkedin.com/in/rifatashhab/`)
      - **GITHUB:** `github.com/ezken-dev` (`https://github.com/ezken-dev`)
      - **INSTAGRAM:** `@rifat_0.1` (`https://www.instagram.com/rifat_0.1/`)
  - Right column:
    - An angled 3D perspective browser preview card (`transform: rotate(-3deg) perspective(1000px)`) showcasing `VIXA CORP` / `EzKen OS` with a live interactive hover lift and `LAUNCH LIVE SITE ↗` button.
- Bottom copyright bar with `RIFAT®`, live local time clock (`UTC+6 / GLOBAL`), `Download CV` print trigger, and `Back to top ↑` smooth scroll button.

====================================================================
4. MANDATORY ANIMATIONS & INTERACTIVE ENGINEERING
====================================================================
1. **Lenis Smooth Scroll + GSAP ScrollTrigger Integration:**
   - Synchronize Lenis with `gsap.ticker` or `requestAnimationFrame` so all scroll-triggered animations are 120fps buttery smooth.
2. **Staggered Split-Line / Mask Text Reveals:**
   - Animate section headings (`PORTFOLIO`, `RIFAT.`, `MORE THAN CODE.`, `KEEP BUILDING. KEEP SHIPPING.`) sliding up from `translateY(105%)` inside `overflow-hidden` wrappers as they enter the viewport.
3. **Interactive Custom Cursor:**
   - Smooth lerp-trailing cursor dot that morphs into a crimson ring on links and expands into an `EXPLORE ↗` circle over project cards and the portrait. Automatically disabled on touch devices.
4. **Print Stylesheet (`@media print`):**
   - Preserve a clean, executive CV print layout when the user clicks `Download CV` (`window.print()`).
```