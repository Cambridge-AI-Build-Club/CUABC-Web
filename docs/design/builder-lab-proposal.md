# Cambridge Claude Builder Club: website design proposal

Status: revised local concept for review, 6 October 2026. The initial acid-green direction is superseded. No production rollout is approved.

## The outcome

Create a distinctive home for a student builder community: curious, experimental and welcoming. Visitors should understand the club, discover ways to participate and find the join action within one screen. Technical confidence should come from thoughtful design and real work rather than invented membership statistics or sponsor walls.

The repository already runs Next.js 15 static export. The next migration is from the inherited Jekyll presentation to a new design system. Keep the working hosting pipeline and source content while reviewing the direction.

## Recommended direction: Claude Builder Studio

- Official Anthropic/Claude palette: terracotta orange `#D97757`, warm white `#FAF9F5`, charcoal `#141413` and light gray `#E8E6DC`. See [verified sources and asset inventory](claude-brand-sources.md).
- Warm editorial headlines paired with small monospaced labels, orange offset frames and restrained motion. The prototype uses Georgia and Arial as local font choices, not a claim about official Claude typography.
- Reuse the existing club illustration, desktop/mobile logos and activity icons without modifying their files. Display an authentic Claude wordmark obtained from the official website in a separate collaboration strip.
- Use open layouts and clear section hierarchy. Activity cards can feel tactile; reading pages should remain calm and comfortable.
- Give members real portraits and factual roles from the existing records. Partner logos always come from official publishers.
- Playground alternatives: Warm paper and Charcoal surfaces. Both keep Claude's official orange accent fixed; neither tints any image or logo.

## Information architecture to test

| Visitor task | Primary destination | Proposed behavior |
| --- | --- | --- |
| Understand and join | Home | Club identity, welcoming introduction, primary join CTA, secondary activities CTA |
| Find things to do | Events | Upcoming event list when verified records exist, filters, details and calendar; clear archive |
| Find collaborators | Community | Welcome, Discord, public team and committee opportunities |
| Read club updates | Journal | Existing blog listing and comfortable article template |
| Learn or contact | About / Contact | Mission, practical FAQs and existing contact details |

Primary navigation in the concept: Explore, Community, Journal, plus persistent Join. Calendar belongs beside event discovery. Team and committees belong under Community. Preserve existing URLs during the eventual rollout even if navigation labels change. A future Projects section needs real submissions and permission; it is not part of this prototype.

## Prototype scope

The isolated `/playground/` route previews Home, Explore and Community as interactive views. It supports activity filters, member cards, mobile navigation, warm/dark surface selection and a motion switch. Real signup, Discord and existing detail pages are linked from configured sources; detail pages still use the current design. The prototype makes those boundaries visible in the review panel.

The user identifies the club as a Claude Builder Club collaborating with Claude. The concept reflects that current owner-provided identity. Historical blog content and the existing route content await the later content migration review. Activity entries describe three formats, not future dated events. The January-March 2026 calendar remains an archive; no new dates or registrations are invented.

## UX and accessibility

- One dominant action per section; join is an explicit external form, Discord a separate action.
- Mobile navigation has an accessible toggle, Escape dismissal and visible keyboard focus.
- Filters retain context and provide a clear empty state if content changes.
- Use semantic headings, labels, sufficient contrast, readable paragraph widths and targets at least 44px high.
- Honor reduced-motion settings. Avoid autoplay video, scroll hijacking and interaction that requires hovering.
- Decorative art uses empty alt text. Real portraits have names. Image dimensions reserve layout space.
- Keep motion limited to subtle hero drift and hover responses; a pause control is available.
- No third-party image/font runtime dependency for the concept.

## Approval sequence

1. Review the overall direction and interactive template locally at desktop and mobile widths.
2. Approve or revise the visual language, page hierarchy, hero and primary actions.
3. Then create the detailed migration plan: route inventory, component mapping, content edits, calendar data schema, URL/SEO preservation, final image list, prompts and delivery order.
4. Reuse the approved existing image set. Generate only imagery needed for a concrete gap; obtain partner logos from official sources. Optimize final desktop/mobile formats.
5. Implement the production migration after approval, build and inspect each batch. The user has explicitly excluded these design explorations from PR preparation; this checkpoint is a local preview only.

The detailed plan should resolve date/status/timezone/venue/registration fields in a shared root data file before replacing the hard-coded calendar. It should also identify outdated prose and committee deadlines for owner verification. These are discovered planning inputs, not content changes authorized for this concept.

## Acceptance for this review deliverable

- Next.js static build passes; existing production routes and redirect stubs remain available.
- Screenshot inspection at 1440px and 375px; no horizontal scrolling or obstructed navigation.
- View changes, filters, surface controls, pause control and mobile menu work.
- Visible members follow the existing `promoted` visibility rule.
- No invented event dates, numbers, sponsorship claims or project showcase entries.
- Local preview stays running. No new PR is prepared for design iterations; the earlier Draft PR #15 was closed.

## Review prompts

Compare Warm paper and Charcoal within the fixed Claude palette. Decide how experimental or academic the composition should feel and whether Home / Explore / Community makes the club easy to understand. Then evaluate mobile layout, action prominence and readability. Approval of the direction precedes the detailed migration plan and production changes.

## Owner approval and completed implementation

The owner approved the overall direction on 6 October 2026 and authorized all-page migration, with redesigned activity icons, corrected team lead roles and committee recruitment. See [migration plan](migration-plan.md), [artwork](activity-artwork.md) and [verification](migration-qa.md). The full local site replaces the production-route templates; no new PR or deployment was prepared.

## Final approved direction and publication

On 7 October 2026 the owner confirmed the official name Cambridge AI Builder Club, an image-only header, the copyright footer and an ongoing Calendar page with session names. The owner reviewed these refinements locally and explicitly requested updating and merging PR #15. The historical prototype scope above is superseded by the completed migration described in migration-plan.md and migration-qa.md.
