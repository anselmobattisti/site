---
name: battisti.com.br
description: The personal and academic record of Anselmo Luiz Éden Battisti — a warm paper reading room for peer-reviewed work.
colors:
  ground: "#f0eade"
  surface: "#fffdf7"
  surface-2: "#f7f1e3"
  ink: "#2b2418"
  ink-soft: "#4f4531"
  muted: "#7d7059"
  rule: "#ddd2b6"
  rule-soft: "#eae2cd"
  accent: "#decc96"
  accent-strong: "#b8963c"
  accent-ink: "#7a5f13"
  accent-deep: "#55400a"
  accent-wash: "#f7f0dc"
  accent-contrast: "#2b2418"
  accent-mark: "#a4822c"
typography:
  display:
    fontFamily: "Roboto, Roboto Fallback, Arial, Helvetica, sans-serif"
    fontSize: "clamp(2.25rem, 4vw, 3rem)"
    fontWeight: 600
    lineHeight: 1.18
    letterSpacing: "-0.01em"
  headline:
    fontFamily: "Roboto, Roboto Fallback, Arial, Helvetica, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "normal"
  title:
    fontFamily: "Roboto, Roboto Fallback, Arial, Helvetica, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 600
    lineHeight: 1.35
    letterSpacing: "normal"
  body:
    fontFamily: "Roboto, Roboto Fallback, Arial, Helvetica, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  label:
    fontFamily: "Roboto, Roboto Fallback, Arial, Helvetica, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0.1em"
rounded:
  sm: "2px"
  full: "50%"
spacing:
  xs: "0.3rem"
  sm: "0.6rem"
  md: "1rem"
  lg: "1.15rem"
  xl: "2.5rem"
  section: "2.75rem"
components:
  button-outline:
    textColor: "{colors.accent-ink}"
    rounded: "{rounded.sm}"
    padding: "0.5rem 0.95rem"
    typography: "label"
  button-outline-hover:
    backgroundColor: "{colors.accent-wash}"
    textColor: "{colors.accent-ink}"
  button-solid:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.accent-contrast}"
    rounded: "{rounded.sm}"
    padding: "0.5rem 0.95rem"
  button-solid-hover:
    backgroundColor: "{colors.accent-strong}"
    textColor: "{colors.accent-contrast}"
  chip:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink-soft}"
    rounded: "{rounded.sm}"
    padding: "0.22rem 0.6rem"
  chip-selected:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.accent-contrast}"
    rounded: "{rounded.sm}"
    padding: "0.22rem 0.6rem"
  topic-tag:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink-soft}"
    rounded: "{rounded.sm}"
    padding: "0.22rem 0.5rem"
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "1rem 1.15rem"
  award-callout:
    backgroundColor: "{colors.accent-wash}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "1rem 1.15rem"
  nav-link:
    textColor: "{colors.ink-soft}"
    padding: "0.38rem 0"
  nav-link-current:
    textColor: "{colors.ink}"
    padding: "0.38rem 0"
  entry-year:
    textColor: "{colors.accent-ink}"
---

# Design System: battisti.com.br

## Overview

**Creative North Star: "The Reading Room"**

A quiet reading room, lit warm. The left rail is the card catalogue — portrait, name,
role, and a column of entries you scan with a finger. The content well is the open volume
on the table. Nothing floats above the table, nothing glows, nothing asks for attention;
the silence is the primary material and the light is warm rather than white.

The register is **sober and precise**. Authority here comes from rigour, not volume: every
value is in its place, every number is tabular, every list is ordered by the key a reader
would actually scan. The visitor is a peer who arrived knowing the name and wanting the
artifact. The design's job is to hand it over without a detour and without a performance.

The warmth is deliberate and it is where the whole system departs from an institutional
PDF. The ground is parchment (`#f0eade`), not white; the accent is a gold drawn out of
that same paper rather than applied on top of it. Someone lives in this room. But the
warmth never becomes decoration: it is the colour temperature of the paper, not an
ornament laid over it.

**Key Characteristics:**

