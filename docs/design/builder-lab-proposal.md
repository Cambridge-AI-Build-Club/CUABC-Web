# Builder Lab: website design proposal

Status: concept for review, 6 October 2026. No production rollout is approved.

## The outcome

Create a distinctive home for a student builder community: curious, experimental and welcoming. Visitors should understand the club, discover ways to participate and find the join action within one screen. Technical confidence should come from thoughtful design and real work rather than invented membership statistics or sponsor walls.

The repository already runs Next.js 15 static export. The next migration is from the inherited Jekyll presentation to a new design system. Keep the working hosting pipeline and source content while reviewing the direction.

## Recommended direction: Builder Lab

- Charcoal canvas, warm white typography, acid-green accents, fine technical rules and restrained motion.
- Large editorial headlines paired with small monospaced labels. Use available local/system fonts in the prototype; select self-hosted final fonts after approval.
- A generated metallic sculpture supplies a memorable hero visual. It is abstract decorative art, never evidence of a real project or event.
- Use open layouts and clear section hierarchy. Activity cards can feel tactile; reading pages should remain calm and comfortable.
- Give members real portraits and factual roles from the existing records. Do not generate people, attendance photos or partner logos.
- Alternative accent palettes in the playground: Ice and Ember. These change interface accents and tint the concept artwork; they are not three separate design systems.

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

The isolated `/playground/` route previews Home, Explore and Community as interactive views. It supports activity filters, member cards, mobile navigation, selectable accents and a motion switch. Real signup, Discord and existing detail pages are linked from configured sources; detail pages still use the current design. The prototype makes those boundaries visible in the review panel.

The activity collection describes three formats, not future dated events. Display them as ways to get involved and point to the existing calendar as an archive. The current calendar only covers January-March 2026; do not invent new dates or active registration. Blog content is historical; do not imply its 2025 partnership announcement is a newly verified sponsorship.

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
4. Generate the approved final image set and optimize desktop/mobile formats.
5. Roll out page families on feature branches, build and inspect each batch, and merge only after local review approval.

The detailed plan should resolve date/status/timezone/venue/registration fields in a shared root data file before replacing the hard-coded calendar. It should also identify outdated prose and committee deadlines for owner verification. These are discovered planning inputs, not content changes authorized for this concept.

## Acceptance for this review deliverable

- Next.js static build passes; existing production routes and redirect stubs remain available.
- Screenshot inspection at 1440px and 375px; no horizontal scrolling or obstructed navigation.
- View changes, filters, accent controls, pause control and mobile menu work.
- Visible members follow the existing `promoted` visibility rule.
- No invented event dates, numbers, sponsorship claims or project showcase entries.
- Local preview stays running; branch PR stays open for design approval.

## Review prompts

Decide whether this should feel more experimental or more academic, whether the acid-green direction fits the club, and whether Home / Explore / Community makes the club easy to understand. Then evaluate the mobile layout, action prominence and readability. Approval of the direction precedes the detailed migration plan and production changes.
