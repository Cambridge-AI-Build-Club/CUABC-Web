# Cambridge AI Builder Club design rules

Last updated: 9 October 2026. Applies to all production Next.js routes and the design playground.

## Maintain this document first

This is the living UI/UX contract for contributors and coding agents. Agents maintain it as part of design work; it is not an autonomous background process.

Before changing a layout, component, icon, animation, navigation, visual asset or interaction:

1. Read this file, `AGENTS.md`, the user's current request and the affected source files.
2. Update this file **before editing the implementation**. Record the requested change, affected surfaces, intended interaction and acceptance checks in the change record. Amend the relevant rules when the user changes a design decision.
3. Preserve existing approved decisions unless the current request changes them. The user's explicit instructions take precedence; record the new decision rather than silently keeping contradictory rules.
4. Implement against the updated contract. Share components between production and playground instead of creating competing design systems.
5. Build and inspect the result. Update the same change record with actual verification and any limitation. Never mark a check passed or a change published before verifying it.
6. Include `DESIGN.md` with the design changes in any commit/PR. Keep the active rules concise; keep dated decisions and evidence links below. Remove obsolete active rules when replacing them.

For a fix that preserves the rules, add a change record explaining the regression and its checks; a new design direction is unnecessary. Implementation discoveries that change the intended design must be recorded here before applying them. A new agent should be able to continue using this file without chat history.

`AGENTS.md` points every agent to this workflow. `npm run check:design` checks icon usage and requires a `DESIGN.md` update alongside uncommitted UI/style/visual-asset changes before builds. PR CI also compares the committed changes against its base and requires this file in the same change. Agents still follow the update-first order above; the automated check verifies that the maintained contract accompanies the implementation.

## Identity and assets

- The official name is **Cambridge AI Builder Club**, with singular Builder. Claude is the collaboration partner; retain the approved official Claude palette and collaboration strip.
- The header uses the existing club logo image alone, linking home with an accessible club-name label. Do not add a duplicate text title beside it. Use the configured compact logo on mobile.
- The footer copyright is **© 2026 Cambridge AI Builder Club**, read from `_data/seo.yml`. Do not restore the removed bottom location/edition line.
- Reuse the existing club marks, hero illustration and real member portraits. Source partner logos from official publishers and retain their geometry, proportions and colors. Never generate partner logos.
- The three approved activity illustrations are decorative artwork. Brand marks and illustration assets retain their source files, and portraits keep their photographed composition (see the portrait delivery rule below); interactive UI pictograms follow the icon rules below.
- Generate new imagery only for a concrete gap in the existing inventory. Record its purpose, source/prompt, intended size and accessible treatment before generation. Never fabricate team portraits or event photography.
- Member portraits are delivered at display size: square, no larger than 1200px per side, progressive JPEG. Resizing and compressing for the web is allowed, and the owner may direct a framing crop so portraits on the same surface read at a similar scale. Never crop, retouch, recolor or regenerate a portrait on your own initiative. Keep the untouched camera original outside the repository, because `images/` is copied wholesale into `web/public/` and shipped.

## Visual system

| Token | Warm Paper | Charcoal |
| --- | --- | --- |
| Accent | `#D97757` | `#D97757` |
| Canvas | `#FAF9F5` | `#141413` |
| Text | `#141413` | `#FAF9F5` |
| Panel | `#FAF9F5` | `#20201E` |
| Surface | `#E8E6DC` | `#292926` |
| Secondary text | `#5F5E57` | `#C4C2B8` |
| Rule/border | `#D0CEC5` | `#45453F` |

