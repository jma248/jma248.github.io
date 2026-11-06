# Portfolio Test Plan

## Scope and evidence

This plan follows AGENTS.md and the testing requirements supplied by the owner. No separate professor’s rubric was found in the repository; this document does not claim to cover additional unseen requirements.

Live base URL: https://jma248.github.io/. Resolve hash URLs below against that base. The five required pages are Home, About Me, Projects, Skills, and Contact. They are implemented as sections in `index.html`, shown one at a time by `script.js`. Experience is a sixth section. `projects/python-practice.html` is a separate project page. Preview/mockup files are not part of the public navigation.

The cases match the inspected HTML and JavaScript. The hamburger menu is the first interactive feature tested; the Projects category filter is designated the second for this plan. Other real interactions receive additional coverage. Existing local edits may differ from the deployed site; record the tested URL, commit, browser/version, viewport, date, and tester when executing a case.

## Actual HTML file inventory and assignment gap

The repository currently contains **nine HTML files**. Sections such as `#about` are not separate HTML documents. The tracked public pages and the local prototypes are listed separately so none is omitted from this plan.

| HTML file | Repository status and purpose | Test coverage |
| --- | --- | --- |
| `index.html` | Tracked portfolio document; six sections | T01–T06, T08–T19, T22–T27, T29–T43, T45–T47 |
| `projects/python-practice.html` | Tracked standalone project document | T07, T20–T21, T28, T32, T35, T44 |
| `mockups/blossom.html` | Untracked local prototype; not assumed deployed | T48–T52 |
| `mockups/borders.html` | Untracked local prototype; not assumed deployed | T53–T57 |
| `mockups/light-options.html` | Untracked local prototype; not assumed deployed | T58–T62 |
| `mockups/lilies.html` | Untracked local prototype; not assumed deployed | T63–T67 |
| `mockups/monograms.html` | Untracked local prototype; not assumed deployed | T68–T72 |
| `previews/butterflies.html` | Untracked local prototype; not assumed deployed | T73–T77 |
| `previews/fonts.html` | Untracked local prototype; not assumed deployed | T78–T82 |

**Assignment gap:** AGENTS.md names five required pages: Home, About Me, Projects, Skills, and Contact. The existing implementation provides those areas inside one HTML document, plus a standalone Python project. If five separate HTML documents are required by the professor, the current file structure does not meet that condition. Testing sections does not establish compliance with a separate-page requirement. No website files are created or redesigned as part of this testing-plan task.

The seven prototype pages are included in the tests below even though they are untracked and absent from the public navigation. Run their cases on a local HTTP preview (for example, `http://127.0.0.1:8000/` if that is the server in use), not an assumed live URL. Do not publish prototypes just to run these tests. Each prototype has its own Back link rather than the shared portfolio navigation; test the controls that actually exist on that page. “Not Tested” applies to every added case.

## Requirements coverage

| Requirement supplied by the owner | Cases |
| --- | --- |
| Every navigation link on every actual HTML page | T01–T07, T32–T34, and each prototype navigation case below |
| Phone and laptop layouts on every HTML page | T08–T21 and each prototype phone/laptop case below |
| Mobile hamburger menu | T29; keyboard coverage in T22–T27 |
| Second JavaScript feature: project category filters | T30 |
| Tab and Enter on every HTML page | T22–T28 and each prototype keyboard case below |
| Lighthouse Accessibility ≥90 on every HTML page | T38–T44 and each prototype Lighthouse case below; only Home currently verified |
| Contact links and project links | T07, T32–T34 |

## How to record results

- **Pass:** The steps were performed and the expected result was verified.
- **Fail:** The steps were performed and an expected result was not met; add reproduction details and evidence.
- **Not Tested:** The complete case has not been performed. Source inspection alone is not a passing browser test.
- Results are verified only by the evidence identified for each case: the saved homepage Lighthouse reports or the live browser session below. Partial checks do not establish a Pass for an entire multi-step case. A verified failure can fail a case before its remaining steps are completed.
- Test at 390 × 844 and 320 × 823 for phones, and 1440 × 900 for laptops. These are browser CSS-pixel viewport sizes, not claims of physical-device testing. Check both themes where available. Use Chrome DevTools device mode for screen-size checks and a keyboard for focus checks.
- Lighthouse’s automated Accessibility score does not replace keyboard testing or a manual accessibility review. The recorded 100 scores apply only to the audited homepage.

## Verified homepage reports

Both reports identify `https://jma248.github.io/#home` as the requested URL and `https://jma248.github.io/` as the final URL. Both use Lighthouse 13.5.0 and have no runtime error.

| Evidence | Before | After |
| --- | --- | --- |
| File | `lighthouse/index-before.json` | `lighthouse/index-after.json` |
| Capture time (UTC) | 2026-11-06 03:23:00.380 | 2026-11-06 03:47:04.616 |
| Performance | 73 | 99 |
| Accessibility | 100 | 100 |
| Best Practices | 96 | 100 |
| SEO | 100 | 100 |
| CLS | 0.89951008021503 | 0 |
| Recorded layout shifts | 2: `main#main`, `p.home-bio` | 0 |
| Console errors | Missing `favicon.ico` (404) | None recorded |

These are historical measurements, not a fresh test of every current local change. The after report still flags render-blocking resources, short cache lifetimes, font dependency chains, JavaScript execution time, and main-thread work; passing the score targets does not mean every diagnostic is resolved.

## Test cases

For shared navigation cases, test every listed destination independently from the specified starting section. For responsive and keyboard cases, open all expandable content so hidden project cards or demos are not overlooked.

