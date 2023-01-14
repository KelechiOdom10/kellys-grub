import { Meta } from "@storybook/react";
import { NumberInput } from "./NumberInput";
import { useState } from "react";

const meta: Meta<typeof NumberInput> = {
  title: "Number Input",
  component: NumberInput,
  args: {
    min: 1,
    max: 10,
    value: 2,
  },
};

export default meta;

export const Default = () => {
  const [value, setValue] = useState(2);

  return <NumberInput value={value} handleInputChange={setValue} />;
};