- Warm Paper is the default. The appearance toggle persists the user's choice across navigation and reloads. Theme changes must not tint image/logo files.
- Use Georgia/Times New Roman for editorial headings, Arial/Helvetica for body and controls, and Courier New for small labels. These are local font choices, not a claim about Claude's proprietary typography.
- Retain generous whitespace, warm surfaces, thin borders, orange framing and clear section hierarchy. Avoid introducing unrelated gradients, glass effects or a new font system without an explicit design decision.
- Share tokens and general styles in `web/styles/claude.css`; production page styles live in `web/styles/site.css`. Avoid duplicate component-specific palettes and scattered inline visual settings.
- The existing content shell is 1256px maximum, with 36px desktop and 20px mobile horizontal padding. Preserve intentional section spacing; use the existing spacing scale before introducing new values.
- Member card and member profile portraits keep their source 1:1 framing: the image box is a square `aspect-ratio`, never a fixed-height band that crops a square portrait. Keep the intrinsic `width`/`height` attributes matching the rendered square so the reserved space is correct. The compact (non-promoted) card variant still crops to a short band and needs a decision on how it compacts without one, recorded below, before any member renders in it.
- Headings wrap naturally. Body copy remains readable with comfortable line height and bounded reading width. Small labels must remain legible; light gray is for decorative surfaces, not low-contrast body text.
- Primary CTAs use dark text on Claude orange. Keep one clear primary action per section and a visibly quieter secondary action.

## Icons and animation

