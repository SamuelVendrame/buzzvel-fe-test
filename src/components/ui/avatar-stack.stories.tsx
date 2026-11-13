import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { learnerAvatars } from "@/data/content";
import { AvatarStack } from "./avatar-stack";

const meta = {
  title: "UI/AvatarStack",
  component: AvatarStack,
  args: { avatars: learnerAvatars },
  argTypes: {
    size: { control: "inline-radio", options: ["sm", "md"] },
  },
} satisfies Meta<typeof AvatarStack>;

export default meta;
type Story = StoryObj<typeof meta>;

/** As in the hero, on the cream background. */
export const Small: Story = {
  args: { avatars: learnerAvatars.slice(0, 3) },
  decorators: [
    (Story) => (
      <div className="bg-cream p-10">
        <Story />
      </div>
    ),
  ],
};

/** As in the final call to action: larger, with a border that matches its background. */
export const Medium: Story = {
  args: { size: "md", ringClassName: "border-yellow" },
  decorators: [
    (Story) => (
      <div className="bg-butter p-10">
        <Story />
      </div>
    ),
  ],
};
