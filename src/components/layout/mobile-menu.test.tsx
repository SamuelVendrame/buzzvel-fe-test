import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeAll, describe, expect, it, vi } from "vitest";
import { MobileMenu } from "./mobile-menu";

const links = [
  { label: "Courses", href: "#courses" },
  { label: "About", href: "#about" },
];

function setup() {
  const user = userEvent.setup();
  render(
    <MobileMenu
      links={links}
      secondaryAction={{ label: "Log in", href: "#" }}
      primaryAction={{ label: "Start learning", href: "#courses" }}
    />,
  );

  return { user, toggle: screen.getByRole("button", { name: "Menu" }) };
}

beforeAll(() => {
  // jsdom does not implement matchMedia, which the menu uses to close itself on desktop.
  window.matchMedia = vi.fn().mockReturnValue({
    matches: false,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  });
});

describe("MobileMenu", () => {
  it("is closed by default", () => {
    const { toggle } = setup();

    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByRole("navigation", { name: "Mobile" })).not.toBeInTheDocument();
  });

  it("opens and closes with the toggle button", async () => {
    const { user, toggle } = setup();

    await user.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("link", { name: "Courses" })).toBeVisible();

    await user.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "false");
  });

  it("closes on Escape and returns focus to the toggle", async () => {
    const { user, toggle } = setup();

    await user.click(toggle);
    await user.tab();
    expect(screen.getByRole("link", { name: "Courses" })).toHaveFocus();

    await user.keyboard("{Escape}");

    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(toggle).toHaveFocus();
  });

  it("closes after a link is chosen", async () => {
    const { user, toggle } = setup();

    await user.click(toggle);
    await user.click(screen.getByRole("link", { name: "About" }));

    expect(toggle).toHaveAttribute("aria-expanded", "false");
  });

  it("closes when the user clicks outside", async () => {
    const { user, toggle } = setup();

    await user.click(toggle);
    await user.click(document.body);

    expect(toggle).toHaveAttribute("aria-expanded", "false");
  });
});
