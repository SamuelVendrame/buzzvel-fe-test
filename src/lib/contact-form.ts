export interface ContactFormValues {
  name: string;
  email: string;
  message: string;
}

export type ContactFormField = keyof ContactFormValues;
export type ContactFormErrors = Partial<Record<ContactFormField, string>>;

export const emptyContactForm: ContactFormValues = { name: "", email: "", message: "" };

const NAME_MIN_LENGTH = 2;
const MESSAGE_MIN_LENGTH = 10;
/** Deliberately simple: something@domain.tld. A real check happens when the email is delivered. */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Returns the error message for one field, or undefined when the value is valid. */
export function validateContactField(field: ContactFormField, value: string): string | undefined {
  const trimmed = value.trim();

  switch (field) {
    case "name":
      if (!trimmed) return "Please enter your name.";
      if (trimmed.length < NAME_MIN_LENGTH) return "Your name is too short.";
      return undefined;
    case "email":
      if (!trimmed) return "Please enter your email.";
      if (!EMAIL_PATTERN.test(trimmed)) return "Please enter a valid email, like name@example.com.";
      return undefined;
    case "message":
      if (!trimmed) return "Please tell us how we can help.";
      if (trimmed.length < MESSAGE_MIN_LENGTH) {
        return `Please write at least ${MESSAGE_MIN_LENGTH} characters.`;
      }
      return undefined;
  }
}

/** Validates every field. An empty object means the form is valid. */
export function validateContactForm(values: ContactFormValues): ContactFormErrors {
  const errors: ContactFormErrors = {};

  for (const field of Object.keys(values) as ContactFormField[]) {
    const error = validateContactField(field, values[field]);
    if (error) errors[field] = error;
  }

  return errors;
}

/**
 * Stands in for the API call: the test has no backend, so this only waits and resolves.
 * It rejects when the browser is offline, which makes the error state reachable for real.
 */
export async function submitContactForm(values: ContactFormValues): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 800));

  if (typeof navigator !== "undefined" && !navigator.onLine) {
    throw new Error(`Could not send the message from ${values.email}: no connection.`);
  }
}
