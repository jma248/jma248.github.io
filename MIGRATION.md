# Six-page migration review

## Baseline recorded before edits

- Source: the current local working copy, not the deployed site.
- Snapshot: `/private/tmp/portfolio-six-page-baseline/`.
- Before-edit source manifest: `/private/tmp/portfolio-six-page-baseline-record.json`.
- Existing local binary/text diff: `/private/tmp/portfolio-existing-local-changes.patch`.
- Before/after screenshots and measurements: `/private/tmp/portfolio-migration-baseline/` and `/private/tmp/portfolio-migration-migrated/`.

### Existing changes retained

```text
 M TESTING.md
 M ascii-earth.js
 D assets/nova-workspace.png
 M index.html
 M journey.js
 M projects/python-practice.html
 M script.js
 M styles.css
?? assets/hibiscus.jpg
?? assets/home-eye-source.png
?? mockups/
?? previews/
?? typography.css
```

The existing deletion of `assets/nova-workspace.png` was not restored or altered. Untracked assets, typography, local copy edits, and the optional prototypes remain as recorded. No git reset, checkout, staging, commit, or push was used.

## Page structure

| Page | URL |
| --- | --- |
| Home | `index.html` |
| About Me | `about.html` |
| Projects | `projects.html` |
| Skills | `skills.html` |
| Experience | `experience.html` |
| Contact | `contact.html` |
| Python Practice | `projects/python-practice.html` |

## Implementation

- The existing section markup was moved verbatim, with only internal page-link destinations changed. The Projects dialog moved with its page.
- Each page has its own document title/description. Shared `styles.css`, `typography.css`, fonts, images, and theme code are byte-for-byte unchanged from the approved local baseline.
- The header/footer retain their existing markup and visual styling; links are native HTML page URLs and each page declares its current navigation item.
- `navigation-init.js` maps the page filename before paint and redirects old Home-document section hashes, including hash changes while already on Home.
- `script.js` keeps the menu, focus recovery, skip link, reveals, Home pause and filters; single-document routing was replaced by native navigation.
- `page-state.js` preserves per-page choices between internal visits and the shared butterfly pause choice. Home resumes its completed intro instead of replaying on every return. Reloading a page gives its fresh default state. Storage failure falls back to in-memory choices.
- Feature changes are confined to initialization/state adapters in the existing eye, Home, hands, computer, Earth, journey, and butterfly scripts. Drawing geometry and timing logic were preserved.
- Python Practice retains its original content/styles/exercises; only Back to projects now targets `../projects.html`.
- CSS rules remain unchanged, including responsive sizes, font hierarchy, themes, and reduced-motion behavior.

## Verification

- All 22 final functional groups pass; see `migration/verification.json` for case-level evidence.
- All 48 normalized static screenshots match byte-for-byte; see `migration/visual-comparison.json`. Measurements, fonts, colors and layout match the approved local baseline.
- Six page documents plus the existing Python page, all six shared links/current-page markers, unique IDs, preserved moved content and every local asset/link/fragment passed static checks.
- All seven local Mobile Navigation Lighthouse Accessibility scores are 100; Home CLS is 0. Reports are under `lighthouse/migration/`.
- The initial Home Performance measurements were 47 versus 43 on the untouched local baseline; a later controlled migrated median was 85. These are historical Performance diagnostics. The professor requires Accessibility ≥90, and all seven page audits scored 100. T45’s optional Performance goal is not an Accessibility failure or a rubric publication blocker; no animations were removed to change the score.
- Existing assets, styles, typography, theme script, optional prototype files and historical reports remain byte-for-byte unchanged from the before-edit manifest. Python HTML changed only its Back destination.
- Existing local changes listed above remain unstaged and were not reverted. Historical reports are untouched; the migrated pages are not deployed.

## Review and remaining issues

Preview: `http://127.0.0.1:9335/`. Current main totals are 49 Pass, 1 optional non-rubric Performance diagnostic Fail, and 0 Not Tested; Contact keyboard checks and owner-confirmed email tests are complete. Optional drafts remain 35 Not Tested. All 85 cases remain. Original case evidence is preserved in the [versioned pre-migration testing record](https://github.com/jma248/jma248.github.io/blob/2d13d1f9878cd456bf9213ea30f73147f14fd9a7/TESTING.md); duplicate local snapshots, backup copies and machine-specific manifests are excluded from publication.

Canvas drawing code, shapes, palettes and timing math are preserved; initialization adapters restore clocks and user choices between real document visits. The legacy hash-only redirect edge case found during testing was fixed. Initial test-client timing, viewport, off-screen-canvas and browser-disconnection issues were rerun with verified final evidence rather than counted as website failures.

The test browser’s motion frames and native focus/scrollbar state were normalized only for static screenshot comparisons; normal/reduced-motion and keyboard behavior were tested separately. Browser emulation is not physical-device or screen-reader certification. Known unweighted accessible-name warnings remain; no unrelated design/accessibility rewrite was made.

No git staging, commit or push has been performed. A live deployment check remains pending until the owner approves publication.

## Publication review clarification — 2026-11-07

The approved local typography and Contact Earth layout predate the migration but are required dependencies of the current design. Publish `typography.css`, the current `styles.css` and the page/animation adapters together; publishing only the new HTML files would not preserve the reviewed appearance. The two Projects images have since been optimized below 500 KB without changing dimensions; see `migration/image-optimization-verification.json`.

Include the seven page-specific local Accessibility reports and the functional, visual, Contact and image verification records. Exclude the seven optional HTML drafts and their supporting assets, the unused eye source, local baseline/backup artifacts and temporary Performance-experiment reports. Leave the unrelated pre-existing `assets/nova-workspace.png` deletion unstaged. Existing tracked dependencies and historical Lighthouse reports remain in the repository.

This review prepares a publication set only. No GitHub settings, staging, commit, push or deployment has been performed. All seven required Accessibility audits pass; the optional Performance goal is informational. The published site must be checked again after approval and deployment.
