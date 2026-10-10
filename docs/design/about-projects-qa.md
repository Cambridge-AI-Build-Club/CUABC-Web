# About and Projects verification

Verified locally on 10 October 2026. Branch: `feature/about-projects`. Local preview: http://localhost:4102/. Awaiting the owner's preview review; not deployed.

The shared header now includes About and Projects, with the menu at widths of 1100px and below. About introduces CBC World; Projects features its captured live screenshot, description, capabilities and live/source links. Both previews read one project record from `_data/projects.yml`. The original body of `about.md` is unchanged.

## Checks performed

- `npm run build` passed with the design policy, TypeScript checks, 25 exported routes and 21 legacy redirect stubs. Local Node: 24.19.0. The implementation commit `b64d70c` also passed the [Node 20 Linux PR build](https://github.com/Cambridge-AI-Build-Club/Cambridge-AI-Build-Club.github.io/actions/runs/38069028222) in 46 seconds.
- Fresh full-page screenshots inspected for About and Projects at 1440px and 375px in Warm Paper and Charcoal. Additional intermediate/breakpoint checks at 903px, 1100px and 1101px. Navigation clears the logo and appearance control immediately above the menu breakpoint.
- No horizontal document overflow or broken images in the checked views. Screenshot renders at its original 1280x720 ratio in both pages and themes. The delivered image is byte-identical to the source capture, 83,376 bytes; its loading and bytes were verified through the local server.
- Header destinations, active-page state, About footer link and project live/source/internal links checked. Project external actions use `noopener noreferrer`; no iframe or WebGL app is loaded on the club pages.
- Keyboard Enter opens the menu; Escape from a menu link closes it and returns visible focus to the toggle. Menu navigation to Projects closes the menu. Project action keyboard focus shows a visible outline and the Morphicons arrow state. Reduced-motion emulation suppresses CSS action transitions and shared UI SVGs remain Morphicons.
- Appearance choice survives page navigation and reloads. Home and Calendar smoke checks passed at the intermediate menu layout; calendar month navigation and session selection update matching details.
- Eight axe-core 4.14.0 scans (About/Projects, desktop/mobile, both themes; WCAG 2 A/AA and 2.1 AA tags) found zero violations and zero incomplete findings. The temporary scan library was removed from each page after the scan; it is not a production dependency. These targeted scans accompany visual and keyboard review, rather than establish a full accessibility certification.
- Nineteen production HTML routes returned HTTP 200 with one h1 each. Projects canonical metadata, sitemap entry and `/CUABC-Web/projects/` redirect checked. Browser log collection found no errors or warnings during the reviewed navigation. `git diff --check` passed.

## Screenshots and evidence

| Surface | Warm Paper | Charcoal |
| --- | --- | --- |
| Projects desktop | [Screenshot](about-projects-2026-10-10/projects-desktop-paper.jpg) | [Screenshot](about-projects-2026-10-10/projects-desktop-charcoal.jpg) |
| Projects mobile | [Screenshot](about-projects-2026-10-10/projects-mobile-paper.jpg) | [Screenshot](about-projects-2026-10-10/projects-mobile-charcoal.jpg) |
| About desktop | [Screenshot](about-projects-2026-10-10/about-desktop-paper.jpg) | [Screenshot](about-projects-2026-10-10/about-desktop-charcoal.jpg) |
| About mobile | [Screenshot](about-projects-2026-10-10/about-mobile-paper.jpg) | [Screenshot](about-projects-2026-10-10/about-mobile-charcoal.jpg) |

[Mobile navigation](about-projects-2026-10-10/mobile-navigation.jpg), [menu boundary at 1100px](about-projects-2026-10-10/projects-1100.jpg), [desktop navigation at 1101px](about-projects-2026-10-10/projects-1101.jpg), [browser and accessibility checks](about-projects-2026-10-10/browser-checks.json), [export checks](about-projects-2026-10-10/export-checks.json).

## Screenshot provenance and URL comparison

The project image is a real screenshot captured on 10 October 2026 from https://cambridge-ai-build-club.github.io/CBC-World/. The original capture and research evidence remain outside the repository in the current chat's `about-projects-research` folder. Its global map counts are shown only as part of the documentary screenshot and are not used as club membership figures.

Both supplied URLs returned byte-identical 2,087-byte HTML (SHA-256 `309582943b05a6f82bafdd328e72163d57d6a25bcc63941c833f518c933cf9a7`) and loaded the same JavaScript/CSS. No query-version switch exists in the reviewed application source. The plain URL is declared in its Open Graph metadata and is used for the new links.

## Publication boundary

A plan approval authorised implementation and this local review build. It did not approve the completed site preview for merge. The pull request stays open until local review approval and a passing PR build; publication/deployment checks have not yet been performed. The legacy Jekyll rollback was not built in this change.