| Test ID | What is being tested | Steps to run the test | Expected result | Actual result (Pass / Fail / Not Tested) |
| --- | --- | --- | --- | --- |
| T01 | All shared navigation links from Home | Open `#home`. At laptop width, activate Home, About, Skills, Projects, Experience, Contact, the JA logo, and BACK TO HOME. Return to `#home` before each activation. Repeat at phone width, opening Menu first. | Every link opens its matching section; logo/footer return Home; hash and active link update; only the selected section is visible. The mobile menu closes after selection. | Pass — 16/16 link activations verified from #home, at 1440×900 and 390×844; correct hash, visible section, active link and menu closure. |
| T02 | All shared navigation links from About Me | Open `#about`. At laptop width, activate Home, About, Skills, Projects, Experience, Contact, the JA logo, and BACK TO HOME. Return to `#about` before each activation. Repeat at phone width, opening Menu first. | Every link opens its matching section; logo/footer return Home; hash and active link update; only the selected section is visible. The mobile menu closes after selection. | Pass — 16/16 link activations verified from #about, at 1440×900 and 390×844; correct hash, visible section, active link and menu closure. |
| T03 | All shared navigation links from Projects | Open `#projects`. At laptop width, activate Home, About, Skills, Projects, Experience, Contact, the JA logo, and BACK TO HOME. Return to `#projects` before each activation. Repeat at phone width, opening Menu first. | Every link opens its matching section; logo/footer return Home; hash and active link update; only the selected section is visible. The mobile menu closes after selection. | Pass — 16/16 link activations verified from #projects, at 1440×900 and 390×844; correct hash, visible section, active link and menu closure. |
| T04 | All shared navigation links from Skills | Open `#skills`. At laptop width, activate Home, About, Skills, Projects, Experience, Contact, the JA logo, and BACK TO HOME. Return to `#skills` before each activation. Repeat at phone width, opening Menu first. | Every link opens its matching section; logo/footer return Home; hash and active link update; only the selected section is visible. The mobile menu closes after selection. | Pass — 16/16 link activations verified from #skills, at 1440×900 and 390×844; correct hash, visible section, active link and menu closure. |
| T05 | All shared navigation links from Experience | Open `#experience`. At laptop width, activate Home, About, Skills, Projects, Experience, Contact, the JA logo, and BACK TO HOME. Return to `#experience` before each activation. Repeat at phone width, opening Menu first. | Every link opens its matching section; logo/footer return Home; hash and active link update; only the selected section is visible. The mobile menu closes after selection. | Pass — 16/16 link activations verified from #experience, at 1440×900 and 390×844; correct hash, visible section, active link and menu closure. |
| T06 | All shared navigation links from Contact | Open `#contact`. At laptop width, activate Home, About, Skills, Projects, Experience, Contact, the JA logo, and BACK TO HOME. Return to `#contact` before each activation. Repeat at phone width, opening Menu first. | Every link opens its matching section; logo/footer return Home; hash and active link update; only the selected section is visible. The mobile menu closes after selection. | Pass — 16/16 link activations verified from #contact, at 1440×900 and 390×844; correct hash, visible section, active link and menu closure. |
| T07 | Python Practice navigation | Open `projects/python-practice.html`. Activate Back to projects, Try the interactive exercises, and API & SQLite code. Return to the notebook before each test. | Back opens `index.html#projects`; anchors reach exercise-1 and exercise-8. This page has its own links, not the shared six-link header. | Pass — Back to projects and both exercise anchors reached their expected destinations. |
| T08 | Home: phone layout | Open `#home` at 390 × 844 CSS pixels, then 320 × 823. Scroll through all content; expand any collection, code details, or demo available on this page. Repeat in light and burgundy themes where supported. | Text, images, controls, and footer fit the viewport; no page-level horizontal overflow or overlapping content; links remain usable. Long code may scroll within its own panel. | Pass — Live Chrome: Home, 390×844 and 320×823, both themes; full-page screenshots visually reviewed; no observed layout overlap or page-level horizontal overflow; visible images loaded. Completed intro and final text reviewed. |
| T09 | Home: laptop layout | Open `#home` at 1440 × 900 CSS pixels. Scroll through the whole page and open its expandable content. Repeat in both themes where supported. | Content remains readable and aligned; no clipping or overlap; existing fonts, colors, layout, and animations are preserved. | Pass — Live Chrome: Home, 1440×900, both themes; full-page screenshots visually reviewed; no observed layout overlap or page-level horizontal overflow; visible images loaded. Completed intro and final text reviewed. |
| T10 | About Me: phone layout | Open `#about` at 390 × 844 CSS pixels, then 320 × 823. Scroll through all content; expand any collection, code details, or demo available on this page. Repeat in light and burgundy themes where supported. | Text, images, controls, and footer fit the viewport; no page-level horizontal overflow or overlapping content; links remain usable. Long code may scroll within its own panel. | Pass — Live Chrome: About, 390×844 and 320×823, both themes; full-page screenshots visually reviewed; no observed layout overlap or page-level horizontal overflow; visible images loaded. |
| T11 | About Me: laptop layout | Open `#about` at 1440 × 900 CSS pixels. Scroll through the whole page and open its expandable content. Repeat in both themes where supported. | Content remains readable and aligned; no clipping or overlap; existing fonts, colors, layout, and animations are preserved. | Pass — Live Chrome: About, 1440×900, both themes; full-page screenshots visually reviewed; no observed layout overlap or page-level horizontal overflow; visible images loaded. |
| T12 | Projects: phone layout | Open `#projects` at 390 × 844 CSS pixels, then 320 × 823. Scroll through all content; expand any collection, code details, or demo available on this page. Repeat in light and burgundy themes where supported. | Text, images, controls, and footer fit the viewport; no page-level horizontal overflow or overlapping content; links remain usable. Long code may scroll within its own panel. | Pass — Live Chrome: Projects, 390×844 and 320×823, both themes; full-page screenshots visually reviewed; no observed layout overlap or page-level horizontal overflow; visible images loaded. Expanded project cards and open demo also reviewed. |
| T13 | Projects: laptop layout | Open `#projects` at 1440 × 900 CSS pixels. Scroll through the whole page and open its expandable content. Repeat in both themes where supported. | Content remains readable and aligned; no clipping or overlap; existing fonts, colors, layout, and animations are preserved. | Pass — Live Chrome: Projects, 1440×900, both themes; full-page screenshots visually reviewed; no observed layout overlap or page-level horizontal overflow; visible images loaded. Expanded project cards and open demo also reviewed. |
| T14 | Skills: phone layout | Open `#skills` at 390 × 844 CSS pixels, then 320 × 823. Scroll through all content; expand any collection, code details, or demo available on this page. Repeat in light and burgundy themes where supported. | Text, images, controls, and footer fit the viewport; no page-level horizontal overflow or overlapping content; links remain usable. Long code may scroll within its own panel. | Pass — Live Chrome: Skills, 390×844 and 320×823, both themes; full-page screenshots visually reviewed; no observed layout overlap or page-level horizontal overflow; visible images loaded. |
| T15 | Skills: laptop layout | Open `#skills` at 1440 × 900 CSS pixels. Scroll through the whole page and open its expandable content. Repeat in both themes where supported. | Content remains readable and aligned; no clipping or overlap; existing fonts, colors, layout, and animations are preserved. | Pass — Live Chrome: Skills, 1440×900, both themes; full-page screenshots visually reviewed; no observed layout overlap or page-level horizontal overflow; visible images loaded. |
| T16 | Experience: phone layout | Open `#experience` at 390 × 844 CSS pixels, then 320 × 823. Scroll through all content; expand any collection, code details, or demo available on this page. Repeat in light and burgundy themes where supported. | Text, images, controls, and footer fit the viewport; no page-level horizontal overflow or overlapping content; links remain usable. Long code may scroll within its own panel. | Pass — Live Chrome: Experience, 390×844 and 320×823, both themes; full-page screenshots visually reviewed; no observed layout overlap or page-level horizontal overflow; visible images loaded. |
| T17 | Experience: laptop layout | Open `#experience` at 1440 × 900 CSS pixels. Scroll through the whole page and open its expandable content. Repeat in both themes where supported. | Content remains readable and aligned; no clipping or overlap; existing fonts, colors, layout, and animations are preserved. | Pass — Live Chrome: Experience, 1440×900, both themes; full-page screenshots visually reviewed; no observed layout overlap or page-level horizontal overflow; visible images loaded. |
| T18 | Contact: phone layout | Open `#contact` at 390 × 844 CSS pixels, then 320 × 823. Scroll through all content; expand any collection, code details, or demo available on this page. Repeat in light and burgundy themes where supported. | Text, images, controls, and footer fit the viewport; no page-level horizontal overflow or overlapping content; links remain usable. Long code may scroll within its own panel. | Pass — Live Chrome: Contact, 390×844 and 320×823, both themes; full-page screenshots visually reviewed; no observed layout overlap or page-level horizontal overflow; visible images loaded. |
| T19 | Contact: laptop layout | Open `#contact` at 1440 × 900 CSS pixels. Scroll through the whole page and open its expandable content. Repeat in both themes where supported. | Content remains readable and aligned; no clipping or overlap; existing fonts, colors, layout, and animations are preserved. | Pass — Live Chrome: Contact, 1440×900, both themes; full-page screenshots visually reviewed; no observed layout overlap or page-level horizontal overflow; visible images loaded. |
| T20 | Python Practice: phone layout | Open `projects/python-practice.html` at 390 × 844 CSS pixels, then 320 × 823. Scroll through all content; expand any collection, code details, or demo available on this page. Repeat in light and burgundy themes where supported. | Text, images, controls, and footer fit the viewport; no page-level horizontal overflow or overlapping content; links remain usable. Long code may scroll within its own panel. | Pass — Live Chrome: Python Practice, 390×844 and 320×823, the page’s existing single theme; full-page screenshots visually reviewed; no observed layout overlap or page-level horizontal overflow; visible images loaded. All eight code disclosures expanded; code overflow stayed inside scrollable panels. |
| T21 | Python Practice: laptop layout | Open `projects/python-practice.html` at 1440 × 900 CSS pixels. Scroll through the whole page and open its expandable content. Repeat in both themes where supported. | Content remains readable and aligned; no clipping or overlap; existing fonts, colors, layout, and animations are preserved. | Pass — Live Chrome: Python Practice, 1440×900, the page’s existing single theme; full-page screenshots visually reviewed; no observed layout overlap or page-level horizontal overflow; visible images loaded. All eight code disclosures expanded; code overflow stayed inside scrollable panels. |
| T22 | Home: Tab and Enter navigation | Open `#home`. Use Tab and Shift+Tab through every visible link and control, then Enter to activate each link/button. Use Space for checkboxes. On phone width, open Menu with Enter. Open and close available details/dialogs using the keyboard. | Focus is visible and follows a logical order; all actions work without a mouse; hidden sections are skipped; no unexpected focus trap. Escape closes menus/dialogs; dialog focus returns to its opener. | Pass — 390×844: all shared navigation + logo/footer, theme, skip link, mobile Menu/Enter/Escape where present, and page-specific controls activated with Tab/Enter/Space. 1440×900: all shared navigation + logo/footer, theme, skip link, mobile Menu/Enter/Escape where present, and page-specific controls activated with Tab/Enter/Space. Visible focus traversal separately inspected; no hidden-section stops. Space used for native checkboxes. |
| T23 | About Me: Tab and Enter navigation | Open `#about`. Use Tab and Shift+Tab through every visible link and control, then Enter to activate each link/button. Use Space for checkboxes. On phone width, open Menu with Enter. Open and close available details/dialogs using the keyboard. Also reach Skip to content using Tab/Shift+Tab and press Enter from this section. | Focus is visible and follows a logical order; all actions work without a mouse; hidden sections are skipped; no unexpected focus trap. Escape closes menus/dialogs; dialog focus returns to its opener. Skip to content must keep the current section visible while moving focus into main content. | Pass — Live commit 5180ec3 verification: 390×844: shared links/menu/theme/skip, eye pause/resume and Enter blink with pixel contraction/reopening, butterflies and project link passed. 1440×900: shared links/menu/theme/skip, eye pause/resume and Enter blink with pixel contraction/reopening, butterflies and project link passed. See the continuation-session evidence below. |
| T24 | Projects: Tab and Enter navigation | Open `#projects`. Use Tab and Shift+Tab through every visible link and control, then Enter to activate each link/button. Use Space for checkboxes. On phone width, open Menu with Enter. Open and close available details/dialogs using the keyboard. Also reach Skip to content using Tab/Shift+Tab and press Enter from this section. | Focus is visible and follows a logical order; all actions work without a mouse; hidden sections are skipped; no unexpected focus trap. Escape closes menus/dialogs; dialog focus returns to its opener. Skip to content must keep the current section visible while moving focus into main content. | Pass — Live commit 5180ec3 verification: 390×844: shared links, skip/hash, menu/theme, hands checkbox, collection, all filters, modal controls/focus containment, project destinations, footer butterfly control passed. 1440×900: shared links, skip/hash, menu/theme, hands checkbox, collection, all filters, modal controls/focus containment, project destinations, footer butterfly control passed. See the continuation-session evidence below. |
| T25 | Skills: Tab and Enter navigation | Open `#skills`. Use Tab and Shift+Tab through every visible link and control, then Enter to activate each link/button. Use Space for checkboxes. On phone width, open Menu with Enter. Open and close available details/dialogs using the keyboard. Also reach Skip to content using Tab/Shift+Tab and press Enter from this section. | Focus is visible and follows a logical order; all actions work without a mouse; hidden sections are skipped; no unexpected focus trap. Escape closes menus/dialogs; dialog focus returns to its opener. Skip to content must keep the current section visible while moving focus into main content. | Pass — Live commit 5180ec3 verification: 390×844: all shared navigation + logo/footer, theme, skip link, mobile Menu/Enter/Escape where present, and page-specific controls activated with Tab/Enter/Space. 1440×900: all shared navigation + logo/footer, theme, skip link, mobile Menu/Enter/Escape where present, and page-specific controls activated with Tab/Enter/Space. Visible focus traversal separately inspected; no hidden-section stops. Space used for native checkboxes. See the continuation-session evidence below. |
| T26 | Experience: Tab and Enter navigation | Open `#experience`. Use Tab and Shift+Tab through every visible link and control, then Enter to activate each link/button. Use Space for checkboxes. On phone width, open Menu with Enter. Open and close available details/dialogs using the keyboard. Also reach Skip to content using Tab/Shift+Tab and press Enter from this section. | Focus is visible and follows a logical order; all actions work without a mouse; hidden sections are skipped; no unexpected focus trap. Escape closes menus/dialogs; dialog focus returns to its opener. Skip to content must keep the current section visible while moving focus into main content. | Pass — Live commit 5180ec3 verification: 390×844: all shared navigation + logo/footer, theme, skip link, mobile Menu/Enter/Escape where present, and page-specific controls activated with Tab/Enter/Space. 1440×900: all shared navigation + logo/footer, theme, skip link, mobile Menu/Enter/Escape where present, and page-specific controls activated with Tab/Enter/Space. Visible focus traversal separately inspected; no hidden-section stops. Space used for native checkboxes. See the continuation-session evidence below. |
| T27 | Contact: Tab and Enter navigation | Open `#contact`. Use Tab and Shift+Tab through every visible link and control, then Enter to activate each link/button. Use Space for checkboxes. On phone width, open Menu with Enter. Open and close available details/dialogs using the keyboard. Also reach Skip to content using Tab/Shift+Tab and press Enter from this section. | Focus is visible and follows a logical order; all actions work without a mouse; hidden sections are skipped; no unexpected focus trap. Escape closes menus/dialogs; dialog focus returns to its opener. Skip to content must keep the current section visible while moving focus into main content. | Not Tested — Live commit 5180ec3 verification: 390×844: shared navigation, skip/hash, SVG focus, résumé Enter download, GitHub/LinkedIn link activation, and motion/Earth/butterfly controls passed; email-compose/external-page contents unverified. 1440×900: shared navigation, skip/hash, SVG focus, résumé Enter download, GitHub/LinkedIn link activation, and motion/Earth/butterfly controls passed; email-compose/external-page contents unverified. See the continuation-session evidence below. |
| T28 | Python Practice: Tab and Enter navigation | Open `projects/python-practice.html`. Use Tab and Shift+Tab through Back to projects, the notebook download, both exercise anchors, all Python code summaries, and all exercise inputs, Run example, and Reset inputs buttons. Activate links/buttons/summaries with Enter; type in the inputs. | Focus stays visible and logical; links, code disclosures, form submission, and reset work without a mouse; no focus trap. This standalone page has no hamburger menu or modal dialog. | Pass — 390×844: typed into every exercise field using Tab/Input.insertText; all six Run/Reset buttons, eight code disclosures open/close, both anchors, notebook download and Back link activated with Tab/Enter. 1440×900: typed into every exercise field using Tab/Input.insertText; all six Run/Reset buttons, eight code disclosures open/close, both anchors, notebook download and Back link activated with Tab/Enter. Visible focus was checked during the prior traversal (46 phone / 35 laptop stops, including scrollable code panels). |
| T29 | Mobile hamburger menu — first JavaScript feature | At 390 × 844, open Home and click Menu twice. Open it again and press Escape. Reopen and select Projects. Resize above and below 650px while a navigation link is focused. | Menu opens/closes; aria-expanded matches visibility; Escape returns focus to Menu; selection closes it. Desktop navigation stays visible and resizing never leaves focus on a hidden control. | Pass — Click toggle, Escape/focus return, Projects selection and 650px breakpoint focus recovery passed. |
| T30 | Project filters — second JavaScript feature | Open Projects and expand the create folder. Activate All, Coding Projects, Designs, Web Design, then All again. Repeat with Tab and Enter. | All shows 3 cards; Coding Projects shows Palletizer and Python Practice; Designs shows Donut Poster; Web Design shows the empty message. Selected aria-pressed and the live project count match the result. | Pass — Pointer and Enter verified: All 3 → Coding 2 → Designs 1 → Web 0/empty → All 3; counts and aria-pressed correct. |
| T31 | Palletizer Watch demo | In the Projects collection, activate Watch demo. Observe the box moving from conveyor to pallet. Pause, resume, close with the close button, reopen, then press Escape. | Dialog opens; simulated pick/lift/place sequence runs; pause/resume works; both close methods work; focus returns to Watch demo. This is the website simulation, not a live Viam connection. | Pass — Observed stages: 01 / Grip the box, 02 / Lift from the conveyor, 03 / Move above the pallet, 04 / Lower onto the pallet, 05 / Release the box, 06 / Return for the next box; pause froze box, resume/close/Escape and focus return verified. |
| T32 | Project destinations and downloads | From Projects, open View simulation image, the Donut Poster image, View full design, and Try interactive exercises. On Python Practice, activate Download original notebook. | Images open without a 404; both poster links show the correct design; the Python page opens and its notebook downloads. New-tab links leave the portfolio available. | Pass — assets/viam-palletizer.png HTTP 200 and new-tab destination verified; assets/canva-donut-poster.jpeg HTTP 200 and new-tab destination verified; assets/canva-donut-poster.jpeg HTTP 200 and new-tab destination verified; Python link opened correct page; notebook downloaded and parsed as JSON. |
| T33 | Contact email links | Open Contact and activate the text-list and graphic email links. Confirm the compose window addresses jma248@njit.edu; do not send a message. | Both links open the intended email-compose action without sending a message. | Not Tested — owner explicitly reports Email links: Not Tested. Earlier href checks do not verify the native compose action. |
| T34 | Other internal project links | Activate Home’s Explore my work, About’s See my projects, and Experience’s See my Palletizer project. Return to the source section before each activation. | Each link opens Projects and updates the URL hash; page focus moves to the destination section. | Pass — All three project links reached Projects and moved focus there; Home tested after the four-second intro. |
| T35 | Python interactive exercises | Open Python Practice. In exercise 1 enter 20, 25, 30 with threshold 24 and choose Run example. Use Reset inputs. In each of exercises 2–6 change valid inputs, run, reset, then try empty/invalid inputs. | Exercise 1 counts 2 days above 24; all six demos update their own result; reset restores defaults; invalid inputs produce validation feedback. Exercises 7–8 remain documented examples, with no live API calls expected. | Pass — Exercises 1–6: valid calculations matched independent values, resets restored original fields, empty fields blocked, invalid data produced errors. Exercises 7–8 remain static examples (deployed source inspected). |
| T36 | Light/burgundy theme toggle | On each of the six main sections, switch themes with the header toggle. Reload and navigate between sections. | Existing light and burgundy palettes switch correctly; the choice persists when browser storage is available; text and controls remain legible and focused controls remain visible. | Pass — Both themes switched and persisted after reload in all six sections; screenshot review at phone/laptop widths confirmed legible text and controls. Focus styling checked separately; Contact icons use a custom visible circle stroke. |
| T37 | Animation controls and reduced motion | Check Home pause/resume and Skip intro; About eye blink/pause; Skills computer pause; Projects hands pause; Experience NJIT/Viam/Kyndryl controls and pause; Contact Earth pause; footer butterfly pause outside Home. Repeat with reduced motion enabled. | Controls affect their intended animation; interactive eye blinks; experience readout matches selection; reduced-motion behavior remains usable; butterflies do not appear on Home. No animation is removed by testing. | Pass — Live commit 5180ec3 verification: Phone and laptop: all five canvases evolve normally, pause to stable frames, resume; intro Skip and Home butterfly exclusion; journey selection/CSS pause/resume; Contact CSS pause/resume; butterfly pause/resume. With reduced motion, all canvases freeze, CSS animations stop and journey selection remains usable. Frame hashes retained in evidence. See the continuation-session evidence below. |
| T38 | Home: Lighthouse Accessibility ≥90 | Open the live `#home` directly. Run Lighthouse Navigation with Mobile and Accessibility selected. Confirm the intended section is visible before the run; check the final report screenshot/URL and save a separately named report. | Accessibility is at least 90/100 for this section; review any reported issues. A homepage report does not verify other sections. | Pass — before 100/100; after 100/100, verified in the saved homepage reports. |
| T39 | About Me: Lighthouse Accessibility ≥90 | Open the live `#about` directly. Run Lighthouse Navigation with Mobile and Accessibility selected. Confirm the intended section is visible before the run; check the final report screenshot/URL and save a separately named report. | Accessibility is at least 90/100 for this section; review any reported issues. A homepage report does not verify other sections. | Pass — Accessibility 100/100; Chrome Lighthouse Navigation, Mobile 412×823, Accessibility only; correct displayed URL and captured section/page verified. Report: [about-accessibility-mobile.json](lighthouse/about-accessibility-mobile.json); UTC 2026-11-06T04:55:13.328Z. See the latest audit evidence and unweighted findings below. |
| T40 | Projects: Lighthouse Accessibility ≥90 | Open the live `#projects` directly. Run Lighthouse Navigation with Mobile and Accessibility selected. Confirm the intended section is visible before the run; check the final report screenshot/URL and save a separately named report. | Accessibility is at least 90/100 for this section; review any reported issues. A homepage report does not verify other sections. | Pass — Accessibility 100/100; Chrome Lighthouse Navigation, Mobile 412×823, Accessibility only; correct displayed URL and captured section/page verified. Report: [projects-accessibility-mobile.json](lighthouse/projects-accessibility-mobile.json); UTC 2026-11-06T04:56:43.660Z. See the latest audit evidence and unweighted findings below. |
| T41 | Skills: Lighthouse Accessibility ≥90 | Open the live `#skills` directly. Run Lighthouse Navigation with Mobile and Accessibility selected. Confirm the intended section is visible before the run; check the final report screenshot/URL and save a separately named report. | Accessibility is at least 90/100 for this section; review any reported issues. A homepage report does not verify other sections. | Pass — Accessibility 100/100; Chrome Lighthouse Navigation, Mobile 412×823, Accessibility only; correct displayed URL and captured section/page verified. Report: [skills-accessibility-mobile.json](lighthouse/skills-accessibility-mobile.json); UTC 2026-11-06T04:56:50.121Z. See the latest audit evidence and unweighted findings below. |
| T42 | Experience: Lighthouse Accessibility ≥90 | Open the live `#experience` directly. Run Lighthouse Navigation with Mobile and Accessibility selected. Confirm the intended section is visible before the run; check the final report screenshot/URL and save a separately named report. | Accessibility is at least 90/100 for this section; review any reported issues. A homepage report does not verify other sections. | Pass — Accessibility 100/100; Chrome Lighthouse Navigation, Mobile 412×823, Accessibility only; correct displayed URL and captured section/page verified. Report: [experience-accessibility-mobile.json](lighthouse/experience-accessibility-mobile.json); UTC 2026-11-06T04:56:56.171Z. See the latest audit evidence and unweighted findings below. |
| T43 | Contact: Lighthouse Accessibility ≥90 | Open the live `#contact` directly. Run Lighthouse Navigation with Mobile and Accessibility selected. Confirm the intended section is visible before the run; check the final report screenshot/URL and save a separately named report. | Accessibility is at least 90/100 for this section; review any reported issues. A homepage report does not verify other sections. | Pass — Accessibility 100/100; Chrome Lighthouse Navigation, Mobile 412×823, Accessibility only; correct displayed URL and captured section/page verified. Report: [contact-accessibility-mobile.json](lighthouse/contact-accessibility-mobile.json); UTC 2026-11-06T04:57:02.281Z. See the latest audit evidence and unweighted findings below. |
| T44 | Python Practice: Lighthouse Accessibility ≥90 | Open the live `/projects/python-practice.html`. Run Lighthouse Mobile Accessibility and save its report. | Accessibility is at least 90/100 on the separate project page. | Pass — Accessibility 100/100; Chrome Lighthouse Navigation, Mobile 412×823, Accessibility only; correct displayed URL and captured section/page verified. Report: [python-practice-accessibility-mobile.json](lighthouse/python-practice-accessibility-mobile.json); UTC 2026-11-06T04:57:08.264Z. See the latest audit evidence and unweighted findings below. |
| T45 | Homepage Lighthouse category scores | Read `lighthouse/index-before.json` and `lighthouse/index-after.json`; verify requestedUrl/finalUrl and inspect categories. | After scores meet: Performance ≥90, Accessibility ≥90, Best Practices ≥90, SEO ≥90. | Pass — before: 73 / 100 / 96 / 100; after: 99 / 100 / 100 / 100 (Performance / Accessibility / Best Practices / SEO). |
| T46 | Homepage CLS regression | In both saved reports, inspect audits.cumulative-layout-shift.numericValue and audits.layout-shifts.details.items. For future releases, rerun a mobile homepage audit and compare. | CLS ≤0.10; no unexpected jump in main#main or p.home-bio. | Pass — before 0.89951008021503 (failed target; 2 shifts); after 0 (no recorded shifts). |
| T47 | Homepage favicon / console errors | Inspect errors-in-console in both saved reports. For future releases, reload Home with DevTools Network and Console open and check favicon.ico. | No missing-favicon 404 or browser console errors. | Pass — before report records favicon.ico 404; after report has no console-error items and audit score 1. |

