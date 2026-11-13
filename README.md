# Buzzvel Front-End Test — Luma landing page

Responsive landing page for an online course platform, built from the Figma file
"Buzzvel FE - Test 2026" (frames **FE - Desktop** and **FE - Mobile**).

**Stack:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4

## Running the project

Requires Node.js 20.19+, 22.13+ or 24+ (the range the test tooling supports).

```bash
npm install
npm run dev        # development server at http://localhost:3000
npm run build      # production build
npm run start      # serve the production build
```

Quality checks:

```bash
npm run lint       # ESLint (next/core-web-vitals + TypeScript rules)
npm run typecheck  # next typegen + tsc --noEmit
npm test           # Vitest + Testing Library (25 tests)
npm run format     # Prettier, with Tailwind class sorting
```

When deploying outside Vercel, set `NEXT_PUBLIC_SITE_URL` to the public URL. Without it the
canonical and Open Graph URLs fall back to `http://localhost:3000`. On Vercel the production
domain is detected automatically.

## Project structure

```
src/
  app/            layout (fonts, metadata), page, global CSS with the design tokens,
                  icon and Open Graph image
  assets/         images and icons exported from Figma
  components/
    ui/           Button, Container, SectionHeading, AvatarStack
    layout/       Header, MobileMenu, Footer, Logo
    sections/     one file per section of the page
  data/content.ts all copy, links and image references (local mock data)
  lib/            form validation, small helpers
  types/          types of the content
```

## Technical decisions

**Server Components by default.** The page is prerendered as static HTML. Only two components run
on the client, because they are the only ones with state: `MobileMenu` and `ContactForm`. The
header itself stays on the server and just renders the menu toggle inside it.

**Design tokens in the Tailwind theme.** Colors, the type scale, shadows and the page gutter are
declared once in `src/app/globals.css` (`@theme`), each one with the name it has in Figma next to
it. The default Tailwind palette is removed, so a color that is not in the design cannot be used
by accident. Each Figma text style is one utility (`text-h1`, `text-h1-mobile`, `text-body`…)
carrying its size, line height and letter spacing.

**Responsive strategy.** The two frames are the reference at 402px and 1280px. Desktop layouts
start at 1024px; from 768px to 1023px the page keeps the mobile type scale but uses multi-column
grids where they fit. The page gutter is fluid (20px at 402px, 80px at 1280px, interpolated with
`clamp`), so nothing jumps at a breakpoint. Content is capped at 1200px, the max width of the
containers in Figma.

**Content separated from markup.** `src/data/content.ts` holds everything that would come from a
CMS, typed by `src/types/content.ts`. Components receive it through typed props.

**Images.** All photos go through `next/image` with static imports, which gives intrinsic sizes
(no layout shift) and hashed file names. The two large photos (hero and featured course) also use
a blur placeholder. The hero photo is the LCP element and is preloaded. `sizes` is set per image;
in the photo collage it accounts for `object-cover`, since a landscape photo in a portrait slot is
drawn wider than the slot. The logo and the icons are the SVG files exported from Figma. The three
"how it works" illustrations are plain shapes in the design and are drawn with CSS. Two assets are
not in the design and were drawn: the favicon and the "close" icon of the mobile menu.

**Fonts.** Inter and Plus Jakarta Sans are loaded with `next/font`, so they are self-hosted and
preloaded, with no request to Google at runtime.

**Contact form.** Validation is a pure module (`src/lib/contact-form.ts`) shared by the component
and its tests. The form validates a filled-in field when the user leaves it and all fields on submit,
moves focus to the first invalid field, and announces the result in a live region. There is no backend:
`submitContactForm` waits 800 ms and resolves, and rejects when the browser is offline, so the
failure state can be seen for real (DevTools → Network → Offline).

**Mobile menu.** A disclosure (button with `aria-expanded` + panel), not a modal dialog: it does
not cover the page, so no focus trap is needed. It closes on Escape (focus returns to the button),
on outside click, when a link is chosen and when the viewport reaches the desktop breakpoint.

**Motion.** Only hover transitions, the menu entrance and smooth scrolling to anchors. All of them
are switched off under `prefers-reduced-motion: reduce`.

**Dependencies.** No runtime dependency besides Next.js and React. Class names are joined by a
six-line helper instead of a library. Dev dependencies: Prettier, Vitest and Testing Library.

## Accessibility

- Landmarks (`header`, `nav`, `main`, `footer`), one `h1`, sections labelled by their headings,
  lists for groups of cards, `figure`/`blockquote` for the testimonial, `dl` for the statistics.
- "Skip to content" link as the first tab stop; tab order follows the visual order.
- One focus style for every interactive element; on the blue and dark sections the outline turns
  white to keep its contrast.
- Every image has `alt`. Photos use descriptive text (the hero, course and testimonial photos use
  the descriptions the designer left in the layer names). Avatars next to "Trusted by 24,000+
  learners", icons and background shapes are decorative and use `alt=""` / `aria-hidden`.
- Form fields have visible labels; errors are linked with `aria-describedby` and `aria-invalid`.
- Text contrast meets WCAG AA (see the two color adjustments below).

## Design ambiguities and the choices made

