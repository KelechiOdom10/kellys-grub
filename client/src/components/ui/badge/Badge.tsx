import { FC, HTMLAttributes, PropsWithChildren } from "react";
import { cva } from "class-variance-authority";
import type { VariantProps } from "class-variance-authority";

const styles = cva(
  "inline-flex items-center justify-center text-xs gap-2 font-bold relative rounded-md transition-colors",
  {
    variants: {
      intent: {
        primary: "bg-brand-100 text-brand",
        secondary: "bg-secondary-100 text-secondary",
      },
      rounded: {
        true: "rounded-full",
      },
      letterCase: {
        normal: "normal-case",
        upper: "uppercase leading-3 text-[11px]",
        lower: "lowercase",
      },
      size: {
        sm: "px-1 py-1.5",
        md: "h-6 px-2 py-2",
        lg: "h-7 px-3 py-2.5",
      },
    },
    defaultVariants: {
      intent: "secondary",
      letterCase: "normal",
      size: "md",
    },
  }
);

export type BadgeProps = HTMLAttributes<HTMLDivElement> & VariantProps<typeof styles>;

export const Badge: FC<PropsWithChildren<BadgeProps>> = ({
  children,
  intent = "secondary",
  size = "md",
  rounded,
  letterCase,
  ...props
}) => {
  return (
    <div
      className={styles({
        intent,
        size,
        letterCase,
        rounded,
      })}
      {...props}
    >
      {children}
    </div>
  );
};
