# Findings

- The baseline is the approved PR #15 redesign. The previous design branch is merged; a fresh feature branch starts at origin/main.
- UI icons currently mix Unicode arrows/plus/close symbols and custom SVG theme/month controls. These must be migrated together, including playground and return/anchor links.
- Morphicons official documentation specifies morphicons/react, vanilla Lucide IconNode data, SSR SVG output, spring="snappy" and reducedMotion="user". The default animation policy does not honor reduced motion without opt-in.
- Morphicons supplies animation, not a standalone shape catalog. No lucide-react component imports are needed.
- DESIGN.md was written before implementation and records the user-requested icon change plus the approved design baseline.

Sources: https://www.morphicons.com/ and https://github.com/guillermolg00/morphicons (checked 7 October 2026).

- Runtime verification observed 24 distinct SVG path shapes during the action-arrow spring: the animation is produced by Morphicons, not a CSS translation. Parent keyboard focus also changes the shape.
- Theme maps sun/moon and mobile navigation maps menu/close; Escape restores menu focus.
- Desktop Home in Charcoal has zero axe violations/incomplete checks. Mobile Calendar has zero violations and offscreen/clipped grid contrast checks requiring manual review; inspect at desktop and verify existing token contrast.
- Final settled Charcoal and mobile menu screenshots reviewed: icons are crisp monochrome SVGs; approved layout, artwork and navigation remain intact.
- Desktop Calendar has zero axe violations/incomplete checks. Manual token contrast is 6.18:1 for muted text and 5.90:1 for selected-date text. Reduced-motion mode produces one instant arrow path change and disables hero animation.
