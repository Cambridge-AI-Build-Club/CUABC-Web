# Progress

9 October 2026: inspected live rules and sources; selected a focused copy and usability pass. Build, screenshots, PR and owner review pending.

Build passed (24 pages, 20 redirects), design guard passed, summary lengths 84/95/91. Fresh Home desktop/mobile screenshots reviewed: clear CTA, complete illustrations, visible mobile About link and intact hierarchy. Inline agent-browser eval was parsed by its Windows command wrapper; use stdin for browser JavaScript checks.

Home Charcoal and Explore screenshots reviewed. Selected Workshop is bold and underlined; Hackathon filter works, Enter on All activities restores three cards with visible focus. Menu Escape closes and restores toggle focus. Theme persists across navigation. Home and Explore targeted WCAG 2A/AA scans found zero violations. Browser refs must be quoted in PowerShell; corrected commands passed. Element screenshot required scrolling before capture; recapture pending.

About keyboard link test passed using snapshot ref (CSS selector with > had been interpreted by the Windows CLI wrapper). Cancelled calendar detail and next-month March selection passed; mobile document width 375. Reading pages have no overflow or broken images at both widths/themes. Default Python lacks Pillow; bundled Python used for QA contact sheets. Explore Charcoal axe has one incomplete decorative-label contrast result due to overlap; manual computed color check pending.

All local verification completed; see docs/design/copy-ui-qa.md. Fresh corrected Welcome and reading-page screenshots reviewed, including loaded Charcoal illustrations. Footer hover/focus, reduced motion and calendar checks passed. Preview restarted with ignored logs; screenshots/error parsing artifacts cleaned. Current origin/main equals branch base. Next: commit, PR and CI; owner approval before merge. Browser eval async code requires an async IIFE; network-idle waits were sufficient for final image captures.

PR #18 created and attached: https://github.com/Cambridge-AI-Build-Club/Cambridge-AI-Build-Club.github.io/pull/18. Initial build check pending; PR head 32f9b4d. Local preview HTTP 200, QA browser closed, working tree otherwise clean apart from preserved .zcode/. CI result is tracked on the PR; owner preview approval is the remaining publication gate.
