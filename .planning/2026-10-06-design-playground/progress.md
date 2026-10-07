# Progress

## 2026-10-06
- Read repository guidelines and relevant implementation/content.
- Checked history guidance against live files; migration notes in memory are older than this implementation.
- Created codex/design-playground with approved Git sandbox escalation.
- Proposed Builder Lab: charcoal, acid green, editorial typography, generated abstract sculpture, clear join/events paths.
- Current scope is the design proposal and review playground, ending at the user's design checkpoint.
- Added the English design brief and generated-artwork prompt/provenance.
- Built isolated Home, Explore and Community templates; content cards and links load from the existing sources.
- Generated a metallic loop hero with the built-in GPT Image tool and exported a 283600-byte JPEG.
- Next.js static build passed; generated 24 pages and 20 legacy redirect stubs.
- Started the hidden static preview at port 4102; HTTP 200 for /playground/. The runtime wrapper launched child listener PID 41688 (verified by Get-NetTCPConnection).
- Inspected desktop Home/Community and mobile Home screenshots; no visible clipping or layout problems.
- Verified palette changes, motion pause, view changes, activity filtering (3 -> 1 -> 3), two public member cards and no browser errors so far.
- Corrected filter scope so a previous Explore filter cannot hide Home activity cards.
- Final interaction verification passed, including filter isolation, browser Back and reduced-motion preference.
- Fresh screenshots for all three views at desktop/mobile were visually inspected, including the mobile menu and controls.
- axe-core found no automatic A/AA violations; decorative contrast regions received manual visual and numerical review (all reviewed text pairs exceed 7:1).
- Internal destination, hero asset and legacy redirect HTTP checks passed. Preview process remains running.
- Final Community accessibility scan: zero violations and zero incomplete checks. Home/Explore/control decorative contrast cases are recorded with manual inspection evidence in docs/design/playground-qa.md.
- Committed and pushed the implementation on codex/design-playground; verified the remote matches implementation commit 9fc0987.
- Opened and attached Draft PR #15: https://github.com/Cambridge-AI-Build-Club/Cambridge-AI-Build-Club.github.io/pull/15.
- The PR remains open and unmerged. GitHub's build check is tracked on the PR; no production deployment was initiated.
- Delivered the local preview URL and opened it in a Codex browser panel (the app reported queued).
- The current design proposal/template deliverable is complete. The user's approval is the next checkpoint before detailed migration planning.

## Claude branding correction
- User instructed local design exploration without PR preparation, official Claude colors, existing club asset reuse and official-source partner logos.
- Closed Draft PR #15 and removed its chat attachment; no branch was deleted and no merge occurred.
- Inspected the existing club wordmark, square mobile mark and AI builder illustration. All are reusable PNGs with transparency.
- Located Anthropic's official brand-guidelines source and public official Brandfolder newsroom. Research and local design revision are underway.
- Saved the official Claude website navigation SVG as images/brand/claude-official.svg (SHA256 19D1A4EEDB2CC6F70077B0A3434BF010BD502205FE3F8F990FEDF7C619BE3E23).
- Replaced the generated hero and custom activity graphics with existing assets loaded through the current root config, home page and features data.
- The updated interface uses the verified orange/cream/charcoal palette, a fixed orange accent and two surface options. Image and logo colors remain unchanged.
- The first CSS replacement patch was rejected for duplicate file operations; replaced the stylesheet through a validated workspace-local temporary file, preserving LF endings.
- The revised static build passed with 24 pages and 20 redirect stubs; existing asset files and production templates remain unchanged.
- Inspected desktop/mobile Home in both surfaces, mobile Explore/Community and review controls. No horizontal overflow, broken images or browser errors.
- Verified mobile menu/Escape focus, activity filtering and fixed official accent. Accessibility scans found zero automatic A/AA violations; open-panel contrast cases were manually inspected and recorded.
- Updated design screenshots, source provenance, proposal and QA record. No new generation, commit, push or PR in this revision.
- Restarted the hidden static server (listener PID 36080) and requested the updated Codex browser preview. The app reported queued. The isolated QA browser was closed; preview server stays running.
- Local Claude-branded revision is complete. The user design checkpoint remains pending before detailed migration planning.

