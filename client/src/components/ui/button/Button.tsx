import { ButtonHTMLAttributes, FC, PropsWithChildren, ReactNode } from "react";
import { cva } from "class-variance-authority";
import type { VariantProps } from "class-variance-authority";

export const buttonStyles = cva(
  "inline-flex items-center justify-center text-sm gap-2 font-semibold relative rounded-md transition-colors focus:outline-none disabled:opacity-60 focus:ring-2  disabled:cursor-not-allowed",
  {
    variants: {
      intent: {
        primary: "bg-brand text-white focus:ring-brand-300 focus:ring-offset-1",
        secondary: "bg-secondary text-white focus:ring-secondary-300 focus:ring-offset-1",
        "secondary-outline":
          "bg-transparent text-secondary border-secondary border-2 focus:ring-offset-1 focus:ring-secondary-300",
        dark: "bg-dark text-white focus:ring-gray-500 focus:ring-offset-1",
        "dark-outline": "bg-transparent text-dark border-dark border-2 focus:ring-offset-1",
        white: "bg-white hover:bg-gray-50 text-dark border-gray-200 border focus:ring-offset-0 focus:ring-dark",
        ghost:
          "bg-transparent focus:outline-0 text-dark border-none focus:ring-0 focus:ring-offset-0 focus-visible:ring-dark focus-visible:ring-2 focus:ring-transparent focus:outline-none hover:bg-neutral-600",
      },
      fullWidth: {
        true: "w-full",
      },
      rounded: {
        true: "rounded-full",
      },
      size: {
        sm: "px-3 py-1.5 leading-4" /** For backwards compatibility */,
        md: "h-9 px-5 py-2",
        lg: "h-10 px-5 py-2.5",
        icon: "flex justify-center min-h-[30px] min-w-[30px]",
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

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonStyles> & {
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
  };

export const Button: FC<PropsWithChildren<ButtonProps>> = ({
  children,
  isLoading = false,
  intent = "primary",
  size = "md",
  fullWidth,
  leftIcon,
  rightIcon,
  rounded,
  className,
  ...props
}) => {
  return (
    <button
      className={buttonStyles({
        fullWidth,
        intent,
        size,
        isLoading,
        rounded,
        className,
      })}
      {...props}
    >
      {leftIcon}
      {children}
      {rightIcon}
    </button>
  );
};
