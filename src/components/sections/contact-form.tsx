"use client";

import {
  type ChangeEvent,
  type FocusEvent,
  type FormEvent,
  type ReactNode,
  useRef,
  useState,
} from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import {
  type ContactFormErrors,
  type ContactFormField,
  type ContactFormValues,
  emptyContactForm,
  submitContactForm,
  validateContactField,
  validateContactForm,
} from "@/lib/contact-form";

type Status = "idle" | "submitting" | "success" | "error";
type FieldElement = HTMLInputElement | HTMLTextAreaElement;

interface ContactFormProps {
  submitLabel: string;
  /** Sends the values. Injectable so tests can simulate success and failure. */
  onSubmit?: (values: ContactFormValues) => Promise<void>;
}

const fieldOrder: ContactFormField[] = ["name", "email", "message"];

export function ContactForm({ submitLabel, onSubmit = submitContactForm }: ContactFormProps) {
  const [values, setValues] = useState<ContactFormValues>(emptyContactForm);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const formRef = useRef<HTMLFormElement>(null);

  function setFieldError(field: ContactFormField, error: string | undefined) {
    setErrors((current) => ({ ...current, [field]: error }));
  }

  function handleChange(event: ChangeEvent<FieldElement>) {
    const field = event.target.name as ContactFormField;
    const { value } = event.target;

    setValues((current) => ({ ...current, [field]: value }));
    // Once a field shows an error, re-check it on every keystroke so the message goes away as soon as it is fixed.
    if (errors[field]) setFieldError(field, validateContactField(field, value));
    if (status === "success" || status === "error") setStatus("idle");
  }

  function handleBlur(event: FocusEvent<FieldElement>) {
    const field = event.target.name as ContactFormField;
    // Do not complain about a field the user only tabbed through.
    if (event.target.value) setFieldError(field, validateContactField(field, event.target.value));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return;

    const validationErrors = validateContactForm(values);
    setErrors(validationErrors);

    const firstInvalidField = fieldOrder.find((field) => validationErrors[field]);
    if (firstInvalidField) {
      formRef.current?.querySelector<FieldElement>(`[name="${firstInvalidField}"]`)?.focus();
      return;
    }

    setStatus("submitting");
    try {
      await onSubmit({
        name: values.name.trim(),
        email: values.email.trim(),
        message: values.message.trim(),
      });
      setValues(emptyContactForm);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  /** Props shared by the three fields: wiring, accessibility attributes and styles. */
  function fieldProps(field: ContactFormField, className?: string) {
    const error = errors[field];

    return {
      id: `contact-${field}`,
      name: field,
      value: values[field],
      onChange: handleChange,
      onBlur: handleBlur,
      required: true,
      // Typing during the request would be lost when the form resets on success.
      readOnly: status === "submitting",
      "aria-invalid": error ? true : undefined,
      "aria-describedby": error ? `contact-${field}-error` : undefined,
      className: cn(
        // 14px as in the design. Only iOS Safari gets 16px, because it zooms the page when a focused field uses a smaller font.
        "w-full rounded-lg border bg-cream px-4 py-[11px] text-body text-ink transition-colors placeholder:text-ink-tertiary ios:text-base/6",
        error ? "border-danger" : "border-line hover:border-ink-tertiary",
        className,
      ),
    };
  }

  const isSubmitting = status === "submitting";

  return (
    // noValidate: validation runs in JS so the messages are consistent across browsers and announced to screen readers.
    <form ref={formRef} onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
      <div className="flex flex-col gap-5">
        <Field field="name" label="Full name" error={errors.name}>
          <input {...fieldProps("name")} type="text" autoComplete="name" placeholder="Your name" />
        </Field>
        <Field field="email" label="Email" error={errors.email}>
          <input
            {...fieldProps("email")}
            type="email"
            autoComplete="email"
            placeholder="youremail@example.com"
          />
        </Field>
        <Field field="message" label="Your question" error={errors.message}>
          <textarea
            {...fieldProps("message", "block min-h-25 resize-none py-[13px] lg:min-h-30")}
            rows={3}
            placeholder="Tell us how we can help..."
          />
        </Field>
      </div>

      <div>
        <Button
          type="submit"
          aria-disabled={isSubmitting}
          // Keep focus where it is while the button is pressed. Otherwise the field being
          // edited would blur and validate between mousedown and mouseup, its error message
          // would push this button down, and the click would land outside it.
          onMouseDown={(event) => event.preventDefault()}
          className="w-full aria-disabled:opacity-70"
        >
          {isSubmitting ? "Sending…" : submitLabel}
        </Button>

        {/* The live region is always in the DOM so screen readers announce the message when it appears. */}
        <div aria-live="polite">
          {status === "success" && (
            <p className="mt-4 rounded-lg bg-primary-light px-4 py-3 text-body text-ink">
              <strong className="font-bold">Message sent.</strong> Thanks for reaching out — we will
              reply within 24 hours on business days.
            </p>
          )}
          {status === "error" && (
            <p className="mt-4 rounded-lg border border-danger px-4 py-3 text-body text-danger">
              <strong className="font-bold">Your message could not be sent.</strong> Check your
              connection and try again.
            </p>
          )}
        </div>
      </div>
    </form>
  );
}

interface FieldProps {
  field: ContactFormField;
  label: string;
  error?: string;
  children: ReactNode;
}

/** Label + control + error message. The ids match the ones produced by fieldProps(). */
function Field({ field, label, error, children }: FieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={`contact-${field}`} className="text-body font-bold text-ink">
        {label}
      </label>
      {children}
      {error && (
        <p id={`contact-${field}-error`} className="text-body text-danger">
          {error}
        </p>
      )}
    </div>
  );
}