## Approved full migration
- Owner approved the overall design and authorized all-page migration, with new activity icons, corrected lead roles and committee recruitment.
- Read live root content, route templates and calendar records. Existing committee applications have eight seats across outreach/technical tracks.
- Added the concrete route, content, asset and verification plan. Continue local implementation without publishing.
- A redundant Get-Content argument failed during discovery; the subsequent literal-path read succeeded.
- Shared Claude design, route templates, persisted theme control and server-rendered content are implemented. All 24 pages and 20 redirect stubs built successfully.
- Redesigned three activity SVGs; official and club logos remain untouched. Promoted approved homepage copy into index.md and removed its duplicate prototype data file.
- Extracted all 14 calendar events into root JSON, preserved dates/times/venues, corrected the cancelled label and removed runtime Tailwind/Brandfetch dependencies.
- Initial diff check found inherited trailing spaces on the changed Andrew paragraph; removed them. Added canonical tags before final verification.
- Desktop and mobile templates inspected. Adjusted prose spacing, recruitment summary styling, the article heading extraction and calendar ARIA semantics.
- The old preview listener stopped before mobile checks. Restarted the server in a managed exec session and discarded the browser error-page screenshots; fresh real-site checks passed.
- Theme persistence and 3 -> 1 -> 3 activity filtering passed. Mobile Escape restores menu focus.
- Removed the now-unused legacy Next.js components; root Jekyll templates remain for rollback. Updated contributor and runtime documentation to the approved design architecture.
- Diagnosed the preview interruption: the server threw on a double-slash root request. Added URL normalization and a 400 response for malformed escapes, so review sessions stay running.
- Integrity audit initially included the built-in 404 canonical, prototype hash navigation and legacy Sass comment/front-matter differences; corrected those audit assumptions while keeping real route checks strict.
- Final build passed. Audited 19 content/review routes, 47 internal references and 20 legacy redirects, with zero integrity failures; 57 HTTP targets returned 200.
- Calendar month boundaries, matched selection, hackathon details and cancellation state passed. Reduced-motion, filters, persisted appearance and mobile navigation passed.
- Fresh final article screenshots confirm a single primary heading and readable desktop/mobile layouts. Automatic WCAG scans found zero violations; decorative mobile label contrast was manually verified at 5.20:1.
- Saved delivery screenshots, SVG provenance and migration verification. No new commit, push, PR, merge or deployment.
- A line-ending helper used a repository-relative path from web/ and failed without modifying files; corrected with the absolute target path.

## Calendar refinement — 7 October 2026

- Added Calendar after Explore in the shared primary navigation and matching playground navigation. Updated calendar heading, metadata, footer and event-page links.
- npm run build passed: 24 static pages and 20 legacy redirects. Route integrity check passed: 19 routes, 47 internal targets, zero failures.
- Inspected screenshots at 1440px and 375px; neither viewport had horizontal overflow. Mobile homepage menu reaches Calendar and closes after navigation; Calendar has the active link.
- Existing January/March boundaries and cancelled February session still work. Playground links use Calendar without archive copy. No browser errors reported in the test session.
- Calendar JSON SHA256 remains 2337e590a7f43761a1013ac7269129be0f482629e30ab7cd540a9883a3aab4ce. No new PR, commit, push or deployment. Preview remains running on port 4102.

## Club name and footer refinement — 7 October 2026

- Updated the club name in shared headers, page titles, metadata, root club copy and partnership article references. Replaced the footer title with the requested copyright; the previous bottom footer line remains removed.
- Production build passed. Verified correct name and copyright across 19 exported pages, and inspected footer screenshots at 1440px and 375px without horizontal overflow. Playground uses the same copyright source. Preview remains at port 4102; no new PR or deployment.

## Calendar cell titles — 7 October 2026

- Replaced session counts and dots inside calendar cells with full session names; cancelled sessions have a visible label.
- Increased cell spacing and kept names visible on mobile with a horizontally scrollable dates region and scrolling hint. Event dates and selection behaviour remain unchanged.
- Production build passed. Inspected 1440px/375px screenshots and selected both the workshop and cancelled demo. No document overflow or browser errors. Calendar JSON is unchanged; preview remains at port 4102. No new PR or deployment.

## Publication authorization — 7 October 2026

- The owner explicitly requested updating and merging the PR after reviewing the local site and refinements. This supersedes the local-only delivery boundary.
- Verified PR #15 is closed and draft, and the current branch is two commits ahead of main with no missing main commits. Reuse the same PR. User-owned .zcode/ remains excluded.
