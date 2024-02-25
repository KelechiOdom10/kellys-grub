import type { Meta, StoryObj } from "@storybook/react";
import { Rating } from "./Rating";

const meta: Meta<typeof Rating> = {
  title: "Rating",
  component: Rating,
};

export default meta;
type Story = StoryObj<typeof Rating>;

export const Default: Story = {
  args: {
    rating: 4,
  },
};

export const Secondary: Story = {
  args: {
    ...Default.args,
    intent: "secondary",
  },
};
