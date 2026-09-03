# jesseli.design

Source for my portfolio site. Plain HTML/CSS, no build step, no dependencies.

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

The Winterview and Dyne case studies here are written from my own published case studies at jesseli.design/winterview and jesseli.design/dyne. The Zemoso page is still a placeholder: its narrative is written to show how a full case study would read, and I need to replace it with the real story.

On every page, anything underlined with a dashed border (`.flag`) is an open question rather than a confirmed fact, and the note banner at the top of each page says what specifically is unresolved. I need to clear those before the site goes live.

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

Push this repo to GitHub, then connect it to a static host (Cloudflare Pages, GitHub Pages, or Vercel all work with zero config since there's no build step) and point jesseli.design at it via DNS.