## Additional cases for every local prototype HTML page

Use the local preview base URL for these paths. Run each case independently and retain evidence before changing its status.

| Test ID | What is being tested | Steps to run the test | Expected result | Actual result (Pass / Fail / Not Tested) |
| --- | --- | --- | --- | --- |
| T48 | `mockups/blossom.html`: navigation and controls | Open `mockups/blossom.html` locally. Activate every anchor, including Back (`../index.html`), returning to this page before each activation. Exercise five bloom options and Replay entrance. | Every link reaches its declared destination without a missing local page; existing selectors, replay, pause, or display controls respond where present. No shared six-link navigation is assumed. | Not Tested |
| T49 | `mockups/blossom.html`: phone layout | Open `mockups/blossom.html` locally at 390 × 844, then 320 × 823 CSS pixels. Scroll the full document and exercise every available option. | Text, artwork, links, and controls remain readable and usable; no page-level horizontal overflow, clipping, or overlapping controls. | Not Tested |
| T50 | `mockups/blossom.html`: laptop layout | Open `mockups/blossom.html` locally at 1440 × 900 CSS pixels. Scroll the full page and exercise every available option. | Artwork, labels, and controls remain aligned and readable without unwanted clipping or overlap. | Not Tested |
| T51 | `mockups/blossom.html`: Tab and Enter navigation | Open `mockups/blossom.html` locally. Tab and Shift+Tab through every anchor and available button/input. Activate links/buttons with Enter and checkboxes with Space. | Visible focus follows a logical order; every interactive control works with the keyboard; no focus trap. A static artwork sample does not need to receive focus. | Not Tested |
| T52 | `mockups/blossom.html`: Lighthouse Accessibility ≥90 | Open `mockups/blossom.html` through the local HTTP preview. Run Lighthouse Mobile Accessibility, verify the report URL and screenshot, and save a report named for this HTML file. | Accessibility is at least 90/100 for this individual HTML document. The saved homepage reports cannot verify this page. | Not Tested |
| T53 | `mockups/borders.html`: navigation and controls | Open `mockups/borders.html` locally. Activate every anchor, including Back (`../index.html`), returning to this page before each activation. Exercise five frame options and View light mode. | Every link reaches its declared destination without a missing local page; existing selectors, replay, pause, or display controls respond where present. No shared six-link navigation is assumed. | Not Tested |
| T54 | `mockups/borders.html`: phone layout | Open `mockups/borders.html` locally at 390 × 844, then 320 × 823 CSS pixels. Scroll the full document and exercise every available option. | Text, artwork, links, and controls remain readable and usable; no page-level horizontal overflow, clipping, or overlapping controls. | Not Tested |
| T55 | `mockups/borders.html`: laptop layout | Open `mockups/borders.html` locally at 1440 × 900 CSS pixels. Scroll the full page and exercise every available option. | Artwork, labels, and controls remain aligned and readable without unwanted clipping or overlap. | Not Tested |
| T56 | `mockups/borders.html`: Tab and Enter navigation | Open `mockups/borders.html` locally. Tab and Shift+Tab through every anchor and available button/input. Activate links/buttons with Enter and checkboxes with Space. | Visible focus follows a logical order; every interactive control works with the keyboard; no focus trap. A static artwork sample does not need to receive focus. | Not Tested |
| T57 | `mockups/borders.html`: Lighthouse Accessibility ≥90 | Open `mockups/borders.html` through the local HTTP preview. Run Lighthouse Mobile Accessibility, verify the report URL and screenshot, and save a report named for this HTML file. | Accessibility is at least 90/100 for this individual HTML document. The saved homepage reports cannot verify this page. | Not Tested |
| T58 | `mockups/light-options.html`: navigation and controls | Open `mockups/light-options.html` locally. Activate every anchor, including Back (`../index.html`), returning to this page before each activation. Exercise Rich flowers, Floral edges, and Pause motion. | Every link reaches its declared destination without a missing local page; existing selectors, replay, pause, or display controls respond where present. No shared six-link navigation is assumed. | Not Tested |
| T59 | `mockups/light-options.html`: phone layout | Open `mockups/light-options.html` locally at 390 × 844, then 320 × 823 CSS pixels. Scroll the full document and exercise every available option. | Text, artwork, links, and controls remain readable and usable; no page-level horizontal overflow, clipping, or overlapping controls. | Not Tested |
| T60 | `mockups/light-options.html`: laptop layout | Open `mockups/light-options.html` locally at 1440 × 900 CSS pixels. Scroll the full page and exercise every available option. | Artwork, labels, and controls remain aligned and readable without unwanted clipping or overlap. | Not Tested |
| T61 | `mockups/light-options.html`: Tab and Enter navigation | Open `mockups/light-options.html` locally. Tab and Shift+Tab through every anchor and available button/input. Activate links/buttons with Enter and checkboxes with Space. | Visible focus follows a logical order; every interactive control works with the keyboard; no focus trap. A static artwork sample does not need to receive focus. | Not Tested |
| T62 | `mockups/light-options.html`: Lighthouse Accessibility ≥90 | Open `mockups/light-options.html` through the local HTTP preview. Run Lighthouse Mobile Accessibility, verify the report URL and screenshot, and save a report named for this HTML file. | Accessibility is at least 90/100 for this individual HTML document. The saved homepage reports cannot verify this page. | Not Tested |
| T63 | `mockups/lilies.html`: navigation and controls | Open `mockups/lilies.html` locally. Activate every anchor, including Back (`../index.html`), returning to this page before each activation. Exercise five lily options, Replay, and Pause motion. | Every link reaches its declared destination without a missing local page; existing selectors, replay, pause, or display controls respond where present. No shared six-link navigation is assumed. | Not Tested |
| T64 | `mockups/lilies.html`: phone layout | Open `mockups/lilies.html` locally at 390 × 844, then 320 × 823 CSS pixels. Scroll the full document and exercise every available option. | Text, artwork, links, and controls remain readable and usable; no page-level horizontal overflow, clipping, or overlapping controls. | Not Tested |
| T65 | `mockups/lilies.html`: laptop layout | Open `mockups/lilies.html` locally at 1440 × 900 CSS pixels. Scroll the full page and exercise every available option. | Artwork, labels, and controls remain aligned and readable without unwanted clipping or overlap. | Not Tested |
| T66 | `mockups/lilies.html`: Tab and Enter navigation | Open `mockups/lilies.html` locally. Tab and Shift+Tab through every anchor and available button/input. Activate links/buttons with Enter and checkboxes with Space. | Visible focus follows a logical order; every interactive control works with the keyboard; no focus trap. A static artwork sample does not need to receive focus. | Not Tested |
| T67 | `mockups/lilies.html`: Lighthouse Accessibility ≥90 | Open `mockups/lilies.html` through the local HTTP preview. Run Lighthouse Mobile Accessibility, verify the report URL and screenshot, and save a report named for this HTML file. | Accessibility is at least 90/100 for this individual HTML document. The saved homepage reports cannot verify this page. | Not Tested |
| T68 | `mockups/monograms.html`: navigation and controls | Open `mockups/monograms.html` locally. Activate every anchor, including Back (`../index.html`), returning to this page before each activation. Exercise the displayed monogram designs (this page has no buttons). | Every link reaches its declared destination without a missing local page; existing selectors, replay, pause, or display controls respond where present. No shared six-link navigation is assumed. | Not Tested |
| T69 | `mockups/monograms.html`: phone layout | Open `mockups/monograms.html` locally at 390 × 844, then 320 × 823 CSS pixels. Scroll the full document and exercise every available option. | Text, artwork, links, and controls remain readable and usable; no page-level horizontal overflow, clipping, or overlapping controls. | Not Tested |
| T70 | `mockups/monograms.html`: laptop layout | Open `mockups/monograms.html` locally at 1440 × 900 CSS pixels. Scroll the full page and exercise every available option. | Artwork, labels, and controls remain aligned and readable without unwanted clipping or overlap. | Not Tested |
| T71 | `mockups/monograms.html`: Tab and Enter navigation | Open `mockups/monograms.html` locally. Tab and Shift+Tab through every anchor and available button/input. Activate links/buttons with Enter and checkboxes with Space. | Visible focus follows a logical order; every interactive control works with the keyboard; no focus trap. A static artwork sample does not need to receive focus. | Not Tested |
| T72 | `mockups/monograms.html`: Lighthouse Accessibility ≥90 | Open `mockups/monograms.html` through the local HTTP preview. Run Lighthouse Mobile Accessibility, verify the report URL and screenshot, and save a report named for this HTML file. | Accessibility is at least 90/100 for this individual HTML document. The saved homepage reports cannot verify this page. | Not Tested |
| T73 | `previews/butterflies.html`: navigation and controls | Open `previews/butterflies.html` locally. Activate every anchor, including Back (`../index.html#skills`), returning to this page before each activation. Exercise Gold on burgundy, Burgundy on cream, actual-size checkbox, and Pause flutter. | Every link reaches its declared destination without a missing local page; existing selectors, replay, pause, or display controls respond where present. No shared six-link navigation is assumed. | Not Tested |
| T74 | `previews/butterflies.html`: phone layout | Open `previews/butterflies.html` locally at 390 × 844, then 320 × 823 CSS pixels. Scroll the full document and exercise every available option. | Text, artwork, links, and controls remain readable and usable; no page-level horizontal overflow, clipping, or overlapping controls. | Not Tested |
| T75 | `previews/butterflies.html`: laptop layout | Open `previews/butterflies.html` locally at 1440 × 900 CSS pixels. Scroll the full page and exercise every available option. | Artwork, labels, and controls remain aligned and readable without unwanted clipping or overlap. | Not Tested |
| T76 | `previews/butterflies.html`: Tab and Enter navigation | Open `previews/butterflies.html` locally. Tab and Shift+Tab through every anchor and available button/input. Activate links/buttons with Enter and checkboxes with Space. | Visible focus follows a logical order; every interactive control works with the keyboard; no focus trap. A static artwork sample does not need to receive focus. | Not Tested |
| T77 | `previews/butterflies.html`: Lighthouse Accessibility ≥90 | Open `previews/butterflies.html` through the local HTTP preview. Run Lighthouse Mobile Accessibility, verify the report URL and screenshot, and save a report named for this HTML file. | Accessibility is at least 90/100 for this individual HTML document. The saved homepage reports cannot verify this page. | Not Tested |
| T78 | `previews/fonts.html`: navigation and controls | Open `previews/fonts.html` locally. Activate every anchor, including Back (`../index.html#home`), returning to this page before each activation. Exercise titlecase, tight, and large checkboxes. | Every link reaches its declared destination without a missing local page; existing selectors, replay, pause, or display controls respond where present. No shared six-link navigation is assumed. | Not Tested |
| T79 | `previews/fonts.html`: phone layout | Open `previews/fonts.html` locally at 390 × 844, then 320 × 823 CSS pixels. Scroll the full document and exercise every available option. | Text, artwork, links, and controls remain readable and usable; no page-level horizontal overflow, clipping, or overlapping controls. | Not Tested |
| T80 | `previews/fonts.html`: laptop layout | Open `previews/fonts.html` locally at 1440 × 900 CSS pixels. Scroll the full page and exercise every available option. | Artwork, labels, and controls remain aligned and readable without unwanted clipping or overlap. | Not Tested |
| T81 | `previews/fonts.html`: Tab and Enter navigation | Open `previews/fonts.html` locally. Tab and Shift+Tab through every anchor and available button/input. Activate links/buttons with Enter and checkboxes with Space. | Visible focus follows a logical order; every interactive control works with the keyboard; no focus trap. A static artwork sample does not need to receive focus. | Not Tested |
| T82 | `previews/fonts.html`: Lighthouse Accessibility ≥90 | Open `previews/fonts.html` through the local HTTP preview. Run Lighthouse Mobile Accessibility, verify the report URL and screenshot, and save a report named for this HTML file. | Accessibility is at least 90/100 for this individual HTML document. The saved homepage reports cannot verify this page. | Not Tested |
| T83 | Contact GitHub links | Open Contact and activate the GitHub links in the text list and connection graphic. | Links open Jana’s GitHub profile at https://github.com/jma248. | Pass — owner-reported manual result: GitHub links Pass. Report received 2026-11-06 (America/New_York); test browser, viewport and execution time were not supplied. |
| T84 | Contact LinkedIn links | Open Contact and activate the LinkedIn links in the text list and connection graphic. | Links open Jana’s LinkedIn profile at https://www.linkedin.com/in/jana-shoueeb/. | Pass — owner-reported manual result: LinkedIn links Pass. Report received 2026-11-06 (America/New_York); test browser, viewport and execution time were not supplied. |
| T85 | Contact résumé download | Open Contact and activate Download my résumé. Verify the downloaded file. | Jana-Abo-Shoueeb-Resume.pdf downloads and is a valid PDF. | Pass — preserved prior browser evidence from the former combined T33: the résumé downloaded with the expected filename and PDF signature; keyboard download was also verified at phone/laptop widths. This is not a newly performed manual test. |

