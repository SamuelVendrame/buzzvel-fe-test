import { Inter, Plus_Jakarta_Sans } from "next/font/google";

// next/font downloads the fonts at build time and self-hosts them: no request to Google at runtime and no layout shift.
// Declared here so the app layout and Storybook use the same definitions.
export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

/** Classes that expose both font variables. They go on the root element. */
export const fontVariables = `${inter.variable} ${jakarta.variable}`;
