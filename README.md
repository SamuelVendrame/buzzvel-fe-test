# Buzzvel Front-End Test — Luma landing page

Responsive landing page for an online course platform, built from the Figma file
"Buzzvel FE - Test 2026" (frames **FE - Desktop** and **FE - Mobile**).

**Stack:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4

## Running the project

Requires Node.js 20.9 or newer.

```bash
npm install
npm run dev        # development server at http://localhost:3000
npm run build      # production build
npm run start      # serve the production build
```

Quality checks:

```bash
npm run lint       # ESLint (next/core-web-vitals + TypeScript rules)
npm run typecheck  # tsc --noEmit
npm test           # Vitest + Testing Library (22 tests)
npm run format     # Prettier, with Tailwind class sorting
```

Optional: set `NEXT_PUBLIC_SITE_URL` to the public URL so the Open Graph and canonical URLs are
absolute. On Vercel the production domain is detected automatically.

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
(no layout shift), hashed file names and blur placeholders. The hero photo is the LCP element and
is preloaded. `sizes` is set per image; in the photo collage it accounts for `object-cover`, since
a landscape photo in a portrait slot is drawn wider than the slot. Icons and the logo are the SVG
files exported from Figma, not redrawn.

**Fonts.** Inter and Plus Jakarta Sans are loaded with `next/font`, so they are self-hosted and
preloaded, with no request to Google at runtime.

**Contact form.** Validation is a pure module (`src/lib/contact-form.ts`) shared by the component
and its tests. The form validates a field when the user leaves it and all fields on submit, moves
focus to the first invalid field, and announces the result in a live region. There is no backend:
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

| In the Figma file                                                                                                      | Choice                                                                                                                          |
| ---------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| The mobile contact form is in Portuguese, the rest of the page in English                                              | English copy from the desktop frame everywhere                                                                                  |
| Desktop shows "Step 01" on all three steps; mobile shows 01, 02, 03                                                    | 01, 02, 03                                                                                                                      |
| Step 2 description differs between frames ("who use" / "who actually use")                                             | Desktop copy                                                                                                                    |
| No designs for hover, focus, the open menu or form error/success                                                       | Designed with the existing palette. One color was added for errors (`danger`), since no palette color is readable as error text |
| Menu content on mobile is not shown                                                                                    | Same links as the desktop header, plus "Log in" and "Start learning"                                                            |
| No tablet frame                                                                                                        | Described in "Responsive strategy" above                                                                                        |
| On mobile the hero photo comes before the heading                                                                      | Same visual order, but the heading stays first in the DOM                                                                       |
| The featured course and footer containers are 1136px wide, 16px past the 1120px content area                           | Aligned to the 1120px grid used by the other sections                                                                           |
| Buttons are 52, 52.5 or 54px tall depending on the instance                                                            | 52px everywhere                                                                                                                 |
| `text-tertiary` (#6D7384) on the cream background is 4.45:1; #E7E7EC on the blue background is 4.46:1 (AA needs 4.5:1) | Tertiary text is one step darker (#6B7182); text on the blue section is white                                                   |
| Form fields use 14px text                                                                                              | 16px below 768px, because iOS Safari zooms the page when a focused field has a smaller font; 14px from 768px up                 |
| Decorative shapes of the final CTA exist only in the desktop frame                                                     | Shown from 1024px up                                                                                                            |
| Links lead to pages that are not part of the test                                                                      | They point to the matching section of the page, or to `#`                                                                       |

## Verification

- `npm run build`, `npm run lint`, `npm run typecheck` and `npm test` pass with no errors or
  warnings.
- Fidelity: the page was rendered in headless Chrome at 402px and 1280px and compared with the
  exported Figma frames, section by section (side-by-side screenshots and measured section
  heights). Total page height differs from Figma by 3px on desktop and 13px on mobile; the
  remaining differences come from text wrappers with fixed heights in the Figma file.
- Responsiveness: also checked at 320, 768, 1024 and 1920px for overflow and broken layouts.
- Interactions: open menu, form errors, success and failure states, hover and keyboard focus were
  exercised in headless Chrome, and the menu and form are covered by tests.
- Lighthouse on the local production build (`npm run build && npm run start`):

  Mobile

  ![Lighthouse mobile: Performance 94, Accessibility 100, Best Practices 100, SEO 100](docs/lighthouse-mobile.png)

  Desktop

  ![Lighthouse desktop: Performance 100, Accessibility 100, Best Practices 100, SEO 100](docs/lighthouse-desktop.png)

## Left out and known limitations

- No backend: the form submission is simulated, as described above.
- Automated checks ran in Chrome only. Safari and Firefox were not covered by automation.
- The Lighthouse numbers are from a local server, not from a deployed URL.
- Not pixel-perfect in the places listed in the table above (16px container overflow, button
  heights, contrast adjustments).
- No dark mode, internationalisation or analytics: none of them is in the design.
- `cacheComponents` and `partialPrefetching` in `next.config.ts` are the defaults generated by
  `create-next-app` for this Next.js version and were kept as they are.

## Time spent

About 1 hour of AI-assisted implementation and verification in a single session, plus my own
review of the code and of the page before submitting.

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
checks at six viewport widths; interaction and keyboard checks; and Lighthouse, whose first run
flagged two contrast problems that were then fixed.
