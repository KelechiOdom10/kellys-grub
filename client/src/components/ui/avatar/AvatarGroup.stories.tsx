import { Meta, StoryObj } from "@storybook/react";
import { sizesPropsBySize } from "./Avatar";
import { AvatarGroup } from "./AvatarGroup";

const meta: Meta<typeof AvatarGroup> = {
  title: "AvatarGroup",
  component: AvatarGroup,
  args: {
    size: "lg",
    items: [
      {
        image:
          "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        alt: "Man smiling",
        title: "Man smiling",
      },
      {
        image:
          "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        alt: "woman smiling",
        title: "woman smiling",
      },
      {
        image:
          "https://images.pexels.com/photos/1310522/pexels-photo-1310522.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        alt: "woman selfie",
        title: "woman selfie",
      },
      {
        image:
          "https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        alt: "Photo of Man in White Shirt With Round Black Analog Watch",
        title: "Photo of Man in White Shirt With Round Black Analog Watch",
      },
    ],
  },
  argTypes: {
    size: {
      type: { name: "string", required: false },
      control: "radio",
      defaultValue: "mdLg",
      options: Object.keys(sizesPropsBySize),
    },
  },
};

export default meta;
type Story = StoryObj<typeof AvatarGroup>;

export const Default: Story = {};

export const AvatarWithCounter: Story = {
  args: {
    ...Default.args,
    items: [
      {
        image:
          "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        alt: "Man smiling",
        title: "Man smiling",
      },
      {
        image:
          "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        alt: "woman smiling",
        title: "woman smiling",
      },
      {
        image:
          "https://images.pexels.com/photos/1310522/pexels-photo-1310522.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        alt: "woman selfie",
        title: "woman selfie",
      },
      {
        image:
          "https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        alt: "Photo of Man in White Shirt With Round Black Analog Watch",
        title: "Photo of Man in White Shirt With Round Black Analog Watch",
      },
      {
        image:
          "https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        alt: "Photo of Man in White Shirt With Round Black Analog Watch",
        title: "Photo of Man in White Shirt With Round Black Analog Watch",
      },
      {
        image:
          "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        alt: "woman smiling",
        title: "woman smiling",
      },
    ],
  },
};
