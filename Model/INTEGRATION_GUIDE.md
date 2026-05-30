# Reserva Verde Goa — Estate Models Section · Integration Guide

This package contains a complete, ready-to-drop website section for the
**"Ground-Level Modular Eco Estate Models"** part of the Reserva Verde Goa
site by Bluechip Global Agro.

> **Important context:** No website project or pre-made files were uploaded to
> this session, and your live codebase was not accessible here. So instead of
> editing your repo directly, this package was **built from scratch from your
> specification** as real, drop-in files. You (or Antigravity, pointed at these
> real files instead of `computer://` links) perform the actual repo
> integration and `npm run build`.

---

## 1. What's in this package

```
reserva-verde-goa-package/
├── INTEGRATION_GUIDE.md                     ← you are here
├── website_section.html                     ← standalone preview + plain-HTML version
├── components/
│   ├── EstateModelsSection.tsx              ← use this if project uses TypeScript
│   └── EstateModelsSection.jsx              ← use this if project is plain JS
└── public/
    ├── images/estates/
    │   ├── site-plan-2bhk.svg
    │   ├── site-plan-3bhk.svg
    │   ├── site-plan-4bhk.svg
    │   └── site-plan-customisable.svg
    └── downloads/
        ├── Reserva_Verde_Goa_Concept.docx   ← "Download Specs" / "Download Estate Options"
        └── Reserva_Verde_Goa_Schedules.xlsx ← "Download Schedule"
```

To preview the design immediately without any setup, open
`website_section.html` in a browser (keep the `public/` folder next to it so
the SVGs and downloads resolve).

---

## 2. Where to place each file in your project

| Package file | Destination in your project |
|---|---|
| `components/EstateModelsSection.tsx` *(or `.jsx`)* | `components/EstateModelsSection.tsx` |
| `public/images/estates/site-plan-2bhk.svg` | `public/images/estates/site-plan-2bhk.svg` |
| `public/images/estates/site-plan-3bhk.svg` | `public/images/estates/site-plan-3bhk.svg` |
| `public/images/estates/site-plan-4bhk.svg` | `public/images/estates/site-plan-4bhk.svg` |
| `public/images/estates/site-plan-customisable.svg` | `public/images/estates/site-plan-customisable.svg` |
| `public/downloads/Reserva_Verde_Goa_Concept.docx` | `public/downloads/Reserva_Verde_Goa_Concept.docx` |
| `public/downloads/Reserva_Verde_Goa_Schedules.xlsx` | `public/downloads/Reserva_Verde_Goa_Schedules.xlsx` |

Use the **`.tsx`** file if your project uses TypeScript; otherwise use the
**`.jsx`** file (delete the one you don't use). Their output is identical.

---

## 3. Wiring it into the homepage

1. Open your homepage / landing file. It is typically one of:
   `app/page.tsx`, `app/page.jsx`, `src/app/page.tsx`,
   `pages/index.tsx`, `pages/index.jsx`, or `src/pages/index.tsx`.

2. Find the existing section that renders **"Upcoming Locations in India"**
   (the pod / carousel block with *Pan-India Highway Corridor, Northern
   Mountain Retreat, Coastal Oasis Park, Urban Edge Compound, Desert Valley
   Station*). Remove **only** that section's markup/component.

3. Add the import at the top of the file:

   ```tsx
   import EstateModelsSection from "@/components/EstateModelsSection";
   // If you don't use the "@/" alias, use a relative path, e.g.:
   // import EstateModelsSection from "../components/EstateModelsSection";
   ```

4. Render it where the old section used to be (keep the hero, navbar, footer,
   contact forms, CRM, auth, portal, routing and backend untouched):

   ```tsx
   <EstateModelsSection contactHref="/contact" />
   ```

   `contactHref` is optional and defaults to `/contact`. Point it at your real
   lead-form / contact route so **Request Masterplan** and **Speak to Advisor**
   land on the right page.

That's the entire integration — one import, one tag, one section removed.

---

## 4. Component behaviour & props

| Prop | Type | Default | Purpose |
|---|---|---|---|
| `contactHref` | `string` | `"/contact"` | Destination for Request Masterplan / Speak to Advisor |

- **View Details** — opens a built-in modal (no external UI library needed).
- **Download Specs** / **Download Estate Options** — link to
  `/downloads/Reserva_Verde_Goa_Concept.docx`.
- **Download Schedule** — links to
  `/downloads/Reserva_Verde_Goa_Schedules.xlsx`.
- Site-plan SVGs are rendered with a plain `<img>` tag, which is safe in both
  Next.js and plain React and avoids `next/image` SVG loader issues. If you
  prefer `next/image`, you may swap it in, but `<img>` is intentionally chosen
  for reliability with SVGs.
- Fully responsive: on mobile the site-plan image stacks above the text
  (`md:flex-row`), text is clamped so it never overflows the cards, and the
  button row stays aligned.

---

## 5. The `estateModels` data array

It lives **inside the component file**
(`components/EstateModelsSection.tsx` / `.jsx`) and is also `export`ed, so you
can import it elsewhere if needed:

```tsx
import { estateModels } from "@/components/EstateModelsSection";
```

Each object contains exactly the required fields: `id`, `title`,
`bedroomType`, `builtUpArea`, `estateSize`, `assetType`, `homeType`,
`placementOptions`, `plantationOptions`, `description`, `ecoFeatures`,
`specifications`, `investmentHighlights`, `image`, `ctaLabel`,
`secondaryCtaLabel`, `downloadUrl`. The `.tsx` file also exports an
`EstateModel` TypeScript interface.

All four models are encoded exactly per spec: 2BHK (2500 sq.ft), 3BHK (3500
sq.ft), 4BHK (4500 sq.ft), and Fully Customisable — every one a **ground-level
modular container eco-home on a 1-acre eco plantation estate**. No stacked
containers, no pods, no urban lodging, no conventional villas.

---

## 6. Build & verification checklist

```bash
npm install        # only if your project needs it
npm run build
```

Then confirm:

- [ ] TypeScript / import / image-path / lint errors resolved (the component
      is self-contained and was compile-checked, so issues are usually just
      the import path or `@/` alias).
- [ ] All four site-plan SVGs load at `/images/estates/...`.
- [ ] Download links serve the `.docx` and `.xlsx` from `/downloads/...`.
- [ ] The old "Upcoming Locations in India" section is fully gone.
- [ ] Section looks correct on desktop, tablet and mobile.

---

## 7. Notes & assumptions

- The component uses **Tailwind CSS** (assumed already configured, per spec)
  and the **`"use client"`** directive (safe in the Next.js App Router; ignored
  by the Pages Router / plain React).
- Fonts: the standalone HTML loads Cormorant Garamond + Jost from Google
  Fonts. The React component uses Tailwind font classes and will inherit your
  site's font stack; add those families to your Tailwind/theme if you want the
  exact preview look.
- No backend, CRM, portal, auth, Supabase, middleware, API route, routing
  logic, hero, navbar or footer is touched by this package — it is a single
  presentational section plus static assets.
- The Excel workbook's formulas were recalculated and validated (0 errors).
  "Customisable" built-up area is shown at an indicative 3,500 sq.ft purely so
  ratios compute; it is labelled as indicative in the sheet.
