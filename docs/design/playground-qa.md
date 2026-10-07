# Claude design playground verification

Reviewed locally on 6 October 2026, on `codex/design-playground`. This record and the screenshots supersede the initial acid-green concept review.

## Build and source integrity

- `npm run build`: passed with Next.js 15.5.27, TypeScript validation, 24 static pages and 20 legacy redirect stubs.
- Used the installed Node 24.19.0 runtime because the system proxy has no active version; global configuration was unchanged.
- Existing production templates, root collection entries, Sass mirrors and deployment workflows remain untouched.
- Playground metadata requests no indexing; the route is absent from the production sitemap.
- Event descriptions, member visibility, signup and Discord links load from existing root sources.
- Existing club logos, illustration, activity icons and portraits are reused without file changes. No new images were generated in this revision.
- Official palette and authentic Claude SVG provenance are recorded in [brand sources](claude-brand-sources.md).

## Browser checks

- Fresh Home screenshots visually inspected at 1440px desktop and 375px mobile, including the Charcoal alternative. Mobile Explore, Community and review controls also inspected.
- Document scroll width equals viewport width at 1440px and 375px; all checked images load.
- Warm Paper and Charcoal change the surfaces while the official orange accent stays `#D97757`. Images and logos retain their original colors.
- Activity filtering gives 3 cards, 1 Workshop card, then 3 when cleared.
- Mobile menu opens, closes with Escape, restores focus to its toggle and closes after navigation. Review controls close with Escape and restore focus.
- Browser error log is empty.
- axe-core 4.12.1: zero automatic WCAG A/AA violations on the reviewed Home, Explore and Community views and review controls. Closed Home views and the reviewed Explore/Community views had no incomplete findings.
- The open controls panel required manual contrast review for its decorative minus symbol and secondary copy. Screenshot inspection found no obscuring layers; `#141413` on `#E8E6DC` and `#5F5E57` on `#FAF9F5` have contrast ratios above 6:1. This is a targeted prototype check, not a full accessibility audit.
- Prior unchanged interaction checks covered reduced-motion handling, motion pause, history navigation and filter isolation.

## Review boundary

- Journal, activity details, About, Contact, committees and calendar still use the current production design.
- Signup and Discord use the configured external destinations; no form was submitted and no account was joined.
- The January-March 2026 calendar is an archive. Shared event data and future scheduling belong in the later migration plan.
- The user instructed local design iterations without PR preparation. Draft PR #15 was closed and detached. This revision is local, uncommitted and unpushed; no merge or production deploy occurred.
- Preview server remains running at `http://localhost:4102/playground/`. The next checkpoint is the user's design review.

## Screenshots

![Claude desktop concept](playground-desktop.jpg)

![Claude mobile concept](playground-mobile.jpg)
