# Jana Abo Shoueeb — Personal Portfolio

This is my personal portfolio for SDET 103. I’m a Software Data Engineering Technology student at the New Jersey Institute of Technology (NJIT). I made this site to share my projects, what I’m learning, and my interests in design and computers.

- **Live website:** [jma248.github.io](https://jma248.github.io/)
- **GitHub repository:** [jma248/jma248.github.io](https://github.com/jma248/jma248.github.io)

The six-page version described here is complete locally. At the time of this README update, it has not been pushed or deployed, so the live site may still show the earlier version.

## Pages

| Page | File | What’s on it |
| --- | --- | --- |
| Home | [index.html](index.html) | My introduction and an animated code opening that reveals my name. |
| About | [about.html](about.html) | My interests in design and computers, with an interactive eye made from code. |
| Projects | [projects.html](projects.html) | My Viam Palletizer project, Python Practice assignment, and Canva donut poster. |
| Skills | [skills.html](skills.html) | Skills I’m learning and using, with a coded computer animation. |
| Experience | [experience.html](experience.html) | My NJIT studies, Viam 101 training, and Kyndryl AI Collaboration experience. |
| Contact | [contact.html](contact.html) | Email, GitHub, LinkedIn, and résumé links, alongside an animated Earth. |

[Python Practice](projects/python-practice.html) is an extra project page. It includes six browser exercises, saved Python code, and a notebook download. The browser exercises use JavaScript; they do not run Python. The joke example shows saved output, and the news exercise needs an API key to run in the notebook.

## Technologies and features

The website uses **HTML, CSS, and JavaScript**. Canvas and SVG are used for the coded artwork and animations. There is no frontend framework or external JavaScript library to install.

- Responsive layouts for phones and laptops.
- Light and burgundy/dark themes on the six main pages. Python Practice keeps its own dark appearance.
- Animated code, an interactive eye, hands, butterflies, a computer, and Earth, with motion controls and reduced-motion support.
- Project filters for Coding Projects, Designs, and Web Design. Web Design currently has no project cards.
- A mobile menu and consistent navigation between pages.
- Accessibility features including semantic page structure, a Skip to content link, visible keyboard focus, image descriptions, and keyboard controls.
- A Palletizer demo that simulates moving a box. It is not a live Viam connection or a recording of the robot.

## View locally

Clone or download this repository. With Python 3 installed, open a terminal in the repository folder and run:

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

Open [http://127.0.0.1:8000/](http://127.0.0.1:8000/) in your browser. Keep the terminal open while viewing the site, and press **Ctrl+C** to stop the server. No build step or package installation is needed for the website. Google Fonts needs an internet connection; fallback fonts are provided.

## Testing

[TESTING.md](TESTING.md) contains the test cases, steps, results, and evidence. Use your local server address when following its tests; some evidence records the port used during earlier runs.

1. Check navigation on all six pages and the Python Practice page.
2. Check phone sizes of **390×844** and **320×823**, and a laptop size of **1440×900**, using browser device tools.
3. Try both themes, the mobile menu, project filters, animation controls, project links, and contact links.
4. Use **Tab**, **Shift+Tab**, **Enter**, **Space**, and **Escape** to check keyboard access.
5. In Chrome DevTools, open **Lighthouse**, select **Navigation** and **Mobile**, and run the required categories. Confirm the correct page is visible and save the JSON report. Use the same settings when comparing results.
6. Record Pass or Fail only after checking the result. Keep incomplete tests marked Not Tested.

Saved reports are in [lighthouse/](lighthouse/). [lighthouse/migration/](lighthouse/migration/) contains local audits of the six pages and Python Practice. The older `index-before.json` and `index-after.json` describe the published homepage at an earlier stage. Temporary Performance-experiment reports are kept locally and excluded from publication. TESTING.md records their results and the revert. Saved reports are historical measurements, not fresh scores for the current live site.

The professor requires **Lighthouse Accessibility of at least 90 on every page**. All seven saved local page audits scored **100**. The main plan has **49 Pass, 1 optional diagnostic Fail, and 0 Not Tested**. That diagnostic is Home’s previous median Performance score of **85**, below a separate project goal of 90; it is not an Accessibility failure or a rubric requirement. Contact keyboard checks are complete, and I manually confirmed that both email links opened drafts with the correct recipient. I closed both drafts without sending anything. The saved local Accessibility audits scored 100 on all seven pages, but manual review and documented accessible-name warnings still matter. See TESTING.md for details.

The seven HTML files under `mockups/` and `previews/` are optional design drafts, not required portfolio pages. Their 35 unperformed tests remain separate. [MIGRATION.md](MIGRATION.md) explains the page migration and its verification.

## Credits

- [Google Fonts](https://fonts.google.com/) provides Italiana, Cormorant Garamond, Italianno, Manrope, and IBM Plex Mono.
- I made the Donut Poster in [Canva](https://www.canva.com/).
- The Palletizer project and screenshot come from my [Viam](https://www.viam.com/) 101 personal training.
- The decorative background image is stored at `assets/burgundy-lilies.jpg`. Its original source is not recorded in the repository, so that credit still needs to be confirmed.
- The downloadable Python notebook uses [Requests](https://requests.readthedocs.io/) and Python’s built-in `sqlite3` module. Its code examples reference Official Joke API and NewsAPI. The website does not fetch live results from those services.
