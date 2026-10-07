# Approved Claude design migration

Approved by the owner on 6 October 2026, with activity icon redesign, corrected team lead roles and visible committee recruitment.

## Implementation

| Routes | Change | Content source |
| --- | --- | --- |
| `/` | Approved warm editorial hero, official Claude collaboration strip, activity cards, recruitment and journal | `index.md`, `_data/`, collections |
| `/events/`, event detail URLs | Filterable activity discovery, shared illustrated cards, readable detail template, Calendar link | `_events/`, `_data/features.json` |
| `/team/`, member detail URLs | Community welcome, team leads, recruitment CTA, original portraits and biographies | `team.md`, `_team/` |
| `/committees/` | Recruitment status, outreach/technical tracks, application action, existing requirements | `committees.md` |
| `/blogs/`, article URLs | Journal cards, publication dates, readable article template | `blogs.md`, `_blogs/` |
| `/about/`, `/contact/` | Shared page template and clear join/contact actions | Root Markdown and `_data/contact.yml` |
| `/calendar/` | Responsive accessible ongoing calendar and event details; remove runtime Tailwind and third-party logo | `_data/calendar.json` extracted from existing calendar |
| `/playground/` | Keep review prototype, use updated icons and corrected source roles | Shared root data |

## Design and assets

- Default to the approved Warm Paper surface with official orange, cream and charcoal; retain the Charcoal option through a compact site theme control.
- Reuse club wordmarks, homepage illustration, member portraits and the official-source Claude SVG. No partner logo generation.
- Replace only the three activity icons with repo-native SVG illustrations: presentation window, workshop tools and collaborative build modules. They are decorative artwork, not Claude brand marks.
- Use the approved local Georgia/Arial typography, original image colors, orange offset framing and restrained motion honoring reduced-motion preferences.
- Keep the legacy Sass and Jekyll templates available for rollback; production Next.js templates use separate shared design CSS.

## Content changes

- Andrew: Outreach Team Lead. Zihao: Technical Team Lead. Correct contradictory President/Ambassador role prose without guessing new academic dates.
- Make committee recruitment visible on Home and Community, with the real existing application link, eight seats and two tracks from `committees.md`.
- Update current club identity and navigation labels while keeping every existing route and collection slug.
- Activity formats are not future dated events. Preserve all 14 existing calendar records, mark the cancelled event explicitly, and do not invent a new programme.
- Root Markdown/data stay the single content source. Promote approved prototype copy into root page fields; the playground reads that source too.

## Verification and delivery

Build the static export, check all page/asset/internal-link destinations and legacy redirect stubs, inspect desktop/mobile screenshots across all templates, test menu/theme/filter/calendar controls and scan accessibility. Keep the local preview running at port 4102. The local migration and minor refinements were reviewed. On 7 October 2026 the owner explicitly requested updating and merging PR #15 after its build check passes.
