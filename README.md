# jesseli.design

Source for Jesse Li's portfolio site. Plain HTML/CSS, no build step, no dependencies.

## Structure

```
index.html                                   home page
work/
  winterview-clarifying-questions/index.html  case study
  zemoso-engagement-flow-builder/index.html   case study
  dyne-meetup-creation-flow/index.html        case study
assets/
  css/base.css                                shared reset + typography
  css/home.css                                home page styles
  css/case-study.css                          shared case-study page styles
  media/toronto.mp4                           hero background video
  media/toronto-poster.jpg                    hero video poster frame
```

The three case-study pages are marked as drafts (see the note banner at the top of each) — the role, dates, company, and headline metrics are real, but the problem/process narrative is a placeholder written to show how a full case study would read. Anything underlined with a dashed border on those pages is a guess that needs to be replaced or confirmed with the real story before this goes live.

## Running locally

There's no build step, but the pages use root-relative paths (`/assets/...`), so opening `index.html` directly in a browser won't load the CSS or video correctly — serve the folder over HTTP instead:

```
npx serve .
```

or, with Python:

```
python3 -m http.server 8080
```

then visit `http://localhost:8080/`.

## Deploying

Push this repo to GitHub, then connect it to a static host (Cloudflare Pages, GitHub Pages, or Vercel all work with zero config since there's no build step) and point jesseli.design at it via your DNS settings.
