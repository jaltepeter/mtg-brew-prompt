# Polish plan — MTG Brew Prompt Generator

Tackle all polish items **except** the React error boundary. Order is grouped by area; implement in phases or in this sequence.

---

## 1. Meta & sharing

**Goal:** Better link previews and SEO.

- [ ] Add `<meta name="description">` in `index.html` (e.g. "Roll random Commander deck constraints—color, theme, budget, bracket. Get a build brief and Scryfall links.")
- [ ] Add Open Graph tags: `og:title`, `og:description`, `og:type` (website). Optional: `og:image` (e.g. reuse favicon or a 1200×630 placeholder) if you want rich previews.

**Files:** `index.html`

---

## 2. PWA lite

**Goal:** "Add to home screen" looks correct and branded.

- [ ] Add `public/manifest.json`: `name`, `short_name`, `theme_color` (e.g. `#1f1a14`), `background_color`, `icons` (reference `favicon.svg` and optionally a 192/512 PNG if we add one).
- [ ] In `index.html`: `<link rel="manifest" href="/manifest.json">` and `<meta name="theme-color" content="...">`.

**Files:** `public/manifest.json`, `index.html`

---

## 3. Copy to clipboard

**Goal:** One-click copy of the current build brief (and optionally Scryfall URLs).

- [ ] When a prompt exists, show a "Copy build brief" button (or link) below the result card.
- [ ] On click: build a string (heading + newline + bullet list; optionally append Scryfall URLs). Copy to clipboard via `navigator.clipboard.writeText`. Show brief feedback (e.g. "Copied!" for 2s or toast).
- [ ] Hide or disable when `prompt == null`.

**Files:** `App.tsx`, `App.css`

---

## 4. Focus & reduced motion

**Goal:** Clear focus rings and respect user motion preferences.

- [ ] Ensure "Roll the dice" and the footer SHA button have a visible `:focus-visible` style (already partially there; verify and align with design 7 gold).
- [ ] Add `@media (prefers-reduced-motion: reduce)` in `App.css`: disable or shorten any transition/animation we add (e.g. result emphasis, button feedback). Use `transition: none` or `animation: none` where appropriate.

**Files:** `App.css`

---

## 5. Button feedback

**Goal:** Subtle but clear hover/active feel.

- [ ] Refine `.generate-btn:hover` and `.generate-btn:active` (e.g. light scale or shadow change). Keep it subtle; ensure it’s disabled when `prefers-reduced-motion: reduce`.

**Files:** `App.css`

---

## 6. Result emphasis (transition / highlight)

**Goal:** When a new prompt is generated, the result feels like a clear update.

- [ ] Option A: Short CSS transition when the prompt card content changes (e.g. opacity fade-in, or a soft gold border/glow that fades out after ~1s).
- [ ] Option B: Add a `key` or state so the result block re-mounts and we apply a one-time animation (e.g. `animation: highlight 0.6s ease-out`).
- [ ] Wrap in `prefers-reduced-motion: reduce` so animations are skipped or minimal.

**Files:** `App.tsx` (optional key/state), `App.css`

---

## 7. Landmarks & accessibility labels

**Goal:** Solid structure and screen-reader clarity.

- [ ] Confirm `<main>` has no duplicate; add `role="region"` and `aria-label="Build brief"` (or similar) on the prompt card container if it helps.
- [ ] Ensure "Roll the dice" button has an accessible name (it does; confirm no override).
- [ ] Scryfall links: ensure text is descriptive (already "Browse commanders…" / "Browse theme cards…"). Add `title` if we want a tooltip on hover.
- [ ] Footer: add `aria-label="App version and build"` or similar on the footer if useful.

**Files:** `App.tsx`, optionally `App.css`

---

## 8. Empty state & footer tooltips

**Goal:** Placeholder and version/SHA are clear and on-brand.

- [ ] Empty state: Revisit placeholder copy ("Hit the button above…") and tweak if needed for tone/clarity.
- [ ] Footer: Add `title` on the version · SHA block (e.g. "Version · Git commit") or on the SHA button (e.g. "Toggle terminal mode" is already there; add "Version · Git commit" for the whole footer span if needed).

**Files:** `App.tsx`

---

## 9. Theme toggle (optional / future)

**Goal:** If we add a light/dark or theme toggle later, ensure it’s keyboard-usable and focus styles work in both themes.

- [ ] Not in current scope; when/if we add a toggle, wire it to CSS variables and verify `:focus-visible` in both themes. No implementation in this polish pass.

---

## Summary checklist (no error boundary)

| # | Item |
|---|------|
| 1 | Meta description + Open Graph |
| 2 | PWA manifest + theme-color |
| 3 | Copy build brief button + feedback |
| 4 | Focus-visible + prefers-reduced-motion |
| 5 | Button hover/active polish |
| 6 | Result emphasis (transition/highlight) |
| 7 | Landmarks & a11y labels |
| 8 | Empty state copy + footer title |
| 9 | Theme toggle — skip for now |

Implement in this order for minimal rework (e.g. meta/manifest first; then interactions and motion; then a11y and copy tweaks).
