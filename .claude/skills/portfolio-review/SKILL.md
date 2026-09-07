---
name: portfolio-review
description: Render the portfolio locally, capture every page, and get a second-model design critique on whether it reads as interesting and distinctive without looking messy. Use when asked to review, critique, or check how the site looks.
---

# Portfolio visual review

Renders the site, captures it, has a second model critique it, then verifies the
findings before reporting. Never report a critique you have not checked yourself.

## 1. Serve it

There is no Node or Python on this machine. Use the Perl server:

```
perl .claude/serve.pl 8099 .
```

Run it with `run_in_background: true`, then confirm with
`curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:8099/`.
`.claude/launch.json` also defines this as `preview_start` config **portfolio**.

## 2. Capture

Two constraints of the preview pane, both learned the hard way:

- **Screenshot capture is pinned to the top of the document.** Scrolling moves the
  page but the capture does not follow, so anything below the fold comes back as a
  blank dark rectangle. It is not a CSS bug - verify with `javascript_tool` before
  believing a blank frame.
- **A taller viewport does not help.** The hero is viewport-height, so the document
  grows with the window.

Shift the document under the fixed capture window instead:

```js
document.body.style.marginTop = '-980px'; scrollTo(0,0);
```

Set `0` to restore. Step the offset (0, -980, -1900, ...) to walk down the page.
Use `resize_window` 1280x900 for desktop and 390x844 for mobile; reset with
preset `desktop` when finished.

Pages to cover: `/`, `/work/winterview-clarifying-questions/`,
`/work/dyne-meetup-creation-flow/`, `/resume/`, `/404`.

## 3. Get a second opinion

Spawn a **sonnet** subagent (`Agent`, `model: "sonnet"`, `subagent_type:
"general-purpose"`). Give it the server URL, the capture constraints above, and
ask it to drive the browser itself. Judge against these, in order:

1. **Does it look considered or decorated?** Effects that serve nothing are worse
   than none. The site's identity is restrained brutalism - hard borders, offset
   shadows, Archivo Black, one accent pair.
2. **Is anything actually broken?** Overflow, collisions, clipped text, images that
   do not load, contrast failures, layout shift.
3. **Consistency across pages.** Nav, spacing rhythm, type scale, radius, and the
   44px gap either side of every section divider.
4. **Does each page have a clear focal point,** or does everything compete?
5. **Mobile.** Especially the work grid, the case-study toggles, and wide artifacts.

Ask for specific, located findings - file and element - not vibes. Ask it to
separate "broken" from "taste".

## 4. Verify before reporting

The subagent starts cold and will sometimes be wrong. For each finding, confirm it
yourself with `javascript_tool` (computed styles, bounding boxes) or a capture
before repeating it to the user. Report what you confirmed, say which findings you
rejected and why, and do not fix anything the user has not agreed to.

## 5. Clean up

Kill the background server, and reset the viewport with `resize_window` preset
`desktop`.
