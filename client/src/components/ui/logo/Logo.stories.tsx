import { Meta, StoryObj } from "@storybook/react";
import { Logo } from "./Logo";

const meta: Meta<typeof Logo> = {
  title: "Logo",
  component: Logo,
  args: {
    className: "w-20",
  },
};

export default meta;

type Story = StoryObj<typeof Logo>;

export const Default: Story = {};
