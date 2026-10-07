# Claude design migration verification

Completed locally on 6 October 2026 after owner approval of the design direction.

## Delivered

- All 18 production content routes use the shared Claude design, including collection details, About, Contact, recruitment and calendar. The separate playground remains available.
- Three new decorative activity SVGs replace the previous thin-line icons. Club logos, hero illustration, official Claude SVG and member portraits are reused.
- Andrew is the Outreach Team Lead; Zihao is the Technical Team Lead. Their cards, biographies and committee tracks agree.
- Committee recruitment is visible on Home and Community and through the footer. The full page preserves the existing eight seats, application URL, Cambridge login/CV requirements and rolling process.
- Approved homepage copy lives in `index.md`, navigation labels in `_data/menus.yml`, and calendar records in `_data/calendar.json`. No collection content is copied into `web/`.
- Obsolete Next.js theme components were removed; root Jekyll templates and legacy Sass were left intact.

## Build and integrity

- `npm run build` passed with Next.js 15.5.27, TypeScript validation, 24 generated static pages and 20 legacy redirect stubs.
- Runtime used: installed Node 24.19.0. The repository's Node 20 CI check was not invoked for this local, unsubmitted change.
- Audited 19 content/review routes, 47 distinct internal page/asset references and canonical metadata. No missing targets, broken same-page anchors or duplicate primary headings.
- HTTP checks covered 57 page/resource destinations, including sitemap, robots and legacy URLs: all returned 200.
- All 14 calendar records match the previous implementation's dates, times, venues and types. Only the misspelled cancellation text became an explicit cancelled status.
- Only Andrew and Zihao are linked from Community. Hidden member detail URLs are still generated, preserving previous behavior.
- `git diff --check` passed. Existing club/portrait assets, legacy Sass and deployment workflows were not modified.
- The preview server now normalizes a double-slash root request and returns 400 for invalid URL escapes instead of crashing. Regression checks: 200, 400, then a healthy 200 response.

## Browser and visual review

- Inspected desktop (1440px) and mobile (375px) screenshots for Home, Explore, Community, recruitment, Journal, calendar, About, Contact, activity detail, member profile and article templates.
- No horizontal document overflow or failed images on the checked pages. Warm Paper and Charcoal appearances were inspected.
- Activity filtering: 3 cards -> 1 Workshop -> 3 cards.
- Appearance preference survives reload and navigation. Browser reduced-motion preference disables the hero animation.
- Mobile menu opens, closes with Escape, returns focus to its toggle and resets after navigation. Skip links and keyboard focus remain visible.
- Calendar reaches January/March boundaries with correctly disabled controls, selects the matching event after changing month, displays hackathon time/venue correctly and labels the February cancelled demo explicitly.
- axe-core 4.12.1 found zero automatic WCAG A/AA violations on tested production templates and theme states. Mobile decorative activity labels required manual review: clear in screenshots, with `#5F5E57` on `#E8E6DC` giving 5.20:1 contrast. This targeted verification is not a full accessibility audit.
- No browser JavaScript errors on the final working pages. Earlier connection-error pages were discarded and replaced with fresh screenshots after repairing the preview server.

## Delivery state

The migrated full site is available at `http://localhost:4102/`. The server is kept running. Changes are local on the existing feature branch; no new PR, commit, push, merge or production deployment was made during this migration. External signup/application forms and Discord were not submitted or joined.

## Review screenshots

![Migrated desktop Home](migration-home-desktop.jpg)

![Migrated mobile Home](migration-home-mobile.jpg)

![Community and team leads](migration-team-desktop.jpg)

![Committee recruitment](migration-committees-desktop.jpg)

![Calendar](migration-calendar-desktop.jpg)

## Calendar refinement — 7 October 2026

Calendar is now an ongoing primary page. Navigation, page metadata, event links, footer and playground use Calendar without archive framing. The 14 existing records are unchanged (SHA256 `2337e590a7f43761a1013ac7269129be0f482629e30ab7cd540a9883a3aab4ce`).

The production build and route integrity check passed. Fresh desktop (1440px) and mobile (375px) screenshots were inspected with no horizontal overflow. Verified mobile navigation to Calendar, its active link, existing month boundaries and cancelled-session details. No new PR or deployment.

![Calendar on mobile](calendar-main-mobile.jpg)

## Final owner review — 7 October 2026

The owner approved updating and merging the PR after reviewing the local preview. The final refinements use Cambridge AI Builder Club throughout website copy and metadata, the existing logo alone in the header, and © 2026 Cambridge AI Builder Club in the footer. The extra bottom footer line is removed. Calendar is an ongoing main navigation page, with full session names in date cells, explicit cancellation labels and horizontal scrolling on mobile. All existing dates, times and venues remain unchanged.

The PR title and description will cover the complete approved redesign. Final preview screenshots and checks are recorded below; publishing waits for a passing GitHub build check.

### Final publication checks

- Fresh local production build passed on 7 October 2026: 24 generated pages and 20 legacy redirects.
- Route audit passed: 19 production/review routes, 47 internal targets, all 14 calendar records preserved and no failures.
- Final Calendar WCAG A/AA scan: zero violations and zero incomplete checks.
- Diff whitespace check passed with cr-at-eol to respect the existing CRLF README.

![Final desktop Home](final-home-desktop.jpg)

![Final mobile Home](final-home-mobile.jpg)

![Final desktop Calendar](final-calendar-desktop.jpg)

![Final mobile Calendar](final-calendar-mobile.jpg)
