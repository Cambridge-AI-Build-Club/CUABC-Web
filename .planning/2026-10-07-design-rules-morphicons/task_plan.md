# Design contract and Morphicons

## Goal
Write DESIGN.md before implementation, enforce its maintenance through AGENTS.md, and replace UI pictograms across production/playground with locally bundled animated Morphicons.

## Phases
- Verify current baseline and official library guidance: complete.
- Record approved UI/UX contract and icon change before implementation: complete.
- Add contributor entry point and official library integration: complete.
- Replace all action/navigation/state icons and configure animations: complete.
- Build, static/source audit, interaction/visual/accessibility review: complete.
- Update DESIGN.md verification and deliver local preview: complete.
- Publish the owner-approved PR, wait for checks, squash-merge and verify deployment: in progress.

## Next Step
Publish the approved branch through a PR and verify remote build/deployment results.

## Boundaries
- Branch: codex/design-rules-morphicons, based on merged main.
- Keep .zcode/ untouched. The owner explicitly authorized PR creation and merging after local review on 7 October 2026.
- Morphicons is the renderer; Lucide data provides its documented icon input.
- Existing approved logos, hero and decorative activity illustrations are preserved.

## Errors
- A redundant Get-Content positional argument failed; re-read the member page with -LiteralPath.
- Initial icon guard treated date.split('-') as a UI symbol; narrowed the ASCII rule to plus pictograms while preserving legitimate date separators.
