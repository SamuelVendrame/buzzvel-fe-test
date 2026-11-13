import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SectionHeading } from "./section-heading";

const meta = {
  title: "UI/SectionHeading",
  component: SectionHeading,
  args: {
    id: "section-title",
    eyebrow: "Find your next skill",
    title: "Learn something worth knowing.",
  },
  argTypes: {
    align: { control: "inline-radio", options: ["start", "center"] },
    tone: { control: "inline-radio", options: ["default", "inverse"] },
    gap: { control: "inline-radio", options: ["sm", "md"] },
  },
  decorators: [
    (Story) => (
      <div className="w-[560px] max-w-full">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SectionHeading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Centered: Story = {
  args: { align: "center", eyebrow: "How Luma works", title: "Less browsing. More learning." },
};

/** For blue or dark backgrounds. */
export const Inverse: Story = {
  args: {
    tone: "inverse",
    eyebrow: "Most popular this month",
    title: "Designing products people understand.",
  },
  decorators: [
    (Story) => (
      <div className="rounded-2xl bg-primary p-10">
        <Story />
      </div>
    ),
  ],
};

export const TightGap: Story = {
  args: { gap: "sm", eyebrow: "The people", title: "Meet international students & teachers" },
};