- **All UI icons use [Morphicons](https://www.morphicons.com/).** Use its official React binding with SVG icon data, following the [maintainer's documentation](https://github.com/guillermolg00/morphicons).
- Use `web/components/Icon.tsx` as the single shared application icon component. Lucide's vanilla data exports supply a consistent 24x24 stroke family to Morphicons; never substitute `lucide-react` components as its icon data.
- Do not use Unicode/emoji glyphs, icon fonts, hand-written SVG paths or CSS-drawn pictograms for action, navigation or state icons. In particular, remove text arrows that iOS can render as emoji.
- Use `currentColor`, round strokes, 1.5px stroke width and explicit 18-20px dimensions for inline action icons. Icons must align with text, retain their aspect ratio and never shrink or change surrounding layout during a morph.
- Provide real Morphicons spring animations: menu to close, sun to moon on appearance changes, and subtle arrow morphs when the enclosing action receives hover or keyboard focus. Calendar and same-page controls use directional icons that match their action.
- Trigger animation from the whole enclosing link/button/card, not only the tiny icon. Touch users can activate the action without hover or animation completion. State changes remain immediate.
- Use the library's `reducedMotion="user"` policy. Disable additional CSS motion for reduced-motion users. Do not run perpetual icon loops, schedule decorative intro icon animations, or delay navigation to finish an animation. Restore a saved theme as soon as client state is available.
- Decorative icons are hidden from assistive technology. Icon-only controls need an accessible label on the button/link. Do not make decorative SVGs independent focus targets or use an icon as the only explanation of an unfamiliar action.
- Bundle the library locally. Do not rely on an icon CDN or runtime asset request. Keep the static export compatible, with a real SVG available in the server-rendered HTML.

## Navigation and interactions

- Main navigation is Explore, Calendar, Community and Journal, with a persistent Join action. Preserve the existing destination URLs and active-page indication.
- Logo navigation returns home. Internal destinations go through `url()`; canonical URLs use `absoluteUrl()`.
- Join, Discord and application actions use their real configured URLs. External tabs use `rel="noopener noreferrer"`. Keep visible action labels explicit about their purpose.
- A whole activity/member/story card is one clear link. Avoid nested links/buttons, duplicate tab stops and decorative elements that intercept clicks.
- Mobile navigation opens from a labeled toggle, exposes its expanded state, closes on Escape and navigation, and returns focus to the toggle on Escape. It must not cover or block controls when closed.
- Filters show the current selection with a filled surface and text emphasis, retain context and offer an understandable empty state. Keep hover and keyboard feedback visible in both themes. Do not make filtering dependent on hover.
- Preserve standard browser Back behavior, link destinations and anchor navigation. Do not hijack scrolling, add autoplay video or make interactions depend on a pointer.

## Content and page behavior

- Root Markdown, `_data/` and the existing collections are the single content source. Do not duplicate biographies, activity descriptions, application links or calendar data in components.
- Andrew is Outreach Team Lead and Zihao is Technical Team Lead. Preserve the collection's visibility and sorting rules; do not invent titles or member records.
- Committee recruitment remains visible from Home and Community. Preserve the configured application process and factual seat/track information; verify changes rather than inventing availability or deadlines.
- Activity pages describe formats. Publication dates are not event dates. Avoid presenting past records as future sessions.
- The homepage artwork caption contains only `CAMBRIDGE / BUILDERS AT WORK`; omit its former second line. Community's primary heading reads `Good ideas need good community.` Keep the playground copy aligned with these production decisions.
- Calendar is an ongoing main page, never an archive-only destination. Its existing data, dates, times, venues and cancellation records remain intact unless the owner requests a schedule change.
- Do not add a summary row above the calendar grid: omit total/month session counts and the redundant `Club Calendar` badge. Retain month navigation, session names, details and the session list.
- Calendar cells show session names, with explicit cancelled labels. Selecting a day/session updates the matching detail panel. Month navigation keeps selected details in the visible month and disables unavailable boundaries.
- On narrow screens, the calendar dates region may scroll horizontally with a visible hint; the document itself must not overflow. Keep names readable instead of hiding them or replacing them with counts. The region must be keyboard reachable.
- Keep the Welcome section About link available at desktop, intermediate and mobile widths; place it below the copy when space is limited.
- Reading pages use one primary heading, a comfortable prose width and useful return links. Preserve existing routes, canonical metadata, sitemap/robots and legacy redirect stubs.

## Accessibility and responsive acceptance

- Use semantic landmarks, one `h1`, orderly headings, meaningful image alt text and empty alt text for decorative artwork.
- Keep visible keyboard focus, a working skip link and accessible names/states for all controls. Preserve text contrast of at least 4.5:1 for normal text and 3:1 for large text; distinguish state with more than color alone.
- Aim for at least 44x44px action targets. An inline icon may be smaller because the surrounding labeled action is the target.
- Check desktop at 1440px, mobile at 375px and intermediate widths affected by the change. Check both surfaces, long text, empty states and zoom where relevant. Do not assume screenshot-free parity from CSS alone.
- Icons must render as consistent SVGs, not platform emoji, and remain visible before hydration. Test hover, keyboard focus, touch-compatible state changes and reduced motion.
- Build the static export, run the affected interaction checks, inspect fresh screenshots and check for broken images, horizontal document overflow, console errors and hydration warnings. Use targeted accessibility scans with manual visual/focus review; a passing scan is not a full certification.

## Delivery and scope

Read `AGENTS.md` for branch, build, preview and publication requirements. Keep the local preview running on port 4102. Local design iterations remain unpublished until the owner requests publication; approval of an earlier PR does not automatically authorize merging subsequent design changes. Exclude `.zcode/`, build output and copied public assets from commits.

## Change record

### 7 October 2026 — establish the contract and migrate UI icons

- Request: document and enforce the approved UI/UX rules; maintain this file first for future changes; replace platform-dependent icons with Morphicons and include its built-in animations.
- Surfaces: production routes, shared header/footer, action/card links, calendar controls, recruitment anchors, return links and playground controls.
- Implementation intent: shared Morphicons React component with Lucide data; interaction/state-driven morphs; explicit reduced-motion support; no Unicode UI pictograms. Preserve content, images, route hierarchy and reviewed layout.
- Acceptance: static build; source audit for forbidden UI glyphs/custom SVGs; PR check requiring this contract alongside UI changes; SVGs present in initial HTML; desktop/mobile and theme screenshots; parent hover/focus animation; menu/theme/calendar state transitions; reduced motion; no overflow, browser or hydration errors.
- Status: implemented and verified locally. The static build generated 24 pages and 20 legacy redirects. All 182 inline UI SVGs across 19 audited routes use Morphicons and render before hydration; no prohibited UI glyphs remain. Hover/focus morphs, theme/menu/calendar controls, reduced motion and desktop/mobile layouts passed review. The maintenance guard passed a positive check and rejected a UI change without this document; PR enforcement is configured but has not run remotely for this local change. See [verification details](docs/design/morphicons-qa.md). Awaiting owner review; not published.

### 7 October 2026 — simplify captions and calendar labels

- Request: remove the homepage artwork caption's second line, remove the calendar summary counts and badge, and change `good company.` to `good community.`
- Surfaces: Home, Calendar, Community and matching playground captions/headings.
- Implementation intent: remove only the redundant caption and summary row; retain calendar data and interactions. Match the requested Community copy exactly.
- Acceptance: static build; rendered copy checks; fresh review of the affected pages at the annotated 903px width and mobile 375px; no document overflow.
- Status: implemented and verified locally. Static build and design policy passed; fresh Home, Calendar and Community screenshots reviewed at 1440px, 903px and 375px. Rendered copy matches the request, the summary row is absent, images load and there is no document overflow or browser error. Matching playground copy updated. Local preview only; not published.

### 7 October 2026 — publication approval

- Owner requested `PR and merge` after reviewing the local preview and final caption/calendar/community edits. This authorizes publication of the contract, animated icon migration and those copy changes together.
- Local build and preview checks passed before approval. Create a PR to `main`, wait for its build/design checks, squash-merge and verify the Pages deployment. Remote checks and deployment are pending at the time of this record; report their actual result in the PR and publication receipt.

### 9 October 2026 — refine copy and small usability details

- Request: initiate text improvements and minor UI improvements.
- Surfaces: Home, About, Contact, activity listing/detail pages, shared Welcome section, filters and footer; align the playground where shared copy or styles change.
- Implementation intent: clearer signup labels; concise, concrete, welcoming prose in existing content sources; useful activity-format context without adding dates or promises. Restore the Welcome About link on narrow screens, add filter text emphasis and footer hover/focus feedback. Preserve the approved palette, headings, images, icons, routes, recruitment facts and calendar data.
- Acceptance: design policy and static export build; card summaries at most 100 characters; fresh screenshots at 1440px and 375px in both themes plus intermediate Welcome layout; filters, menu, theme persistence, keyboard focus, image loading and calendar smoke check; no document overflow or browser/hydration errors; targeted accessibility scan. Keep the local preview on port 4102 for owner review.
- Status: implemented and verified locally. Design guard and static build passed (24 pages, 20 legacy redirects). Desktop/mobile screenshots in both themes, intermediate Welcome layout, keyboard/mobile controls, reduced motion, calendar smoke check and overflow/image/error checks passed. Eight targeted accessibility scans found zero violations; one decorative-label contrast result was reviewed manually at 5.20:1. See [verification and screenshots](docs/design/copy-ui-qa.md). Local Node 24; supported Node 20 Linux CI tracked in [PR #18](https://github.com/Cambridge-AI-Build-Club/Cambridge-AI-Build-Club.github.io/pull/18). Preview kept on port 4102; awaiting owner review, not published.

### 9 October 2026 — show team portraits uncropped and shrink the portrait payload

- Request: the Community team-lead photos are square source images but the section cropped them; optimise the section. The owner confirmed full-square framing, asset optimisation with the extension fix, keeping the existing 870px grid width, and bringing the member detail profile into the same change.
- Surfaces: Community `/team/` member cards and the member detail profile image, which read the same portrait files.
- Implementation intent: replace the 423×300 `object-fit: cover` band, which discarded about 29% of every square portrait and cut chins and shoulders, with a 1:1 image box so the photographed composition shows whole. Apply the same treatment to the detail profile's 340×380 band. Keep the two-column 870px grid, card chrome, borders and typography unchanged. Deliver both lead portraits as display-size progressive JPEGs. Correct `_team/zihao_liu.md`, whose `image` still pointed at the deleted `images/team/zihao_liu.png`: `web/scripts/sync-assets.mjs` wipes and recopies `web/public/images/` on every build, so the next clean export would have 404ed that portrait, and the stale copy already in `web/public/` is what appeared in the owner's screenshot rather than the current `zihao_liu.jpg`.
- Acceptance: `npm run build` and `npm run check:design` pass; measured card and profile image boxes report a 1:1 ratio with 0% cover crop at 1440px, 903px and 375px; portrait bytes compared before and after; both listing images and both detail profiles load from a clean `sync-assets` run; no broken images, document overflow, console errors or hydration warnings.
- Open item: the compact non-promoted card (`site-member-small`) keeps its short fixed band and now contradicts the square-framing rule. It renders only for a member record without a `promoted` field, which none currently have, so it was left alone rather than inventing a new compaction. Decide how it compacts before adding such a member.
- Status: implemented and verified locally. Design guard and static build passed. Measured with headless Chromium at 1440px, 903px and 375px: listing cards render 421×421 / 402×402 / 333×333 and detail profiles 340×340 / 280×280 / 335×335, every one a 1:1 box with 0% `object-fit: cover` crop, where the listing band previously discarded 29% of each portrait's height. Portrait payload fell from 2,650KB to 225KB (Andrew 1,212→117KB, Zihao 1,439→102KB). Both listing images and both detail profiles load from a clean `sync-assets` run, confirming the corrected `zihao_liu.jpg` reference; the previous build only appeared to work because a stale PNG survived in `web/public/`. No broken images, document overflow, console errors or page errors. See [screenshots](docs/design/team-portraits-2026-10-09/). Published with [PR #21](https://github.com/Cambridge-AI-Build-Club/Cambridge-AI-Build-Club.github.io/pull/21); see the publication record below.

### 9 October 2026 — owner-directed framing crop on the Technical Team Lead portrait

- Request: uncropping surfaced a scale mismatch the fixed-height band had been hiding — Andrew's head fills about 25% of his square against roughly 14% for Zihao's, so the two leads read unevenly side by side. The owner asked whether a crop was warranted and authorised modifying the portrait file itself in both locations.
- Surfaces: `images/team/zihao_liu.jpg` and its `web/public/` copy, feeding the `/team/` card and the `/team/zihao_liu/` profile.
- Implementation intent: crop the untouched 2424px camera original to a centred 1600×1600 square anchored on the head, then deliver at the existing 1200px size, bringing the head to about 21% of frame. A 1400px crop was rejected: it overshot to a larger head than Andrew's and cut through the forearms. The framing is baked into the pixels rather than done with `object-position`, so the square-framing rule above still holds and no surface crops at render time.
- Acceptance: side-by-side card comparison at the real 421px render size against Andrew's portrait; head scale within a few points of the paired card with arms, railing and stone post intact; build and design guard pass; listing and profile still measure 1:1 at 0% render crop at 1440px, 903px and 375px; uncropped original retained outside the repository.
- Status: implemented and verified locally. Design guard and static build passed. Re-measured at 1440px, 903px and 375px after the crop: listing cards 421×421 / 402×402 / 333×333 and profiles 340×340 / 280×280 / 335×335, still 1:1 at 0% render crop, with no broken images, overflow, console or page errors. The head now fills about 21% of the square against Andrew's 25%, and the paired cards read evenly at the real render size. The crop also trimmed the file to 75KB, so the two delivered portraits total 192KB rather than the 225KB recorded above, against 2,650KB originally. The untouched 2424px camera original is retained outside the repository at `cuabc-team-portrait-backup-2026-10-09/zihao_liu.jpg.orig`. Screenshots refreshed in the same folder. Published with [PR #21](https://github.com/Cambridge-AI-Build-Club/Cambridge-AI-Build-Club.github.io/pull/21); see the publication record below.

### 9 October 2026 — publication receipt for the team portrait change

- The owner reviewed the local preview on port 4102 and requested the merge. Both commits squash-merged into `main` as [PR #21](https://github.com/Cambridge-AI-Build-Club/Cambridge-AI-Build-Club.github.io/pull/21) at `c937e45`; the branch CI `build` check passed and the `Deploy Next.js site to Pages` run completed successfully on the merge commit.
- Verified against the live site at the org root with a cache-busting query string, because Pages caches for up to ten minutes: `/team/` references `/images/team/andrew_choi.jpg` and `/images/team/zihao_liu.jpg`, both served at HTTP 200 with the expected 119,854B and 76,733B payloads; the shipped CSS carries `aspect-ratio:1/1` on `.lab-member>img` and `.site-profile>img` with the fixed-height mobile overrides gone; and the stale `/images/team/zihao_liu.png` now returns 404, which confirms the corrected reference rather than a surviving copy.
- Open items carried forward: the compact non-promoted card still needs a compaction decision before any member renders in it, and the uncropped 2424px camera original is retained outside the repository should the crop need revisiting.
