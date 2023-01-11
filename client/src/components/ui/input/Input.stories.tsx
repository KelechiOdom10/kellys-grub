import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./Input";

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof Input> = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/7.0/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "Field Input",
  component: Input,
  argTypes: {
    error: {
      type: "string",
    },
    disabled: {
      type: "boolean",
      defaultValue: false,
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    label: "Email",
    placeholder: "Please enter a valid email address",
    helperText: "Your email will not be shared with anyone",
    size: "md",
    id: "email",
  },
};

export const Error: Story = {
  args: {
    ...Default.args,
    error: "Email is not valid",
  },
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
  },
};
