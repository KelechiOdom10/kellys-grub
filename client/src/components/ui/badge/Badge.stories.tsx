import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "./Badge";

const meta: Meta<typeof Badge> = {
  title: "Badge",
  component: Badge,
  argTypes: {
    rounded: {
      type: "boolean",
      defaultValue: false,
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Primary: Story = {
  args: {
    children: "Badge",
    intent: "primary",
    size: "md",
  },
};

export const Secondary: Story = {
  args: {
    ...Primary.args,
    intent: "secondary",
    children: "On sale",
    letterCase: "upper",
  },
};