## Executed live browser session

- **Tester/method:** Codex automated Chrome DevTools Protocol checks, with visual review of browser screenshots. Browser: **Chrome/157.0.8103.39**, headless on macOS. Native mouse clicks and Tab, Shift+Tab, Enter, Escape, and Space events were used; JavaScript inspected DOM state and provided test setup. Python exercise text-entry checks used the browser’s text-input command. No website source was edited.
- **Tool availability:** Installed Chrome and its DevTools interface were available and used. A Node REPL tool was discoverable but was not needed. No standalone `node`, `nodejs`, `bun`, `deno`, or `lighthouse` command was available on PATH; no libraries were installed. No fresh Lighthouse run is claimed.
- **Target:** https://jma248.github.io/ and https://jma248.github.io/projects/python-practice.html, including the six live section hashes. Local working copies were not served for these tests. The exact deployed Git commit was not independently established; deployed source fingerprints appear below.
- **Session interval (UTC):** 2026-11-06T03:58:46.631466+00:00 through 2026-11-06T04:11:31.308883+00:00. The UTC date may be the following day compared with the owner’s New York evening.
- **Viewports:** phone 390×844 and 320×823; laptop 1440×900 CSS pixels. Responsive cases used all three; navigation/keyboard cases used 390×844 and 1440×900. These are browser emulations, not physical-device or cross-browser certification.
- **Themes:** both existing themes checked on the main portfolio; Python Practice checked in its existing single theme.
- **Evidence storage:** observed states, values, and reproduction steps are recorded here. Full-page screenshots, source snapshots, downloaded verification files, and temporary browser logs were stored under `/private/tmp/` during execution; they are temporary and are not included in this commit or required to read the findings below.

