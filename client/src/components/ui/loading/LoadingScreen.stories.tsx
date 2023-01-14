import type { Meta, StoryObj } from "@storybook/react";
import { LoadingScreen } from "./LoadingScreen";

const meta: Meta<typeof LoadingScreen> = {
  title: "Loading Screen",
  component: LoadingScreen,
};

export default meta;
type Story = StoryObj<typeof LoadingScreen>;

export const Default: Story = {};

export const Message: Story = {
  args: {
    message: "Loading...",
  },
};
