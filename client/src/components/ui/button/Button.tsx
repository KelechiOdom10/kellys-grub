import { FC, PropsWithChildren, ReactNode } from "react";
import { cva } from "class-variance-authority";
import type { VariantProps } from "class-variance-authority";

const styles = cva(
  "inline-flex items-center justify-center text-sm gap-2 font-semibold relative rounded-md transition-colors focus:outline-none  disabled:opacity-60 focus:ring-2 focus:ring-offset-1 disabled:cursor-not-allowed",
  {
    variants: {
      intent: {
        primary: "bg-brand text-white focus:ring-brand-300",
        secondary: "bg-secondary text-white focus:ring-secondary-300",
        dark: "bg-dark text-white focus:ring-gray-500",
        ghost:
          "bg-white hover:bg-gray-50 text-dark border-gray-200 border focus:ring-offset-0 focus:ring-dark",
      },
      fullWidth: {
        true: "w-full",
      },
      rounded: {
        true: "rounded-full",
      },
      size: {
        sm: "px-3 py-1.5 leading-4" /** For backwards compatibility */,
        md: "h-9 px-4 py-2",
        lg: "h-10 px-5 py-2.5",
        icon: "flex justify-center min-h-[36px] min-w-[36px]",
      },
      isLoading: {
        true: "opacity-50 cursor-wait",
      },
    },
    defaultVariants: {
      intent: "primary",
      size: "md",
    },
  }
);

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof styles> & {
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
  };

export const Button: FC<PropsWithChildren<ButtonProps>> = ({
  children,
  disabled,
  type = "button",
  isLoading = false,
  intent = "primary",
  size = "md",
  fullWidth,
  leftIcon,
  rightIcon,
  rounded,
  ...props
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className={styles({
        fullWidth,
        intent,
        size,
        isLoading,
        rounded,
      })}
      {...props}
    >
      {leftIcon}
      {children}
      {rightIcon}
    </button>
  );
};
