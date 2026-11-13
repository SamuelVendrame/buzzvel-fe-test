import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Image from "next/image";
import arrowIcon from "@/assets/icons/arrow-light.svg";
import { Button, ButtonLink } from "./button";

const meta = {
  title: "UI/Button",
  component: Button,
  args: { children: "Explore courses" },
  argTypes: {
    variant: { control: "inline-radio", options: ["primary", "secondary", "accent", "ghost"] },
    size: { control: "inline-radio", options: ["sm", "md"] },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Wraps a story in the blue background of the featured course section. */
const onBlue: Story["decorators"] = [
  (Story) => (
    <div className="rounded-2xl bg-primary p-10 [--focus-ring:var(--color-white)]">
      <Story />
    </div>
  ),
];

export const Primary: Story = {};

export const Secondary: Story = {
  args: { variant: "secondary", children: "See how it works" },
};

export const Accent: Story = {
  args: { variant: "accent", children: "View course" },
  decorators: onBlue,
};

export const Ghost: Story = {
  args: { variant: "ghost" },
  decorators: onBlue,
  render: (args) => (
    <Button {...args}>
      Browse all courses
      <Image src={arrowIcon} alt="" width={20} height={20} />
    </Button>
  ),
};

export const Small: Story = {
  args: { size: "sm", children: "Start learning" },
};

/** The same styles on a link, which is how most of them are used on the page. */
export const AsLink: Story = {
  render: () => (
    <div className="flex items-stretch gap-3">
      <ButtonLink href="#courses">Explore courses</ButtonLink>
      <ButtonLink href="#how-it-works" variant="secondary">
        See how it works
      </ButtonLink>
    </div>
  ),
};