- One typeface (Roboto) carrying display, body, data and label alike.
- A seven-step type scale; no font-size outside it.
- Parchment ground, three tonal surfaces, hairline rules — and no shadows anywhere.
- A single radius: 2px on everything rectangular.
- Gold reserved for structure: where you are, and by what key the list is ordered.
- Justified prose with automatic hyphenation; metadata rows forced back to the left.
- A rail that responds to viewport **height** as well as width.

## Colors

A parchment palette: warm neutrals from paper to soot, with a single gold that belongs to
the paper rather than sitting on it. Light is the authored palette; the dark theme
redefines values only, never components.

### Primary

- **Parchment Gold** (`accent`): the site's tone. Used as a *fill* — the solid primary
  button, the pressed filter chip — never as text on a pale ground, where it cannot carry
  contrast.
- **Burnished Gold** (`accent-strong`): the gold at working strength. Outlines on buttons
  and the award callout, the current-page bullet in the navigation, the `→` on card links.
- **Olive Gold** (`accent-ink`): the link colour and the ordering-key colour. Every
  `a[href]`, the year column in entry lists, the semester headings in Teaching, the DOI
  line. 5.4:1 on the light surface.
- **Deep Olive** (`accent-deep`): the pressed and focused state — link hover, and the 2px
  focus ring with its 3px offset.
- **Structural Gold** (`accent-mark`): a step darker than Burnished specifically so the
  2.5rem bar under each section head clears 3:1 as a graphic element (Burnished measures
  2.77:1 there and does not).
- **Gold Wash** (`accent-wash`): the tinted ground under the award callout and the hover
  fill of outline buttons.

### Neutral

- **Parchment** (`ground`): the page behind the shell.
- **Paper** (`surface`): the shell itself and every raised-by-tone element — cards, chips,
  topic tags.
- **Warm Paper** (`surface-2`): the rail and the diagram frame; the one step of tonal
  separation the system allows.
- **Soot** (`ink`): body text and headings.
- **Soft Soot** (`ink-soft`): the lede, card and award prose, navigation at rest, the
  author's own name bolded inside a byline.
- **Ash** (`muted`): metadata — authors, venue, period, handle, footer, all uppercase labels.
- **Rule** (`rule`): structural hairlines — the rail border, section head underline,
  the stats grid, component outlines.
- **Soft Rule** (`rule-soft`): the repeating divider between list entries and the shell's
  outer edge, one step quieter so a 16-item list does not read as a table.

### Named Rules

**The Ramp Inversion Rule.** `#decc96` is the site's tone but never its text colour on
paper. On the light ground the accent ramp *darkens* away from it (Burnished → Olive →
Deep Olive); in the dark theme the ramp inverts and lightens (`accent-strong` becomes
`#cbb87c`, `accent-ink` becomes `#e3d3a2`, `accent-deep` becomes `#f0e5c4`). A new surface
picks the sibling that meets contrast on its own ground — never `accent` itself for text.

**The Structural Accent Rule.** Gold marks two things and nothing else: **where you are**
(the current nav bullet, the focus ring) and **by what key this list is ordered** (the
year column, the semester heading, the bar under a section head). It never colours running
prose, never fills a decorative area, never tints a whole section.

**The Two-Surface Rule.** There are exactly three tonal levels — Parchment behind,
Paper for the shell, Warm Paper for the rail and framed figures. A fourth surface tone is
not available; anything that needs to read as separate takes a hairline, not a new tint.

## Typography

**Display Font:** Roboto (variable, weights 100–900) with `Roboto Fallback`, then Arial.
**Body Font:** Roboto — the same face.
**Label/Mono Font:** Roboto — the same face again.

**Character:** One neutral grotesque doing every job in the building. Roboto is chosen for
its indifference: it has no period, no attitude, and no opinion about the content, which
is exactly right for a page where a 2014 conference paper and a 2026 course syllabus have
to sit in the same list without one looking more fashionable than the other. Personality
is carried entirely by size, weight, tracking and case.