| Previous live-run status (before the local F01 fix) | Count | Evidence scope |
| --- | ---: | --- |
| Pass | 34 | 30 completed live browser cases plus 4 historical homepage Lighthouse cases |
| Fail | 5 | Five keyboard cases affected by one reproduced skip-link defect (F01) |
| Not Tested | 43 | Unperformed or incomplete cases; partial observations do not count as Pass |
| Total | 82 | All original test IDs retained |

### Verified observations

| Coverage | Evidence and observed result |
| --- | --- |
| T01–T06: shared navigation | 16 independent link activations per source section: all six navigation links, logo, and footer link at phone and laptop widths. All 96 checked activations reached the correct hash and visible section, updated the current-link state, and closed the mobile menu where applicable. |
| T07: separate HTML navigation | Python Practice’s two exercise anchors reached exercise-1 and exercise-8; Back to projects opened `index.html#projects`. |
| T08–T21: responsive layouts | Full-page screenshot review covered every published HTML document and all six portfolio sections. Phone document widths were 320/390px at their respective viewports; desktop scroll widths were 1425px (space reserved for the vertical scrollbar) or 1440px, never wider than the 1440px viewport. Visible images loaded. Projects were reviewed with the collection expanded and the demo open in both themes at all sizes; all eight notebook code disclosures were expanded. Home was additionally reviewed after the intro finished. Long Python code remains horizontally scrollable inside its own panels, rather than widening the page. |
| T22: Home keyboard | Tab/Enter activated every shared navigation link, logo/footer, theme, skip link, work link, and intro/motion controls at 390×844 and 1440×900. Menu opened with Enter and closed with Escape on mobile. |
| T23–T27: other section keyboard | Tab traversal checked visible controls. A dedicated Tab/Enter skip-link reproduction failed from each of the five non-home sections at both sizes; remaining actions are not implied to pass. Contact’s SVG focus indicator was verified separately: keyboard focus produced a 2px circle stroke and changed fill; it intentionally does not use a conventional outline. |
| T28: Python keyboard | 390×844: typed into every exercise field using Tab/Input.insertText; all six Run/Reset buttons, eight code disclosures open/close, both anchors, notebook download and Back link activated with Tab/Enter. 1440×900: typed into every exercise field using Tab/Input.insertText; all six Run/Reset buttons, eight code disclosures open/close, both anchors, notebook download and Back link activated with Tab/Enter. Visible focus was checked during the prior traversal (46 phone / 35 laptop stops, including scrollable code panels). |
| T29: menu | Click open/close, Escape and focus return, Projects selection, and focus recovery across the 650px breakpoint passed. |
| T30: second JavaScript feature | Mouse and Enter activation yielded All=3, Coding=2, Designs=1, Web Design=0 with empty-state text, then All=3 again. Live count and aria-pressed agreed. The deployed Python card title is “Python Fundamentals & Data Practice”; the plan’s “Python Practice” refers to this same project and destination. |
| T31: demo | Observed Grip → Lift → Move above pallet → Lower → Release → Return. Pause held the box transform constant; resume, close button, Escape, and focus return to Watch demo passed. These are website simulation results, not a live Viam connection. |
| T32: project links | Both image destinations returned HTTP 200 and opened matching new-tab URLs. Python project link reached its standalone page. Notebook download completed and parsed as JSON. |
| T33: partial Contact check | Both email hrefs target `mailto:jma248@njit.edu`; both GitHub hrefs target `https://github.com/jma248`; both LinkedIn hrefs target `https://www.linkedin.com/in/jana-shoueeb/`. Résumé downloaded as `Jana-Abo-Shoueeb-Resume.pdf` with a valid PDF signature. Actual external-profile loading and the mail-app compose action were not verified, so this case stays Not Tested. The live contact icons are in the earlier SVG panel; the Earth-orbit layout exists only in unrelated local edits. |
| T34: contextual project links | Home, About, and Experience project links reached Projects and moved focus there. Home was tested after its intended intro delay, not while pointer interaction was temporarily disabled. |
| T35: Python calculations | Valid exercise inputs produced: 2 hot days; score average 75.00; inventory value $6.00; combined list [3, 2, 1]; longest word elephant; and matrix rows [3, 3, 3]. Each of six forms restored defaults with Reset, rejected empty required fields, and reported invalid data. Exercises 7–8 remain documented examples, without live API testing. |
| T36: theme persistence | Both themes switched and persisted after reload in all six sections; normal text and controls remained legible in the reviewed screenshots. |

