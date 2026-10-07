# Website redesign: direction and review playground

## Goal
Deliver the owner-approved Claude UI/UX migration across all Next.js pages, including redesigned activity icons, corrected team lead roles and committee recruitment.

## Phases
- Discovery and current architecture verification: complete.
- Design brief and review criteria: complete.
- Generated concept artwork and interactive template: complete.
- First concept build, desktop/mobile QA and local preview: complete (superseded direction).
- Revise the concept around Claude branding and reuse existing assets: complete.
- Rebuild and review the Claude-branded local playground: complete.
- Reviewer selects and approves direction: complete (owner approved on 6 October 2026).
- Detailed route/content/asset migration plan: complete (docs/design/migration-plan.md).
- Activity SVG redesign and root content corrections: complete.
- All production templates and shared navigation migration: complete.
- Build, route integrity, interaction and desktop/mobile QA: complete.
- Promote Calendar to an ongoing primary page: complete (7 October 2026).
- Update and reopen PR #15, pass CI, squash merge and verify deployment: in progress.

## Next Step
The owner approved the reviewed site and explicitly requested updating and merging the PR on 7 October 2026. Update PR #15, wait for the build check, squash merge and verify the resulting Pages deployment.

## Decisions
- Reuse the existing Next.js 15 static-export implementation; this is a design migration.
- The user's redesign request supersedes the old visual-parity requirement for the playground.
- Keep current production routes intact during design review.
- Root Markdown and data remain the source of truth; no copied event/member content.
- Never portray the January-March 2026 calendar or collection publication dates as upcoming events.
- Use actual portraits for members; reuse existing club logos, illustration and activity assets first.
- User correction: this is a Claude Builder Club collaborating with Claude. Use verified official brand colors and authentic official Claude logo files. Never generate partner logos.
- User correction: design exploration stays local; do not prepare PRs for these iterations. Draft PR #15 was closed and detached on request. Keep the existing branch without pushing review iterations.
- Only generate imagery when the existing inventory cannot meet a concrete design need.

## Errors
- Git branch creation was denied by the read-only .git sandbox; the narrowly scoped escalation succeeded.
- The system Node proxy has no active version; use the bundled runtime or an installed version without changing global settings.
- A JPEG export initially used the web/ working directory for a relative mkdir; corrected with an absolute root asset path and removed the two empty directories.
- The preview process initially needed its ignored tmp/ log folder; created it and started successfully.
- Fixed an autoprefixer warning by using flex-end.