| In the Figma file                                                                                                        | Choice                                                                                                                                                                                                              |
| ------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| The mobile contact form is in Portuguese, the rest of the page in English                                                | English copy from the desktop frame everywhere                                                                                                                                                                      |
| Desktop shows "Step 01" on all three steps; mobile shows 01, 02, 03                                                      | 01, 02, 03                                                                                                                                                                                                          |
| Step 2 description differs between frames ("who use" / "who actually use")                                               | Desktop copy                                                                                                                                                                                                        |
| No designs for hover, focus, the open menu or form error/success                                                         | Built from the design tokens only. Hover and error shades are a design color mixed with a little of the dark text color, so no color value outside the Figma palette is used                                        |
| Menu content on mobile is not shown                                                                                      | Same links as the desktop header, plus "Log in" and "Start learning"                                                                                                                                                |
| No tablet frame                                                                                                          | Described in "Responsive strategy" above                                                                                                                                                                            |
| No frame narrower than 402px                                                                                             | Same layout down to 320px. Below 380px the three statistics scale with the viewport, because at 40px they no longer fit side by side                                                                                |
| On mobile the hero photo comes before the heading                                                                        | Same visual order, but the heading stays first in the DOM                                                                                                                                                           |
| Three desktop containers (featured course, testimonial, footer links) are 1136px wide, 16px past the 1120px content area | Reproduced as designed: those three run 16px into the right gutter                                                                                                                                                  |
| Buttons are 50, 52, 52.5 or 54px tall depending on the instance                                                          | Sizes come from padding: 52px, and 54px for the bordered variant, as in most instances. Two exceptions: the final CTA buttons are 52px (Figma 52.5) and "Browse all courses" on mobile is 52px (Figma 50)           |
| Several text boxes have a fixed height 1 to 3px different from their text, which shifts what comes after them            | Followed where it moves an element (steps, final CTA, hero, footer). Not followed in the mobile category cards and the mobile featured course, which end up 3px and 6px taller                                      |
| `text-tertiary` (#6D7384) on the cream background is 4.45:1; #E7E7EC on the blue background is 4.46:1 (AA needs 4.5:1)   | Tertiary text is one step darker (#6B7182); text on the blue section is white                                                                                                                                       |
| Form fields use 14px text                                                                                                | 14px, as designed. iOS Safari zooms the page when a focused field has a font under 16px, so that browser alone gets 16px, through an `@supports` rule only iOS matches. Layout is unchanged (same 24px line height) |
| Decorative shapes of the final CTA exist only in the desktop frame                                                       | Shown from 1024px up                                                                                                                                                                                                |
| Links lead to pages that are not part of the test                                                                        | They point to the matching section of the page, or to `#`                                                                                                                                                           |

## Verification

- `npm run build`, `npm run lint`, `npm run typecheck` and `npm test` pass with no errors or
  warnings.
- Fidelity: the page was rendered in headless Chrome at 402px and 1280px and compared with the
  exported Figma frames, section by section (side-by-side screenshots and measured section
  heights). Total page height differs from Figma by about 1px on desktop and 8px on mobile; the
  mobile difference is in the two sections named in the table above.
- Responsiveness: also checked from 320px to 2560px for overflow and broken layouts.
- Interactions: open menu, form errors, success and failure states, hover and keyboard focus were
  exercised in headless Chrome, and the menu and form are covered by tests.
- A separate QA pass on the finished page: an independent code review against the brief and 47
  scripted browser scenarios with screenshots and video. It found, among smaller things, a submit
  click that could be lost, statistics overlapping at 320px and `npm run typecheck` failing on a
  fresh clone. All three are fixed and covered by a test or a re-measurement.
- Lighthouse on the local production build (`npm run build && npm run start`):

  Mobile

  ![Lighthouse mobile: Performance 99, Accessibility 100, Best Practices 100, SEO 100](docs/lighthouse-mobile.png)

  Desktop

  ![Lighthouse desktop: Performance 100, Accessibility 100, Best Practices 100, SEO 100](docs/lighthouse-desktop.png)

## Left out and known limitations

- No backend: the form submission is simulated, as described above.
- Automated checks ran in Chrome only. Safari and Firefox were not covered by automation.
- The iOS-only font size rule for form fields is in the generated CSS but was not tested on a
  real iPhone.
- The Lighthouse numbers are from a local server, not from a deployed URL.
- Not pixel-perfect in the places listed in the table above (two button heights, contrast
  adjustments, two mobile sections 3px and 6px taller).
- On 2x and 3x screens the hero and featured course photos are slightly soft: the source images
  in the Figma file are 900×1100 and 700×500.
- Without JavaScript the page still renders in full, but the mobile menu and the form validation
  do not work.
- No dark mode, internationalisation or analytics: none of them is in the design.
- `cacheComponents` and `partialPrefetching` in `next.config.ts` are the defaults generated by
  `create-next-app` for this Next.js version and were kept as they are.

## Time spent

About 3 hours of AI-assisted work: implementation, a QA pass and the fixes that came out of it.
My own review of the code and of the page before submitting comes on top of that.

## AI tools used and how the result was verified

- **Claude Code** (Anthropic, model Claude Fable 5.2) wrote the implementation under my direction.
  The commits carry a `Co-Authored-By` trailer for that reason.
- **Figma MCP server**, used by Claude Code to read both frames: layer structure, text, colors,
  typography, spacing and the image and icon assets. The design values in the code come from that
  data, not from estimating screenshots.
- `AGENTS.md` is generated by `create-next-app`; it tells coding agents to read the Next.js docs
  bundled in `node_modules` instead of relying on older knowledge of the framework.

The output was not accepted on trust. Everything in the "Verification" section was run on the
final code: build, lint, type check and tests; side-by-side comparison with the Figma frames;
checks at viewport widths from 320px to 2560px; interaction and keyboard checks; Lighthouse, whose
first run flagged two contrast problems that were then fixed; and the QA pass described above,
which was run by separate AI agents that had the brief and the Figma exports but not the
reasoning behind the implementation.
