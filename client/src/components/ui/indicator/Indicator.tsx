import { FC, HTMLAttributes, ReactNode } from "react";
import { VariantProps, cva } from "class-variance-authority";
import { IndicatorPosition, getPositionStyles } from "./Indicator.types";

const styles = cva("absolute flex align-middle text-xs justify-center z-[100]", {
  variants: {
    color: {
      brand: "bg-brand text-white border-brand",
      secondary: "bg-secondary text-white border-secondary",
      dark: "bg-dark text-white border-dark",
      white: "bg-white text-dark border-white",
    },
    withBorder: {
      true: "border-2 border-neutral",
    },
    withLabel: {
      true: "px-1.5 py-0",
    },
  },
  defaultVariants: {
    color: "secondary",
  },
});
type IndicatorVariantProps = VariantProps<typeof styles>;

interface IndicatorProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "color">,
    Omit<IndicatorVariantProps, "withLabel"> {
  position?: IndicatorPosition;
  label?: ReactNode;
  disabled?: boolean;
  withBorder?: boolean;
  size?: number;
  rounded?: "xs" | "sm" | "md" | "lg" | "full";
}

export const Indicator: FC<IndicatorProps> = ({
  children,
  label,
  position = "top-end",
  color,
  withBorder,
  disabled,
  className,
  size = 20,
  rounded = "full",
}) => {
  return (
    <div className={`relative z-0 inline-block`}>
      {!disabled && (
        <div
          className={`${styles({
            color,
            withBorder,
            withLabel: !!label,
            className,
          })} ${label ? "min-w-" : "w-"}[${size}px] h-[${size}px] ${getPositionStyles(position)} rounded-${rounded}`}
          style={{
            padding: `${label ? "0 0.375rem" : size / 5}px`,
          }}
        >
          {label}
        </div>
      )}

      {children}
    </div>
  );
};
