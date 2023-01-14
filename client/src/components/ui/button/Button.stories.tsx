import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";
import { Plus } from "~/components/icons/Plus";
import { ShoppingCart } from "~/components/icons/ShoppingCart";

const meta: Meta<typeof Button> = {
  title: "Button",
  component: Button,
  argTypes: {
    onClick: { action: "clicked", description: "Optional click handler" },
    fullWidth: {
      type: "boolean",
      defaultValue: false,
    },
    isLoading: {
      type: "boolean",
      defaultValue: false,
    },
    disabled: {
      type: "boolean",
      defaultValue: false,
    },
    rounded: {
      type: "boolean",
      defaultValue: false,
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: "Button",
    intent: "primary",
    size: "md",
  },
};

export const PrimaryWithIcon: Story = {
  args: {
    ...Primary.args,
    children: "Icon Button",
    rightIcon: <Plus />,
  },
};

export const Secondary: Story = {
  args: {
    ...Primary.args,
    intent: "secondary",
  },
};

export const Dark: Story = {
  args: {
    ...Primary.args,
    intent: "dark",
  },
};

export const Ghost: Story = {
  args: {
    ...Primary.args,
    intent: "ghost",
  },
};

export const IconButton: Story = {
  args: {
    ...Primary.args,
    children: null,
    intent: "ghost",
    size: "icon",
    rightIcon: <ShoppingCart />,
  },
};

// export const AsLink: Story = {
//   decorators: [
//     (Story) => (
//       <>
//         <RouterProvider router={router} defaultPreload="intent" />
//         <Story />
//       </>
//     ),
//   ],
//   args: {
//     intent: "primary",
//     size: "md",
//     as: "link",
//     to: "#",
//   },
// };