`Roboto Fallback` is a metric-matched stand-in built from Arial with `size-adjust: 101.35%`,
`ascent-override: 91.53%` and `descent-override: 24.09%`. It exists so text occupies
exactly the same space before the webfont arrives — it is the mechanism that holds CLS at
zero, and it is not optional.

### Hierarchy

- **Display** (600, `clamp(2.25rem, 4vw, 3rem)`, 1.18, `-0.01em`): the `h1`. One per page.
- **Headline** (600, 1.5rem, 1.3): the `h2` of a section head.
- **Title** (600, 1.125rem, 1.35): an entry title in a list, the lede, `.rail-name`.
- **Body** (400, 1rem, 1.6): running prose, capped at 62ch.
- **Label** (400, 0.75rem, 1.4, `0.1em`, uppercase): eyebrows, stat labels, filter legends,
  chips, topic tags, the footer, the `.more` link. Also the non-uppercase small register —
  authors, meta, hours, DOI — at 0.875rem.

### Named Rules

**The One Face Rule.** Roboto carries display, body, data and label alike. Role is
signalled by size, weight, tracking and case, never by a second family. The
`--font-family-display` and `--font-family-data` tokens exist as seams so a display face
could be swapped in from one place — both currently resolve to Roboto, and a new surface
does not get to fill them on its own initiative.

**The Seven Steps Rule.** Every `font-size` comes from the seven scale tokens
(`--text-xs` 0.75rem through `--text-2xl`). Exactly two exceptions exist in the codebase
and no third is authorized: the `body` anchor at 16px, and the labels inside the SVG
diagram, which are measured in `viewBox` units rather than rem.

**The Justified Column Rule.** Prose is justified with `hyphens: auto` — the lede, card
and award copy, timeline descriptions, abstracts. Metadata rows are then forced *back* to
`text-align: left` with `hyphens: manual`: authors, venue, period, organisation, handle,
figure captions, footer. Justification is for sentences; a data row that gets justified
grows rivers and stops scanning. This preference is settled — do not revert it.

## Layout

A two-column shell, `1160px` maximum, centred on the parchment ground and bounded by a
soft hairline on each side. The rail is a fixed `268px`; the content well takes the rest
at `minmax(0, 1fr)` so a long DOI or a wide diagram cannot blow the grid open. Content
padding is `2.5rem`, dropping to `1.25rem` on mobile. Sections are separated by `2.75rem`,
and running prose is capped at `62ch` regardless of how wide the window gets.

The rail's inner block is sticky at `top: 2rem` with `max-height: calc(100vh - 4rem)` and
its own scroll, because a sticky element taller than the viewport cannot stick at all —
it simply scrolls away. Viewport-unit fallbacks are written as `100vh` first and then
`100dvh`/`100svh` inside `@supports` blocks, so the minifier cannot collapse the pair.

Below `860px` the shell becomes one column: the rail turns into a header with a bottom
rule, the portrait and the role detail are dropped, and the nav collapses behind a toggle
sized `min(90vw, 100%)`. Nav items stop being underlined rows and become outlined
pills. Below `620px` the density tightens further.

Vertical rhythm inside lists is carried by a repeating `rule-soft` divider and `0.95rem`
of padding per entry; the entry itself is a two-column grid of `62px` for the ordering key
and `minmax(0, 1fr)` for everything else.

### Named Rules

**The Height Tier Rule.** The rail responds to viewport *height*, not only width. At
`max-height: 760px` the stack gap tightens and the portrait drops to 112px; at `690px` the
rail padding, sticky offset and nav rhythm all compress and the portrait drops to 84px; at
`640px` the portrait and the role detail disappear entirely. Nothing may be added to the
rail without re-checking all three tiers — the failure mode is a scrollbar appearing
inside the rail on a short laptop screen, and it has happened twice.

**The Ordering Key Column Rule.** Every accumulating list puts its ordering key in a
fixed `62px` left column — the year for publications, patents and awards; the semester for
courses. The key is tabular (`font-variant-numeric: tabular-nums`) so the digits line up
down the page. A list without a meaningful key uses `.entry-list--plain` and drops the
column rather than filling it with something decorative.

