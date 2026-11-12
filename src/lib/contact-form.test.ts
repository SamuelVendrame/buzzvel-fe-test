import { describe, expect, it } from "vitest";
import { validateContactField, validateContactForm } from "./contact-form";

const validValues = {
  name: "Ada Lovelace",
  email: "ada@example.com",
  message: "I would like to know more about team plans.",
};

describe("validateContactForm", () => {
  it("returns no errors for valid values", () => {
    expect(validateContactForm(validValues)).toEqual({});
  });

  it("reports every empty field", () => {
    const errors = validateContactForm({ name: "", email: "", message: "" });

    expect(Object.keys(errors)).toEqual(["name", "email", "message"]);
  });

  it("treats whitespace-only values as empty", () => {
    const errors = validateContactForm({ ...validValues, name: "   " });

    expect(errors).toEqual({ name: "Please enter your name." });
  });
});

describe("validateContactField", () => {
  it.each(["ada", "ada@", "ada@example", "@example.com", "ada @example.com"])(
    "rejects the malformed email %j",
    (email) => {
      expect(validateContactField("email", email)).toMatch(/valid email/);
    },
  );

  it("accepts an email with surrounding spaces", () => {
    expect(validateContactField("email", "  ada@example.com ")).toBeUndefined();
  });

  it("requires at least 10 characters in the message", () => {
    expect(validateContactField("message", "Too short")).toMatch(/at least 10 characters/);
    expect(validateContactField("message", "Long enough.")).toBeUndefined();
  });

  it("requires at least 2 characters in the name", () => {
    expect(validateContactField("name", "A")).toBe("Your name is too short.");
  });
});