### F01 — Skip to content changes the selected section to Home

**Affected cases:** T23, T24, T25, T26, T27. **Affected implementation:** `script.js`, specifically `sectionFromHash()` and the `hashchange` handler; the skip-link markup is in `index.html` (`href="#main"`). This is one defect reproduced in five contexts, not five unrelated defects.

**Reproduction:** Open `#about`, `#projects`, `#skills`, `#experience`, or `#contact`. Reach Skip to content with Tab/Shift+Tab and press Enter. Repeat at 390×844 and 1440×900. The expected behavior is to keep the selected section and move focus into its main content.

**Actual result in all ten reproductions:** `location.hash` becomes `#main`, `document.activeElement.id` becomes `home`, and the visible section IDs become `["home"]`. The hash-change handler passes `#main` through section lookup; since it is not one of the section IDs, lookup falls back to the first section (Home) and focuses it. Home itself does not switch sections when using the skip link. No fix was made during this test session.

### Cases that remain unverified

- **T33:** mail application behavior and full external-profile loading remain unverified despite the destination and résumé checks above.
- **T37:** not all animation/reduced-motion combinations were executed. Individual controls covered elsewhere do not establish a Pass for this combined case.
- **T39–T44:** no new per-section or standalone Python Lighthouse Accessibility reports were generated. The four historical homepage cases (T38, T45–T47) retain their original evidence and are not a fresh audit of this browser session.
- **T48–T82:** local untracked prototype pages were outside this live-site execution; all stay Not Tested. They were not published to enable testing.

### Deployed source fingerprints (SHA-256)

These identify the deployed source snapshots inspected during this run without assuming they match uncommitted local edits.

| Deployed source | SHA-256 |
| --- | --- |
| `index.html` | `7bcb90e2d4aabb4bbc473549dc85af0d6647e166bb26ac8e54e3515a307adf13` |
| `script.js` | `bb54a82d1899ba76ad5c040fa568ea426fd5880e0fb399eb97e1542898cb3bcb` |
| `styles.css` | `7ad0a2be03a2a182c918239fa03ba5bcb6bea05558a48fd4c4f62b63e10ad294` |
| `projects/python-playground.js` | `35f2148499bfd224df2fb23691abdc6ea9765c612d6fbe2ea628d3d833cdd733` |

## F01 local fix and regression retest

The earlier live-run failure above is historical evidence. The fix was verified locally before commit preparation; post-deployment verification on the live site remains outstanding.

**Code change:** `script.js` now handles ordinary activation of `.skip-link` separately from section-navigation links. It prevents the default `#main` anchor navigation, finds the currently visible section, makes that section programmatically focusable with `tabindex="-1"`, focuses it, and scrolls it into view. It does not write the URL, invoke section selection, or add a browser history entry. Modified clicks retain native behavior. The existing section navigation, CSS, theme, and animation code are unchanged.

**Browser verification:** Chrome/157.0.8103.39 through Chrome DevTools Protocol, against `http://127.0.0.1:8003/`, using the current local website files. Real Shift+Tab/Tab reached the skip link and Enter activated it; DOM inspection then verified focus and state. This is local browser testing, not a new live-site or Lighthouse run.

| Section / initial hash | 390×844 | 320×823 | 1440×900 |
| --- | --- | --- | --- |
| Home / `#home` | Pass | Pass | Pass |
| About / `#about` | Pass | Pass | Pass |
| Projects / `#projects` | Pass | Pass | Pass |
| Skills / `#skills` | Pass | Pass | Pass |
| Experience / `#experience` | Pass | Pass | Pass |
| Contact / `#contact` | Pass | Pass | Pass |
| Home / no hash | Pass | Pass | Pass |

**21/21 regression scenarios passed.** Each scenario verified all of the following:

- Keyboard focus lands on the section that was visible before activation.
- The full URL, including its original hash (or absence of a hash), stays identical.
- Browser history length, document title, current-navigation link, theme, and visible-section IDs remain unchanged.
- No `hashchange` event fires during skip activation.
- The next Tab reaches a control within that same section; no hidden section receives focus.
- Existing keyboard navigation to another section and browser Back still work afterward.

