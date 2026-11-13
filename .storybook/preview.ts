import type { Preview } from "@storybook/nextjs-vite";
import { fontVariables } from "../src/app/fonts";
import "../src/app/globals.css";

// Same classes as <html> in app/layout.tsx. They have to sit on the root element:
// the theme reads the font variables there.
document.documentElement.classList.add(...fontVariables.split(" "), "antialiased");

const preview: Preview = {
  parameters: {
    layout: "centered",
  },
};

export default preview;
