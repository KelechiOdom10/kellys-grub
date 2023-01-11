import type { Meta, StoryObj } from "@storybook/react";
import { Breadcrumbs } from "./Breadcrumbs";
import ChevronRight from "~/components/icons/ChevronRight";
import { Home } from "~/components/icons/Home";

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof Breadcrumbs> = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/7.0/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "Breadcrumbs",
  component: Breadcrumbs,

  argTypes: {
    transparent: {
      type: "boolean",
      defaultValue: false,
    },
  },
};

export default meta;
type Story = StoryObj<typeof Breadcrumbs>;

export const Default: Story = {
  args: {
    items: [
      { title: "Home", href: "#" },
      { title: "Categories", href: "#" },
      { title: "Starters", href: "#" },
      { title: "Product title" },
    ],
  },
};

export const Transparent: Story = {
  args: {
    ...Default.args,
    transparent: true,
  },
};

export const CustomSeparator: Story = {
  args: {
    ...Default.args,
    separator: <ChevronRight />,
  },
};

export const IconTitle: Story = {
  args: {
    items: [
      { title: <Home />, href: "#" },
      { title: "Categories", href: "#" },
      { title: "Starters", href: "#" },
      { title: "Product title" },
    ],
  },
};
