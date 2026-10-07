# Cambridge AI Builder Club design rules

Last updated: 7 October 2026. Applies to all production Next.js routes and the design playground.

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
- The three approved activity illustrations are decorative artwork. Brand marks, portraits and illustration assets retain their source files; interactive UI pictograms follow the icon rules below.
- Generate new imagery only for a concrete gap in the existing inventory. Record its purpose, source/prompt, intended size and accessible treatment before generation. Never fabricate team portraits or event photography.

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
- Filters show the current selection, retain context and offer an understandable empty state. Do not make filtering dependent on hover.
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
