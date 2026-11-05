# Minimalist Mobile Hero Declutter Plan (`< 640px`)

## 1. Declutter Left Column on Phone (`/src/components/HeroSection.tsx`)
- On mobile phones (`< 640px`), hide the long 8-line bio paragraph, secondary *Download CV* button (already accessible in the top navbar), and location sub-line (`hidden sm:block` / `hidden sm:inline-flex`).
- Keep only the high-impact essentials on the bottom-left:
  - Handwritten *"Hello, I'm"*
  - Bold *"RIFAT."*
  - Compact subtitle *"FULL-STACK & AI ARCHITECT"*
  - Primary crimson *"See my work ↓"* button

## 2. Clean Up Right-Side Metrics & Fix `95/100` Text Collision on Phone (`/src/components/HeroSection.tsx`)
- On phones (`< 640px`), hide the *"Every pixel. A purpose."* badge (`hidden sm:flex`) and secondary sub-lines to eliminate vertical clutter.
- Format the 3 right-side metrics as compact, non-overlapping stacked items (`+40%` · `INBOUND ROI`, `95/100` · `LVL 6 AI CERT`, `20+` · `DEPLOYMENTS`) so `95/100` never collides with adjacent text.

## 3. Anchor Portrait Directly Over `PORTFOLIO` & Streamline Top/Bottom Bars on Phone (`/src/components/HeroSection.tsx`)
- With the verbose text hidden on `< 640px`, the Hero stage becomes compact (`min-h-[340px]`) and the center portrait (`w-[70vw] max-w-[300px] max-h-[325px]`) rises directly up into the `PORTFOLIO` wordmark—matching the exact PC silhouette without empty black space above the head.
- Simplify the top sub-bar and bottom bar to a single clean row on mobile phones.