The previously failed results in T23–T27 now explicitly record **F01 regression: Pass locally**, while the overall rows are **Not Tested** because their additional per-control keyboard actions have not all been verified. This avoids treating a targeted bug retest as a complete keyboard audit. All other previously Not Tested rows are unchanged.

| Local F01 retest status (historical) | Count |
| --- | ---: |
| Pass | 34 |
| Fail | 0 |
| Not Tested / incomplete full case | 48 |
| Total original cases | 82 |

The 34 full-case passes retain their original evidence, including the four historical homepage Lighthouse cases. The separate 21 passing F01 checks above are regression scenarios, not 21 additional original test cases. A live-site verification after deployment and fresh Lighthouse accessibility audits remain outstanding. No website design or styling changes were made.

**Tested `script.js` SHA-256:** `2c75ce18d1751039ad4dd1859f2db454d97f127de3a478b0a989519d699bf075`.
**Recorded (UTC):** 2026-11-06T04:16:53.769673+00:00 .

### Exact commit-candidate verification

Before committing, the same 21 keyboard scenarios were repeated against an isolated copy of the tracked website at `http://127.0.0.1:8004/`, with only the skip-link fix applied to `script.js`. **21/21 passed again.** The unrelated local Projects empty-state wording was excluded from this candidate and remains untouched in the working tree. No design or animation files are included. Broader keyboard cases remain incomplete as recorded above.

**Verified commit-candidate `script.js` SHA-256:** `f22a6696a63ce31ab243183544e899bcd9c459069d0eff04b4e621a65910f1c4`. The earlier SHA-256 identifies the full local working copy used in the initial retest; the difference is the excluded unrelated wording edit.

## Live continuation — deployment 5180ec3

**Latest status:** the skip-link fix is now verified on the deployed website. Earlier local-only statements and failure records above describe their dated sessions; they do not describe the current live result.

- **Target:** https://jma248.github.io/, all six section URLs, and the linked Python project page.
- **Browser:** Chrome/157.0.8103.39, headless Chrome through DevTools Protocol on macOS; HTTP source/status checks used Python’s standard library. Cache was disabled for browser requests.
- **Date/time (UTC):** deployment/source check 2026-11-06T04:23:17.494150+00:00; session recorded 2026-11-06T04:38:15.694794+00:00.
- **Viewports:** 390×844 and 320×823 phones; 1440×900 laptop. All three were used for the skip-link/navigation regression; full keyboard and motion cases used 390×844 and 1440×900. Prior responsive screenshot passes remain valid evidence: the deployed HTML/CSS matched the tracked files, with no layout redesign in this deployment. This continuation does not claim a fresh full-page visual audit of every previously passed responsive case.
- **Scope:** only TESTING.md was updated. No website code, design, animation, deployment, or repository history was modified during this session. Browser media emulation affected only the test environment.

### Deployment evidence

The live `index.html`, `script.js`, `styles.css`, `projects/python-practice.html`, and `TESTING.md` were fetched with a verification query string and compared byte-for-byte against Git commit `5180ec3`. **All five matched.** This confirms that the deployed content includes that commit’s skip-link fix and testing document. The public GitHub Pages latest-build API returned HTTP 404, so a build-job ID/commit was not independently available from that API; no build-metadata confirmation is claimed.

| Deployed file matching 5180ec3 | SHA-256 |
| --- | --- |
| `index.html` | `7bcb90e2d4aabb4bbc473549dc85af0d6647e166bb26ac8e54e3515a307adf13` |
| `script.js` | `f22a6696a63ce31ab243183544e899bcd9c459069d0eff04b4e621a65910f1c4` |
| `styles.css` | `7ad0a2be03a2a182c918239fa03ba5bcb6bea05558a48fd4c4f62b63e10ad294` |
| `projects/python-practice.html` | `c25ee8b4ae7362d2e1ee3987814042ce65aeca11b572f71ef680900ac5b1ae46` |
| `TESTING.md` | `786884eae2849c9e5a4077f81b886831fa65c2d4a8e590514508c76c1bd7a1c6` |

### Live skip-link result

**21/21 live regression scenarios passed:** Home, About, Projects, Skills, Experience, Contact, plus Home without a hash, at all three viewport sizes. Shift+Tab/Tab reached the skip link and Enter activated it. Each result verified focus on the existing visible section, identical full URL/hash, unchanged history length/title/theme/current navigation, zero hashchange events, next Tab within the same section, and working navigation/browser Back afterward. F01 is resolved on the live site. These 21 scenarios supplement the 82 original cases; they do not inflate the original-case totals.

### Newly completed cases and additional observations

| Case | Result | Evidence |
| --- | --- | --- |
| T23: About keyboard | Pass | Both phone/laptop sizes: all shared links, logo/footer, menu/theme/skip, eye pause/resume, actual Enter blink, butterflies and project link. The paused eye’s PNG data stayed unchanged; after Enter, rendered alpha in the eye area contracted and then recovered, verifying a blink rather than only a click event. |
| T24: Projects keyboard | Pass | Both sizes: all shared links, skip/hash, hands checkbox via Space, collection disclosure via Enter, all filters, demo pause/resume/close/Escape, image/Python destinations, return link and butterfly control. Both modal buttons were reachable with Tab; after the browser’s focus-cycle boundary, Tab re-entered the dialog. Attempting to focus the background theme button while the native dialog was open was blocked. No background page control accepted focus. An early test-client assumption that a transient BODY focus meant a website failure was corrected and the case rerun; only the final verified result is recorded. |
| T25: Skills keyboard | Pass | Both sizes: all navigation/logo/footer links using Tab/Enter, menu/Enter/Escape, theme, fixed skip link, computer pause checkbox via Space, and butterfly pause/resume. |
| T26: Experience keyboard | Pass | Both sizes: all shared navigation controls and fixed skip link; Space pause/resume; Enter on NJIT/Viam/Kyndryl changed the selected state and produced three distinct readouts; contextual project link and butterfly controls passed. |
| T27: Contact keyboard | Not Tested (incomplete) | Both sizes: shared links, fixed skip/hash, visible SVG focus, résumé download via Enter, GitHub/LinkedIn link activation, and Contact/Earth/butterfly controls verified. Native email-compose behavior and complete external-profile verification remain outstanding. |
| T33: Contact links | Not Tested (incomplete) | Email hrefs were verified earlier without sending a message. This session’s opened external tabs included the correct GitHub account and LinkedIn profile; LinkedIn also produced an authentication wall in one tab. A human should confirm mail-app compose behavior and profile viewing when signed in. This is a verification limitation, not a newly identified portfolio-code failure. |
| T37: animations and reduced motion | Pass | At both sizes, Home, eye, computer, hands and Earth canvases changed while running, became byte-stable while paused, and changed after resume. Home Skip intro revealed the name and butterflies remained excluded from Home. Journey selection and CSS pause/resume, Contact CSS pause/resume, and butterfly pause/resume worked. With reduced motion emulated, all five canvases stayed stable, infinite CSS animations were absent, and journey selection remained usable. The eye’s Enter blink was verified in T23. |

#### Rendered eye evidence

The measurements below sum sampled alpha values in the actual eye canvas. Values dropped during the Enter-triggered blink and recovered after it, at both sizes.

| Viewport | Before Enter | During blink | Reopened |
| --- | ---: | ---: | ---: |
| 390×844 | 108243 | 47020 | 109997 |
| 1440×900 | 103278 | 55023 | 101213 |

#### Motion frame evidence

Each paused hash below identifies a frame that remained identical across the 0.9-second pause observation. Running/resumed frames changed over a 1.1-second observation. Reduced-motion hashes likewise stayed identical over 0.9 seconds; they need not equal the normal paused frame, because reduced motion can render a different settled state.

| Viewport | Section | Normal pause frame SHA-256 prefix | Reduced-motion stable frame SHA-256 prefix |
| --- | --- | --- | --- |
| 390×844 | home | `9a20a495636e` | `861dfef4fdc0` |
| 390×844 | about | `b478b6c0c7b8` | `f35dfb638160` |
| 390×844 | skills | `2942b0cbd09c` | `8a20980fdcff` |
| 390×844 | projects | `f89bb507c682` | `298696493a8b` |
| 390×844 | contact | `86ce4118792c` | `df347ab02dbc` |
| 1440×900 | home | `173b5ea2bc54` | `d735433b0da7` |
| 1440×900 | about | `a3aa99f6020b` | `f35dfb638160` |
| 1440×900 | skills | `340f1d33fa97` | `3e24f4c274b4` |
| 1440×900 | projects | `dfbe3c058124` | `08f5f2212905` |
| 1440×900 | contact | `78043f17cb6d` | `0851e3f6b045` |

### Updated original-case totals

| Status | Count | Meaning |
| --- | ---: | --- |
| Pass | 39 | 35 completed browser cases plus 4 historical saved homepage Lighthouse cases |
| Fail | 0 | No unresolved defect verified in this continuation; the earlier F01 failure remains preserved as historical evidence |
| Not Tested | 43 | 2 incomplete Contact cases, 6 pending Lighthouse cases, and 35 local-prototype cases |
| Total | 82 | Original IDs retained |

### Remaining work and manual checks

