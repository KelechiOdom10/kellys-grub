import { Button } from "../button";
import { Plus } from "~/components/icons/Plus";
import { Minus } from "~/components/icons/Minus";

type NumberInputProps = {
  value: number;
  min?: number;
  max?: number;
  handleInputChange: (value: number) => void;
};

export const NumberInput = ({ min = 1, max = 10, value, handleInputChange }: NumberInputProps) => {
  return (
    <div>
      <div
        role="button"
        className="flex w-fit rounded-md border border-gray-100 bg-white focus-within:ring-2 focus-within:ring-brand focus:ring-2 focus:ring-brand-100 focus:ring-offset-1"
      >
        <Button
          size="icon"
          intent="ghost"
          className="m-0.5 bg-transparent text-dark hover:bg-gray-50 focus:ring-0"
          onClick={() => handleInputChange(value - 1)}
          disabled={value <= min}
        >
          <Minus />
        </Button>
        <input
          type="number"
          className="px-0.5 text-center text-sm focus:outline-none focus:ring-0"
          min={min}
          max={max}
          value={value}
          onChange={(e) => {
            let value = e.currentTarget.valueAsNumber;
            if (value <= 0) value = 1;
            handleInputChange(value);
          }}
        />
        <Button
          size="icon"
          intent="ghost"
          className="m-0.5 bg-transparent text-dark hover:bg-gray-50 focus:ring-0"
          onClick={() => handleInputChange(value + 1)}
          disabled={value >= 10}
        >
          <Plus />
        </Button>
      </div>
    </div>
  );
};
