import type { Meta, StoryObj } from "@storybook/react";
import { Avatar, sizesPropsBySize } from "./Avatar";

const meta: Meta<typeof Avatar> = {
  title: "Avatar",
  component: Avatar,
  args: {
    imageSrc:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2980&q=80",
    alt: "Image of man",
    withBorder: false,
    size: "mdLg",
  },
  argTypes: {
    withBorder: {
      type: "boolean",
      defaultValue: false,
    },
    imageSrc: {
      type: { name: "string", required: false },
    },
    alt: {
      type: { name: "string", required: true },
    },
    size: {
      type: { name: "string", required: false },
      control: "radio",
      defaultValue: "mdLg",
      options: Object.keys(sizesPropsBySize),
    },
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Default: Story = {};

export const AvatarWithBorder: Story = {
  args: {
    withBorder: true,
  },
};

export const BrokenLink: Story = {
  args: {
    imageSrc: "",
  },
};