- **T27 and T33 — manual/browser-session checks:** activate both email links in a normal browser and confirm the compose window addresses `jma248@njit.edu`; do not send a message. Confirm LinkedIn profile viewing in an appropriate signed-in browser session and the GitHub destination. Headless link activation and URL checks do not substitute for the native mail action.
- **T39–T44 — fresh Lighthouse Accessibility runs:** About, Projects, Skills, Experience, Contact and the separate Python page still need scores. No Lighthouse CLI/runtime was available in this environment and none was installed. Run Chrome DevTools Lighthouse for each intended section/document and verify the captured page before recording a score. The four historical homepage result cases remain unchanged; no fresh homepage score is asserted here.
- **T48–T82 — local prototype cases:** each of the seven prototype URLs was checked and returned HTTP 404 on the live website. These files are untracked local prototypes, not published portfolio pages, so their 35 cases remain Not Tested rather than being reported as live-site failures. They can be tested locally in a separately scoped session without publishing them.

| Prototype URL path checked live | HTTP status |
| --- | ---: |
| `mockups/blossom.html` | 404 |
| `mockups/borders.html` | 404 |
| `mockups/light-options.html` | 404 |
| `mockups/lilies.html` | 404 |
| `mockups/monograms.html` | 404 |
| `previews/butterflies.html` | 404 |
| `previews/fonts.html` | 404 |

**Failures/files requiring changes:** no new website defect was verified in this continuation. `script.js` now passes the deployed F01 checks. Outstanding cases above are unverified or outside the deployed-site scope; they are not evidence that a design or code change is needed. Logs, source snapshots and downloaded verification artifacts remain temporary under `/private/tmp/`; the durable observations and values are recorded in this document. Nothing was committed or pushed.

## Completed Mobile Navigation Accessibility audits

This session completes T39–T44 against the live portfolio. All six scores meet the required **90/100** minimum. These are new saved reports, not reused homepage results.

**Configuration and tools:** official Lighthouse **13.6.0**, running Navigation mode against dedicated Chrome **157.0.8103.39** with **only Accessibility selected**. Actual mobile screen emulation was enabled: **412×823 CSS pixels, device scale factor 1.75, screenEmulation.disabled=false**. Every report has `gatherMode: "navigation"`, `formFactor: "mobile"`, only the `accessibility` category, and a captured full-page screenshot width of 412 pixels. The official runner and its dependencies were prepared under `/private/tmp/` using Node 24.21.0 bundled with VS Code; nothing was installed into the portfolio or added as a website dependency. The preliminary DevTools outputs that did not capture a mobile layout were rejected and were not saved in the repository.

**Section verification:** each requested hash opened the correct visible section before the audit. Each completed report’s `finalDisplayedUrl` still identifies that section, and the post-audit visible-section state agreed. The six captured report screenshots were visually inspected for the correct content. For Python Practice, the separate document URL, its Python heading and its exercise content were verified. The mobile layout was captured during auditing; Lighthouse may restore desktop dimensions afterward, which does not change the captured mobile evidence.

| Test | Page/section | Accessibility | Result | Report JSON | Captured UTC |
| --- | --- | ---: | --- | --- | --- |
| `T39` | About | 100 | Pass | [about-accessibility-mobile.json](lighthouse/about-accessibility-mobile.json) | 2026-11-06T04:55:13.328Z |
| `T40` | Projects | 100 | Pass | [projects-accessibility-mobile.json](lighthouse/projects-accessibility-mobile.json) | 2026-11-06T04:56:43.660Z |
| `T41` | Skills | 100 | Pass | [skills-accessibility-mobile.json](lighthouse/skills-accessibility-mobile.json) | 2026-11-06T04:56:50.121Z |
| `T42` | Experience | 100 | Pass | [experience-accessibility-mobile.json](lighthouse/experience-accessibility-mobile.json) | 2026-11-06T04:56:56.171Z |
| `T43` | Contact | 100 | Pass | [contact-accessibility-mobile.json](lighthouse/contact-accessibility-mobile.json) | 2026-11-06T04:57:02.281Z |
| `T44` | Python Practice | 100 | Pass | [python-practice-accessibility-mobile.json](lighthouse/python-practice-accessibility-mobile.json) | 2026-11-06T04:57:08.264Z |

### Independent-section evidence and audit scope

All five section audits were independently verifiable in Navigation mode, so none had to remain Not Tested. They share the root HTML document, but the report’s **finalDisplayedUrl** preserves `#about`, `#projects`, `#skills`, `#experience`, or `#contact`. Their `mainDocumentUrl` / `finalUrl` may be the root URL because a URL fragment is not sent in the HTML request; that alone does not mean Home was audited. The displayed URLs, visible DOM sections and screenshots were used together to verify the actual content.

| Audit | Requested and final displayed URL | Screenshot content verified |
| --- | --- | --- |
| About | `https://jma248.github.io/#about` | About Me and the coded eye |
| Projects | `https://jma248.github.io/#projects` | Projects heading and create collection |
| Skills | `https://jma248.github.io/#skills` | My Skills cards and coded computer |
| Experience | `https://jma248.github.io/#experience` | Learning / Building / Becoming, journey and timeline |
| Contact | `https://jma248.github.io/#contact` | Let’s Connect, contact links, SVG graphic and Earth |
| Python Practice | `https://jma248.github.io/projects/python-practice.html` | Python Fundamentals & Data Practice heading and exercises |

**Navigation-state limitation:** these audits assess the default state after navigation. The Projects collection starts collapsed; its hidden project cards and unopened demo are not certified by this score. Python code disclosures also begin collapsed. Existing keyboard/interaction cases cover separate behavior; additional expanded-state accessibility checks would require a separate audit and are not claimed here. The screenshots and their node metadata are embedded in each JSON report, so the saved evidence does not depend on temporary screenshot files.

### Findings despite scores of 100

Lighthouse’s `label-content-name-mismatch` audit failed on the main portfolio sections. In these reports that audit has **weight 0**, so it did not reduce the Accessibility category score. The six test cases use the owner’s score threshold and therefore pass; a score of 100 does not establish that every diagnostic passed or that all manual accessibility checks are complete.

| Reports | Flagged HTML element | Reported issue | Affected source |
| --- | --- | --- | --- |
| About, Projects, Skills, Experience, Contact | `header.site-header > a.monogram` with `aria-label="Jana Abo Shoueeb, home"` | Visible J/A label not included in the accessible name according to Lighthouse | `index.html` |
| Projects | `details.create-collection > summary.create-scene` with `aria-label="Open or close my project collection"` | Visible “create / Open collection” text does not match the accessible name | `index.html` |
| Contact | LinkedIn `a.connection-node` inside `svg.contact-network`, with `aria-label="Visit Jana’s LinkedIn"` | Visible SVG text is not included in the accessible name according to Lighthouse | `index.html` |

Python Practice has no failed numerical Accessibility audit in its saved report. No markup or design was changed to address the findings. Manual checks listed by Lighthouse remain separate from these automated scores.

### Original-case totals before the Contact split (historical)

| Status | Count |
| --- | ---: |
| Pass | 45 |
| Fail | 0 |
| Not Tested | 37 |
| Total | 82 |

The 45 passes consist of 35 completed browser cases and 10 Lighthouse-result cases (four historical homepage cases plus these six new audits). “Fail: 0” refers to the original test-case criteria; the unweighted accessible-name findings above remain unresolved. The remaining 37 Not Tested cases are the two incomplete Contact cases (T27, T33) and 35 cases for the seven untracked local prototype files (T48–T82). All other case results are unchanged. No fresh Performance, Best Practices or SEO scores are asserted by these Accessibility-only reports.

**Recorded (UTC):** 2026-11-06T05:00:04.704674+00:00. Only TESTING.md and the six new report JSON files were changed in this task. Nothing was committed or pushed.

## Manual Contact results and split cases

The owner reported these manual results on **2026-11-06 (America/New_York)**: GitHub links **Pass**, LinkedIn links **Pass**, Email links **Not Tested**. Browser, viewport and actual execution time were not provided, so none is inferred. These are owner-reported results; no new browser test was performed for this update.

The former T33 combined email, GitHub, LinkedIn and résumé behavior. It is now split into independently recorded cases: T33 covers email, T83 covers GitHub, T84 covers LinkedIn, and T85 preserves the already verified résumé download. Earlier combined-case observations and totals above remain historical evidence. Every other existing case result is unchanged, including T27: a general manual link result does not establish completion of that full keyboard test.

| Case | Contact check | Result | Evidence source |
| --- | --- | --- | --- |
| `T33` | Email links | Not Tested | Owner explicitly left this untested; prior URL checks remain partial evidence |
| `T83` | GitHub links | Pass | Owner-reported manual result |
| `T84` | LinkedIn links | Pass | Owner-reported manual result |
| `T85` | Résumé download | Pass | Existing verified browser result preserved from the combined case |

### Current totals after splitting Contact links

| Status | Count |
| --- | ---: |
| Pass | 48 |
| Fail | 0 |
| Not Tested | 37 |
| Total | 85 |

Replacing one combined case with four separate cases increases the total from 82 to 85. Passes increase by three: the two owner-confirmed link results and the previously verified résumé sub-result now counted as its own case. The Email case replaces the former combined Not Tested case, so the Not Tested count remains 37. All earlier results outside T33 are unchanged. Website code and design were not changed, and nothing was committed or pushed.
