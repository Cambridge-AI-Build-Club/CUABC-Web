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
