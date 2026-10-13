# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

"Kumbara": a personal money-management app meant to run locally on the user's machine. The planned stack is React (UI) + Node.js (backend) + SQLite. Today only the React client exists, and it runs on mock data. The user communicates in Turkish, and UI text, docs and code comments are written in Turkish.

- `docs/para-yonetim-sistemi-moduller.md`: the 10 product modules.
- `docs/gereksinimler.md`: the requirements. Functional requirements have FG-xx IDs and non-functional ones have FOG-xx IDs. Code comments cite these IDs, e.g. `(FG-28)`. Some FOG items, such as PEP 8/Alembic and Python 3.11, were written assuming a Python stack and are outdated now that Node was chosen.
- `uı/stitch_global_currency_ui_dashboard/`: the visual reference (`DESIGN.md` "Sovereign Treasury", `code.html`, `screen.png`). The folder name uses a Turkish dotless `ı`, so quote the path in shell commands.

## Commands

All commands run from `client/`:

```bash
npm run dev               # Vite dev server on http://127.0.0.1:5173
npm run build             # tsc -b (type check) + vite build → dist/
npx tsc -p tsconfig.json  # type check only
npm run preview           # serve dist/
```

There is no test runner or linter configured yet.

## Client architecture (`client/src`)

- **State lives in `App.tsx`:** `useState` holds transactions, budgets, goals, the selected month and the current page. Pages receive an `AppData` object (`data/appData.ts`) plus callbacks; there is no global store or context.
- **Routing:** `useState` holds the current page and is mirrored to the URL hash (`#/islemler`, `#/butce`, `#/hedefler`, `#/raporlar`; overview has no hash). There is no router library.
- **Data layer:**
  - `data/types.ts` defines the domain types.
  - `data/mock.ts` holds the seed data: October 2026 transactions plus generated May–September monthly totals for the reports. It is meant to be replaced by an API layer once the Node backend exists.
- **All derived values go through `lib/selectors.ts`:** account balances, net worth, category spend, budget rows and their states, goal progress, notifications and monthly totals. Pages should not recompute these inline.
- **Money is integer kuruş (`Kurus = number`) everywhere (FOG-12):**
  - Format only at render time with `formatTRY` / `formatSigned` from `lib/money.ts`.
  - Parse user input with `parseTRY`. It accepts both `1.234,56` and `1234.56`, rejects ≤0, and rejects more than 2 decimals.
- **Dates:**
  - Dates are `YYYY-MM-DD` strings and months are `YYYY-MM` keys, handled by `lib/dates.ts`.
  - "Today" is the constant `TODAY = '2026-10-13'`, which the mock data is built around.
  - Account balances only count transactions on or after the account's `openingDate`.
- **Budget states:** usage ≥80% is `uyari` (warning, gold) and >100% is `asim` (over, red). Notifications are always computed for the current month, not the selected one.
- **Charts:** hand-written SVG (`DonutChart`, `BarChart`), with no chart library. `BarChart` measures its container with a ResizeObserver instead of scaling the SVG, so its text stays a fixed size.
- **Export:** `lib/csv.ts` writes CSV with `;` separators, decimal commas and a UTF-8 BOM, so the file opens correctly in Turkish-locale Excel.

## Styling

- Plain CSS, no Tailwind:
  - `styles/tokens.css` holds the CSS variables taken from the reference DESIGN.md.
  - `styles/app.css` holds all component styles, using BEM-ish class names (`.metric__value`, `.chip--warning`).
- Fonts (Space Grotesk, Hanken Grotesk, JetBrains Mono) and Material Symbols icons come from npm (`@fontsource/*`, `material-symbols`), so the app works offline. Do not switch them to CDN links.
- Typography roles: Space Grotesk for headings and large figures, Hanken Grotesk for body text, JetBrains Mono for numbers and table headers. Numeric table cells use `td.num`.
- `<html lang="tr">` is required so that `text-transform: uppercase` renders `i` → `İ` correctly.
- Text comparisons use `toLocaleLowerCase('tr')`.
