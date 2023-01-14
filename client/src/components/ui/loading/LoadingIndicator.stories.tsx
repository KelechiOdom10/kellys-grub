import type { Meta } from "@storybook/react";
import { LoadingIndicator } from "./LoadingIndicator";

const meta: Meta<typeof LoadingIndicator> = {
  title: "Loading Icon",
  component: LoadingIndicator,
};

export default meta;

export const Default = () => {
  return (
    <div className="h-4">
      <LoadingIndicator />
    </div>
  );
};
