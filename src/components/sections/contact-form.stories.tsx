import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent, within } from "storybook/test";
import { ContactForm } from "./contact-form";

const wait = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

const validMessage = {
  name: "Ada Lovelace",
  email: "ada@example.com",
  message: "I would like to know more about team plans.",
};

const meta = {
  title: "Sections/ContactForm",
  component: ContactForm,
  args: {
    submitLabel: "Send message",
    onSubmit: () => wait(800),
  },
  decorators: [
    (Story) => (
      <div className="w-[460px] max-w-full">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ContactForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {};

/** Submitting the empty form shows one error per field and moves focus to the first one. */
export const WithErrors: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByRole("button", { name: "Send message" }));

    await expect(canvas.getByLabelText("Full name")).toHaveFocus();
    await expect(canvas.getByText("Please enter your email.")).toBeVisible();
  },
};

async function fillAndSubmit(canvasElement: HTMLElement) {
  const canvas = within(canvasElement);

  await userEvent.type(canvas.getByLabelText("Full name"), validMessage.name);
  await userEvent.type(canvas.getByLabelText("Email"), validMessage.email);
  await userEvent.type(canvas.getByLabelText("Your question"), validMessage.message);
  await userEvent.click(canvas.getByRole("button", { name: "Send message" }));

  return canvas;
}

export const Sent: Story = {
  args: { onSubmit: () => wait(300) },
  play: async ({ canvasElement }) => {
    const canvas = await fillAndSubmit(canvasElement);

    await expect(await canvas.findByText("Message sent.")).toBeVisible();
  },
};

export const FailedToSend: Story = {
  args: { onSubmit: () => wait(300).then(() => Promise.reject(new Error("offline"))) },
  play: async ({ canvasElement }) => {
    const canvas = await fillAndSubmit(canvasElement);

    await expect(await canvas.findByText("Your message could not be sent.")).toBeVisible();
  },
};
