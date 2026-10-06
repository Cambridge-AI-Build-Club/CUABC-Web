# Website redesign: direction and review playground

## Goal
Deliver an overall design proposal and a working Next.js playground for review. Detailed migration planning, final asset production and the production UI rollout follow design approval.

## Phases
- Discovery and current architecture verification: complete.
- Design brief and review criteria: complete.
- Generated concept artwork and interactive template: complete.
- Build, desktop/mobile visual QA, pull request and local preview: in_progress.
- Reviewer selects and approves direction: pending (user checkpoint).
- Detailed route/content/asset migration plan: pending (after approval).
- Final imagery and production migration: pending (after approval).

## Next Step
Finish interaction QA and submit the branch PR; present the running local preview for direction approval.

## Decisions
- Reuse the existing Next.js 15 static-export implementation; this is a design migration.
- The user's redesign request supersedes the old visual-parity requirement for the playground.
- Keep current production routes intact during design review.
- Root Markdown and data remain the source of truth; no copied event/member content.
- Never portray the January-March 2026 calendar or collection publication dates as upcoming events.
- Use actual portraits for members. Generated abstract art is decorative, not documentary.
- Branch: codex/design-playground; keep its PR open until local review approval.

## Errors
- Git branch creation was denied by the read-only .git sandbox; the narrowly scoped escalation succeeded.
- The system Node proxy has no active version; use the bundled runtime or an installed version without changing global settings.
- A JPEG export initially used the web/ working directory for a relative mkdir; corrected with an absolute root asset path and removed the two empty directories.
- The preview process initially needed its ignored tmp/ log folder; created it and started successfully.
- Fixed an autoprefixer warning by using flex-end.
