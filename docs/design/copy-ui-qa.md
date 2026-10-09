# Copy and small UI verification — 9 October 2026

The homepage now names the club formats and labels its signup action `Join the club`. Root Markdown supplies more concrete About and Contact prose, concise activity summaries and a second paragraph explaining each format. Explore and Journal metadata descriptions are descriptive rather than generic labels. Home and the playground use the same source copy.

The shared Welcome section keeps `Meet the club` visible below the copy at 1100px and narrower. Selected filters add bold underlined text; filter borders and footer underlines respond to hover and keyboard focus. Existing palette, artwork, Morphicons, routes, signup/community links, recruitment facts and calendar records are preserved.

## Verification

- `npm --prefix web run build` passed, including the design guard, TypeScript checks, 24 static pages and 20 legacy redirect stubs.
- `git diff --check` passed. Source line endings were preserved. Calendar, signup, Discord, team and image sources have no diff.
- Activity summary lengths: Demo 84, Workshop 95, Hackathon 91 characters (limit 100).
- Fresh Home, Explore, About, Contact and all three activity pages inspected at 1440px and 375px in Warm Paper and Charcoal. Welcome also inspected at 903px; Community and the matching playground inspected at 375px. No text clipping or document overflow. All revised reading pages contain one h1 and load their images.
- Mobile About link has a 44px target, a visible focus outline and navigates to `/about/` with Enter. Mobile menu opens, closes with Escape and restores toggle focus. Theme selection persists across page navigation/reloads. Workshop and Hackathon filters work; Enter on All activities restores all three cards.
- Footer About keyboard focus and Contact hover both show underlines. Reduced motion disables activity CSS transitions (computed duration 0s).
- Calendar smoke check: selecting the cancelled February Mini Demo Session shows `Cancelled`; next month shows March 2026 with matching AI Hackathon details. Mobile document width remains 375px.
- Browser console and error buffer were empty during the review.
- Eight targeted axe WCAG 2A/AA scans (Home Paper, Explore both themes, About/Contact/three activity pages Charcoal) reported zero violations. Explore Charcoal had one incomplete contrast result for its decorative artwork label due to overlap; computed foreground `#5F5E57` on opaque `#E8E6DC` gives 5.20:1, reviewed manually. This is a targeted review, not a full accessibility certification.

## Screenshots

- [Home desktop, Warm Paper](copy-ui-2026-10-09/home-desktop-paper.jpg) and [Charcoal](copy-ui-2026-10-09/home-desktop-charcoal.jpg)
- [Home mobile, Warm Paper](copy-ui-2026-10-09/home-mobile-paper.jpg) and [Charcoal](copy-ui-2026-10-09/home-mobile-charcoal.jpg)
- [Explore desktop](copy-ui-2026-10-09/explore-desktop-paper.jpg), [mobile](copy-ui-2026-10-09/explore-mobile-paper.jpg), and selected Workshop in [desktop Charcoal](copy-ui-2026-10-09/explore-desktop-charcoal.jpg) / [mobile Charcoal](copy-ui-2026-10-09/explore-mobile-charcoal.jpg)
- Welcome at [375px](copy-ui-2026-10-09/welcome-mobile-paper.jpg) and [903px](copy-ui-2026-10-09/welcome-tablet-paper.jpg)
- Reading-page content comparison at 375px: [Warm Paper](copy-ui-2026-10-09/reading-mobile-paper.jpg) / [Charcoal](copy-ui-2026-10-09/reading-mobile-charcoal.jpg). These sheets crop the original screenshots for comparison; original full captures remain in ignored `tmp/`.

## Review boundary

Local preview: http://localhost:4102/ (kept running). Owner preview approval is required before merge under AGENTS.md. CI and publication status belong in the PR; this record does not claim a merge or deployment.

The preview runs on local Node 24.19.0; the PR workflow uses Node 20 and will independently verify the supported clean Linux build. Automatic browser screenshots taken immediately after navigation omitted some painted artwork, so those were recaptured after network idle. Element crops were replaced with crops from complete full-page captures.
