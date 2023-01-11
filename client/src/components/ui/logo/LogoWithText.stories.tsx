import { Meta, StoryObj } from "@storybook/react";
import { LogoWithText } from "./Logo";

const meta: Meta<typeof LogoWithText> = {
  title: "LogoWithText",
  component: LogoWithText,
  args: {
    className: "w-40",
  },
};

export default meta;

type Story = StoryObj<typeof LogoWithText>;

export const Default: Story = {};
