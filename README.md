# jesseli.design

Source for my portfolio site. Plain HTML/CSS, no build step, no dependencies, no JavaScript.

## Structure

```
index.html                                    home page
404.html                                      not-found page
resume/index.html                             résumé
work/
  winterview-clarifying-questions/index.html  case study
  dyne-meetup-creation-flow/index.html        case study
  zemoso-engagement-flow-builder/index.html   placeholder, unlinked from the home grid
assets/
  css/base.css                                reset, tokens, nav, focus, skip link
  css/home.css                                home page styles
  css/case-study.css                          shared case-study styles
  css/resume.css                              résumé styles
  js/enhance.js                               lightbox (progressive enhancement)
  media/toronto.mp4                           hero background video
  media/toronto-poster.jpg                    hero video poster frame
  media/winterview/                           Winterview case-study screenshots
  media/dyne/                                 Dyne case-study screenshots
```

The nav, focus rings, skip link and reduced-motion handling are defined once in `base.css` and
shared by every page, so they cannot drift between them. `404.html` is the one page that uses
root-relative asset paths, because a host serves it for URLs at any depth.

## Case study status

The Winterview and Dyne case studies are written from my own published case studies at
jesseli.design/winterview and jesseli.design/dyne, and the screenshots come from those pages.

The Zemoso page is **not real yet**. Its narrative is placeholder text written to show how a full
case study would read, so its card on the home page is locked rather than clickable and the page
is unlinked. The page is still reachable by direct URL, so it needs `noindex` or to move out of
`work/` before the site goes live.

## Running locally

Every path is relative, so opening `index.html` straight from the filesystem works — CSS, video and
images all load. Serve over HTTP only if you want URLs to match production (`/resume/` rather than
`resume/index.html`):

```
npx serve .
```

or, with Python:

```
python3 -m http.server 8080
```

then visit `http://localhost:8080/`.

## Before it goes live

- **Write the Zemoso case study or drop the card.** Its home-page card still claims a $6.2M project,
  +29% adoption and 25+ features, with no page behind it.
- **Compress the images.** The Dyne screenshots are roughly 19MB and are 4096px wide serving a 952px
  container. Re-export around 1600px.
- **Add a favicon.** There isn't one.
- **Check the résumé against the case studies.** A few numbers disagree — see the notes below.

## Known inconsistencies

My résumé and my case studies don't agree on a few points, and both are public:

- Résumé says adoption rose **33%**; the case study and home page say **34%**.
- Résumé credits **28% CSAT on the Interview feature**; the Clarifying Questions case study reports
  **84% CSAT** on Resume Booster. These are different features and shouldn't be conflated.
- Résumé attributes the **$1.6M seed round to a dashboard analytics feature**, not to the meetup
  creation flow the Dyne case study covers.
- Résumé title is **Senior Product Designer**; the home page says **Product Designer**.

## Deploying

Push this repo to GitHub, then connect it to a static host (Cloudflare Pages, GitHub Pages, or Vercel
all work with zero config since there's no build step) and point jesseli.design at it via DNS.
