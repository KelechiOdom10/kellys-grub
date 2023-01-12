import type { Meta, StoryObj } from "@storybook/react";
import { Indicator } from "./Indicator";
import { Button } from "../button";
import { ShoppingCart } from "~/components/icons/ShoppingCart";

const meta: Meta<typeof Indicator> = {
  title: "Indicator",
  component: Indicator,

  argTypes: {
    withBorder: {
      type: "boolean",
      defaultValue: false,
    },
    size: {
      type: "number",
      defaultValue: 20,
    },
    disabled: {
      type: "boolean",
      defaultValue: false,
    },
  },
};

export default meta;
type Story = StoryObj<typeof Indicator>;

export const Default: Story = {};

export const IndicatorWithChildren: Story = {
  args: {
    color: "dark",
    children: (
      <Button intent="ghost" size="sm" rightIcon={<ShoppingCart />}>
        Cart
      </Button>
    ),
  },
};

export const IndicatorWithLabel: Story = {
  args: {
    ...IndicatorWithChildren.args,
    label: 2,
  },
};

export const IndicatorWithBorder: Story = {
  args: {
    ...IndicatorWithLabel.args,
    withBorder: true,
  },
};
