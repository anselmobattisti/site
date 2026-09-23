# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: **academic peers** — researchers, reviewers, thesis committees and program
committees who arrive looking for a specific artifact (a paper, the PhD thesis, a DOI,
a co-author list, the record of where he studied and with whom). They usually arrive
from a citation, a Lattes link, a Google Scholar profile or a conference program, know
the name already, and want confirmation plus the file.

Secondary audiences, confirmed but not prioritized: IMPA Tech undergraduates looking at
the courses and research projects; event organizers looking for a bio and speaking
topics; industry partners arriving through Webgenium or the US patents.

## Product Purpose

The personal and academic site of Anselmo Luiz Éden Battisti (battisti.com.br) —
Professor at IMPA Tech, PhD in Computer Science (UFF), co-founder of Webgenium.

Two things have to happen for a visit to be worth it:

1. **Verifiable credibility.** The visitor confirms who he is and leaves with the thing
   they came for — the PDF, the DOI, the venue, the year — without having to detour
   through Lattes or Scholar.
2. **A durable memory of the work.** The site is the archive of what he has done:
   every course offering since 2012, the talks, the projects, the patents. He consults
   and shares it himself; it is not only an outward-facing brochure.

## Positioning

A twenty-year career held in one record that neither a CV nor a Lattes page can
reproduce: the research (SFC placement across the edge–cloud continuum), the classroom
(courses taught from 2012 onward, with ementa and bibliography preserved per offering),
and the company (Webgenium, co-founded 2007) as one continuous account rather than three
disconnected profiles. The teaching archive in particular has no equivalent elsewhere —
Classroom holds the slides, but only this site holds the institutional memory of what
was taught, when, and from which bibliography.

## Operating Context

- Visitors usually arrive **already knowing the name**, from a citation, a program, a
  Lattes or Scholar link. The site's first job is confirmation, not introduction.
- Content accrues by section over time — Publications, Patents, Awards, Talks,
  Teaching, Projects, Work, Background. Every section is a list that only grows, so
  long-list legibility matters more than hero impact.
- Slides for courses live in **Google Classroom** (the AVA), not on the site. The site
  carries the ementa, bibliography, institution, level and hours for each offering.
- Content is authored as Markdown/Nunjucks files in the repo and deployed by pushing.
- Publication entries carry DOIs where they exist; the reader is expected to follow
  them out.

## Capabilities and Constraints

Confirmed durable constraints — future work must preserve all four:

- **Zero runtime third-party dependencies.** Fonts, scripts and images are self-hosted.
  No Google Fonts request, no CDN, no analytics. (Roboto and Roboto Mono are served as
  variable fonts from `public/fonts/`.)
- **Performance and accessibility floor.** Green Lighthouse, WCAG AA contrast
  (4.5:1 text, 3:1 graphic elements), CLS at zero. What has been won must not regress.
- **English is the site language.** Interface and prose in English; Portuguese content
  (course titles, talk titles) is marked `lang="pt-BR"` rather than translated.
- **Static, no backend.** Eleventy 3 generating HTML, published to Netlify from the
  repo. Nothing requiring a server, a database or a proprietary build service.

Technical facts: Eleventy 3 + Nunjucks, `eleventy-navigation`, `eleventy-img`,
`eleventy-plugin-rss` (Atom feed at `/feed.xml`), Prism syntax highlighting,
`@kevingimbel/eleventy-plugin-mermaid` for diagrams. The stylesheet is **inlined into
every page** and minified through a `cssmin` Nunjucks filter backed by `lightningcss` —
not the Eleventy plugin, because a plugin that compiles `.css` files into output files
never sees the inlined string. Light and dark themes via CSS custom properties and
`prefers-color-scheme`.

Terminology used on the site: SFC (Service Function Chain), VNF (Virtual Network
Function), edge–cloud continuum, network slicing, Internet of Media Things.

## Brand Commitments

Name and identity: Anselmo Luiz Éden Battisti. Voice is first-person, plain, restrained —
factual claims with the evidence attached, no marketing register.

Binding visual constraints the user has set, recorded as given and not extended:

- **Roboto throughout** — a single typeface for headings and body alike.
- **Warm palette** in the register of `#decc96`.
- **Justified body text.** A settled preference, deliberately re-affirmed; do not revert it.

Assets: portrait at `content/about/rosto.png`, share image at `/img/share.jpg`.

## Evidence on Hand

Real, in the repository — none of it is to be invented, inflated or replaced with
placeholders:

- **16 peer-reviewed publications** (`content/publication/`), 2014–2026, with DOIs.
- **6 US patent filings**, 2023–2025 (`content/patents.md`).
- **PhD thesis** (SPEED), linked as a PDF from the GitHub publications repo.
- **Award**: finalist, Ph.D. Thesis Contest (CTD) — SBRC 2026.
- **18 course offerings** (`content/teaching/`): 17 at UNIVEL, 2012–2018, extracted from
  the original .docx course plans, plus 2026.2 at IMPA Tech. All undergraduate, all
  75 hours at UNIVEL.
- **1 research project**: LibVox (IMPA Tech, undergraduate students named without
  emails), with a Mermaid architecture diagram.
- **1 talk**: O Paradoxo da IA — XII SIMMA / UFF Volta Redonda, 16 September 2026, with
  an attached event-page PDF.
- Profiles: Lattes, Google Scholar, GitHub, YouTube, Google Patents, Webgenium.

Absences future work must not paper over: there are no testimonials, no citation counts
presented as claims, no student quotes, no metrics beyond the counts above. The LibVox
repository is still private.

## Product Principles

1. **The artifact is the point.** Every entry exists to hand the visitor a file, a DOI or
   a verifiable fact. A page that describes work without linking to it has failed.
2. **Lists that only grow.** Publications, courses, talks and patents accumulate for
   decades. Optimize for scanning a long list by its ordering key — year, semester,
   venue — not for the impact of any single entry.
3. **Nothing is claimed that the repository cannot prove.** Counts come from collections;
   credentials come from real institutions; absences stay absent.
4. **The archive serves its author too.** He is a recurring user of this site. Keeping a
   past offering findable years later is as much the job as impressing a first-time
   visitor.
5. **Earned performance is a feature, not a side effect.** Self-hosted, static, zero-CLS
   and AA-contrast are product commitments, not implementation trivia.

## Accessibility & Inclusion

WCAG AA is the confirmed required standard: 4.5:1 for text, 3:1 for graphic elements and
UI boundaries, in both the light and dark themes. Cumulative Layout Shift must stay at
zero — fallback font metrics are matched to Roboto specifically to hold this. Portuguese
content inside an English page carries `lang="pt-BR"` so screen readers pronounce it
correctly. Heading hierarchy must not skip levels.