**The 62ch Rule.** Running prose never exceeds 62 characters per line, on any viewport.
Width is spent on lists, diagrams and metadata, never on longer measure.

## Elevation & Depth

The system is flat. There is not a single `box-shadow` in 1862 lines of CSS — not on cards,
not on the nav toggle, not on the diagram lightbox that overlays the page. Depth is
conveyed entirely by two devices: **tonal layering** across the three surface steps
(Parchment behind the shell, Paper for the shell and its cards, Warm Paper for the rail and
framed figures) and **hairline rules** at 1px, in two weights.

This is the observed state of the implementation, and it is coherent — but it is recorded
as prevalence, not as a prohibition. The author has not made flatness a doctrine, and a
future surface that genuinely needs an element to float may introduce a shadow. If it
does, it is introducing a new vocabulary to a system that currently has none, and it
should say so rather than sneak one shadow onto one card.

## Shapes

Rectangles with the corner just taken off. One radius governs the entire system: `2px`,
in 18 declarations — buttons, chips, topic tags, cards, the award callout, the diagram
frame, the nav toggle, the focus ring, the mobile nav pills. The only other radius is
`50%`, on the two 6px bullets that sit before each navigation item.

Borders are always `1px`, always a rule colour, and they are the primary means of
delineating anything: outline rather than fill, hairline rather than gap. The one
deliberate departure is the award callout, which thickens its left border to `3px` — the
single place in the system where a border carries emphasis instead of just structure.

### Named Rules

**The 2px Rule.** Every rectangular thing takes `2px`. It reads as cut paper rather than
as a software control, and it is what keeps a chip, a card and a button feeling like the
same material. A new component adopts 2px; it does not introduce a second step.

## Components

The governing character is **contained and institutional**: the component's job is to
recede so the information shows. A component is a 1px outline on Paper; solid fill is
spent only where a state must be unmistakable.

Motion across the whole system is one value — `0.15s ease` — and it animates **colour
only**: `color`, `background-color`, `border-color`, `opacity`. Nothing moves, scales,
or lifts. Under `prefers-reduced-motion: reduce` all durations clamp to `0.01ms`.
Page-to-page navigation uses the native cross-document `@view-transition`.

### Buttons

- **Shape:** near-square (`2px` radius), `0.5rem 0.95rem` padding, 0.875rem at weight 500.
- **Outline (default):** 1px Burnished Gold border, Olive Gold text, no fill. Hover and
  focus flood it with Gold Wash and keep the text colour.
- **Solid (primary):** Parchment Gold fill with Soot text. Hover deepens the fill to
  Burnished Gold. Selectors are written `a[href].btn-solid` deliberately — a plain
  `.btn-solid` (0,0,1,0) loses to the base `a[href]` rule (0,0,1,1) and the label reverts
  to link colour on the gold fill.
- **One per group.** A hero action row carries at most one solid button; the rest are
  outlines.

### Chips

- **Style:** Paper background, 1px Rule border, `2px` radius, 0.75rem label type,
  `0.22rem 0.6rem` padding. Used as filters on the publications and teaching lists.
- **Hover:** border shifts to Burnished Gold; nothing else changes.
- **Pressed (`aria-pressed="true"`):** Parchment Gold fill and border, Soot text. This is
  one of only two places in the system that take a solid accent fill.

### Topic tags

Non-interactive siblings of the chip — same Paper ground, same border and radius, slightly
tighter padding (`0.22rem 0.5rem`). They list research topics and never respond to hover,
because they are not controls.

### Cards / Containers

- **Corner:** `2px`. **Border:** 1px Rule. **Background:** Paper. **Padding:** `1rem 1.15rem`.
- **Shadow:** none — see Elevation & Depth.
- **Grid:** two columns; a lone final card spans both rather than sitting half-width.
- **Heading:** 1rem at 600, and its link appends a Burnished Gold ` →` via `::after`.
  Underline appears on hover with a 3px offset, never at rest.

### Entry list

