import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ContactForm } from "./contact-form";

function setup(onSubmit = vi.fn().mockResolvedValue(undefined)) {
  const user = userEvent.setup();
  render(<ContactForm submitLabel="Send message" onSubmit={onSubmit} />);

  return {
    user,
    onSubmit,
    name: screen.getByLabelText("Full name"),
    email: screen.getByLabelText("Email"),
    message: screen.getByLabelText("Your question"),
    submit: screen.getByRole("button", { name: "Send message" }),
  };
}

describe("ContactForm", () => {
  it("shows an error for each empty field and does not submit", async () => {
    const { user, onSubmit, name, email, message, submit } = setup();

    await user.click(submit);

    expect(name).toHaveAccessibleDescription("Please enter your name.");
    expect(email).toHaveAccessibleDescription("Please enter your email.");
    expect(message).toHaveAccessibleDescription("Please tell us how we can help.");
    expect(name).toBeInvalid();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("moves focus to the first invalid field", async () => {
    const { user, name, email, submit } = setup();

    await user.type(name, "Ada Lovelace");
    await user.click(submit);

    expect(email).toHaveFocus();
  });

  it("validates a field when the user leaves it", async () => {
    const { user, email } = setup();

    await user.type(email, "not-an-email");
    await user.tab();

    expect(email).toHaveAccessibleDescription(/valid email/);
  });

  it("clears the error as soon as the value becomes valid", async () => {
    const { user, email } = setup();

    await user.type(email, "ada@");
    await user.tab();
    expect(email).toBeInvalid();

    await user.type(email, "example.com");

    expect(email).toBeValid();
    expect(email).not.toHaveAccessibleDescription();
  });

  it("submits valid values, confirms and resets the form", async () => {
    const { user, onSubmit, name, email, message, submit } = setup();

    await user.type(name, "Ada Lovelace");
    await user.type(email, "ada@example.com");
    await user.type(message, "I would like to know more about team plans.");
    await user.click(submit);

    expect(onSubmit).toHaveBeenCalledWith({
      name: "Ada Lovelace",
      email: "ada@example.com",
      message: "I would like to know more about team plans.",
    });
    expect(await screen.findByText("Message sent.")).toBeInTheDocument();
    expect(name).toHaveValue("");
    expect(message).toHaveValue("");
  });

  it("shows an error message and keeps the values when sending fails", async () => {
    const { user, name, email, message, submit } = setup(
      vi.fn().mockRejectedValue(new Error("offline")),
    );

    await user.type(name, "Ada Lovelace");
    await user.type(email, "ada@example.com");
    await user.type(message, "I would like to know more about team plans.");
    await user.click(submit);

    expect(await screen.findByText("Your message could not be sent.")).toBeInTheDocument();
    expect(name).toHaveValue("Ada Lovelace");
  });
});
