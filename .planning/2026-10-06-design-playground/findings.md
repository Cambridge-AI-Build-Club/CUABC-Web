# Verified findings

- The checked-out main branch already has Next.js 15, React 19, TypeScript and static export in web/.
- Each production route owns an HTML root layout. A separate playground layout can avoid importing legacy Sass.
- Build-time loaders read root Markdown and _data; image sync copies root images to an ignored public folder.
- Three _events entries describe activity formats (Demo, Workshop, Hackathon), not dated upcoming events.
- The current calendar has 14 entries in January-March 2026 and defaults to February. Event records are hard-coded in CalendarApp.tsx.
- Two visible promoted members; four members have promoted: false and must stay hidden.
- The blog is a historical Claude Builder Program announcement dated September 2025. Avoid presenting its claims as current verified sponsorship.
- Signup and Discord actions must read the configured data files.
- Existing .zcode/ is untracked and belongs to the user; leave it untouched.
- CSS changes for this prototype can live in isolated playground CSS; the production Sass mirrors remain untouched.
- The user confirms the current Claude Builder Club collaboration and requires Claude branding, local design iterations without PRs, and asset reuse first.
- Official palette verified from anthropics/skills/skills/brand-guidelines/SKILL.md: orange #D97757, light #FAF9F5, dark #141413, light gray #E8E6DC, mid-gray #B0AEA5.
- Claude's official website serves the full wordmark as an inline SVG (viewBox 0 0 573 125), including the #D97757 symbol. Saved this exact geometry locally; no generative logo creation.
- Reused existing club logos, intro illustration and _data/features.json icon mapping. The earlier generated hero and hand-drawn activity graphics are no longer rendered.
- Approved production migration completed locally: 18 content routes plus playground; source navigation, roles and committee recruitment are unified.
- All 14 calendar records preserve the original schedule; cancelled status is explicit. No new dates were created.
- Final integrity and browser review are recorded in docs/design/migration-qa.md. Original Jekyll Sass sources differ in comments/front matter but remain unmodified.

## Calendar refinement — 7 October 2026

- The owner wants an ongoing Calendar page and primary navigation link, not archive framing.
- Preserve the existing 14 records and calendar behaviour; future sessions can use the same JSON source.
- Calendar metadata now reads the root calendar.md description. All visible archive wording was removed from the calendar and its production/playground entry points.

## Club name correction — 7 October 2026

- The official website name is Cambridge AI Builder Club. Use the singular Builder and preserve the Claude collaboration branding.
- Footer copyright is exactly © 2026 Cambridge AI Builder Club, sourced from _data/seo.yml in both production and playground.
