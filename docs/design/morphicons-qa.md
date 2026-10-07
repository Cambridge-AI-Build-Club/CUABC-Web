# Morphicons verification

Verified locally on 7 October 2026 on `codex/design-rules-morphicons`. Preview: http://localhost:4102/.

## Implementation

`DESIGN.md` was recorded before implementation. `AGENTS.md` directs future agents to update the contract first, and `npm run check:design` runs before builds. PR builds require the contract in the same diff as design changes. The guard accepted this change and rejected a prior UI diff without `DESIGN.md`; no remote PR build has run for this local iteration.

All production and playground UI pictograms use the shared `web/components/Icon.tsx`, with Morphicons 1.7.1 and its documented Lucide data input. Existing club and official partner logos, hero artwork and decorative activity illustrations remain assets rather than UI controls.

## Checks passed

- `npm run build`: TypeScript and static export passed; 24 pages and 20 legacy redirect stubs generated.
- Source policy: no prohibited Unicode UI icons, custom inline SVG controls or competing icon component imports.
- Initial HTML: 182 Morphicons SVGs across 19 audited routes; decorative SVGs have `aria-hidden` and are not focusable.
- Content integrity: 48 internal references and 20 redirects checked; all 14 calendar records match the baseline; published team membership preserved.
- Animation: hovering an entire action link produced 24 distinct SVG path shapes; keyboard focus also morphs its arrow. Menu/close, sun/moon and calendar controls work.
- Reduced motion: arrows swap instantly with one path change; the hero CSS animation stops.
- Responsive review: desktop 1440px and mobile 375px, both surfaces and playground controls; no document overflow or browser errors. Escape closes the mobile menu and restores focus.
- Accessibility: desktop Home in Charcoal and desktop Calendar returned zero axe violations or incomplete checks. Mobile Calendar returned zero violations, with 21 offscreen/clipped contrast checks needing manual review. The existing muted text contrast is 6.18:1 and selected-date text contrast is 5.90:1; calendar scrolling and readable titles were reviewed manually.
- `git diff --check` passed with the repository's CRLF convention.

Browser checks used Chromium desktop/mobile emulation. A physical iOS Safari device was not tested. SVG output removes dependence on the platform's arrow emoji font. These targeted checks are not a full accessibility certification.

## Icon integration screenshots

![Charcoal homepage and SVG controls](morphicons-home-charcoal.jpg)

![Mobile navigation and SVG controls](morphicons-menu-mobile.jpg)

## Final copy review

The owner then requested removal of the homepage caption's second line and the calendar counts/badge, plus `good community.` in the Community heading. Production and playground copy were updated after recording the request in `DESIGN.md`.

The final static build passed. Fresh Home, Calendar and Community screenshots were reviewed at 1440px, the annotated 903px width and mobile 375px. Rendered copy and removed elements match the request; no document overflow or browser errors. Calendar data and interactions remain unchanged.

![Final homepage caption](morphicons-final-home.jpg)

![Final calendar without summary row](morphicons-final-calendar.jpg)

![Final community heading](morphicons-final-community.jpg)

The owner approved PR creation and merging on 7 October 2026 after local review. Remote checks and deployment must pass before reporting publication.