The signature component, and the one the site is mostly made of. A `62px` tabular ordering
key in Olive Gold, then title (1.125rem, 600), byline, and a metadata row. The site
owner's own name inside the byline is lifted to Soft Soot at weight 600 so a reader
scanning a 16-item list can find his position in each author order without reading it.
Rows are divided by a Soft Rule hairline and separated by `0.95rem` of padding — there is
no line *above* the first row of a group, and no fill, no card, no hover background.

### Navigation

Uppercase is not used here; nav items are 0.875rem in Soft Soot, one per row, divided by
Soft Rule hairlines, each preceded by a 6px hollow bullet. The current page takes Soot at
weight 600 and fills its bullet with Burnished Gold — the dot is the only "you are here"
signal and it needs no other. Hover shifts text to Olive Gold. On mobile the rows become
outlined pills inside a toggle-controlled panel, and the submenu indents behind a 1px
left rule.

### Award callout

A tinted Gold Wash panel with a Burnished Gold border whose left edge thickens to `3px`,
carrying an uppercase Olive Gold tag line above the heading. Reserved for a genuine
distinction; it is the loudest object the system owns and it works because it is rare.

### Stats band

Three equal cells on a hairline grid, each a large tabular number (2rem, 600) over a
tracked uppercase label in Ash. Numbers come from collection counts, never from prose.

### Diagram frame

A Warm Paper panel with a 1px Rule border holding an inline SVG that inherits
`currentColor`, so the figure re-themes with the page instead of shipping two images. It
scrolls horizontally below its `560px` minimum rather than shrinking illegibly. Mermaid
diagrams reserve their final shape while hidden so the page below does not jump when the
library swaps the source for an SVG.

## Do's and Don'ts

### Do:

- **Do** take every `font-size` from the seven scale tokens, and every radius from `2px`.
- **Do** put the ordering key — year, semester — in the fixed `62px` left column with
  tabular numerals, for any list that accumulates.
- **Do** pick the accent sibling that meets contrast on its ground: Olive Gold
  (`#7a5f13`) for text on paper, Structural Gold (`#a4822c`) for a graphic element,
  Parchment Gold (`#decc96`) only as a fill.
- **Do** keep running prose justified with `hyphens: auto`, and force metadata rows back
  to `text-align: left` with `hyphens: manual`.
- **Do** separate things with a 1px hairline before reaching for a gap, a fill or a box.
- **Do** verify a rail change at all three height tiers (760 / 690 / 640px) before
  calling it done.
- **Do** write viewport-unit fallbacks as `100vh` first and `100dvh`/`100svh` inside an
  `@supports` block, so minification cannot drop the pair.
- **Do** hold 4.5:1 for text and 3:1 for graphic elements in **both** themes — the dark
  palette is a full redefinition of the tokens, not an afterthought.

### Don't:

- **Don't** introduce a second typeface. Role is size, weight, tracking and case.
- **Don't** colour running prose with gold, or tint a whole section with it. Gold marks
  position and ordering key only.
- **Don't** use `--accent` (`#decc96`) as a text colour on a light ground — it cannot
  carry contrast there.
- **Don't** add a fourth surface tone. Three tonal levels plus two rule weights is the
  whole depth vocabulary.
- **Don't** let this read as a **SaaS landing page**: no gradients, no floating cards, no
  coloured icon in a circle, no testimonial section, no oversized CTA.
- **Don't** let this read as a **university institutional page**: no carousel, no
  corporate blue, no stock banner of people pointing at a monitor, no breadcrumb on
  everything.
- **Don't** let this read as a **dev portfolio template**: no neon-on-black, no monospace
  everywhere, no typing animation, no row of technology logos.
- **Don't** let it collapse back into a **raw Lattes dump** either: a flat table at one
  weight with no hierarchy is the opposite failure, and the ordering-key column, the
  bolded author name and the section rules exist precisely to prevent it.
- **Don't** animate position or size. Colour only, `0.15s ease`.
- **Don't** add a third exception to the type scale, or a spacing value that no other
  component uses.
