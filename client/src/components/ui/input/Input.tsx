import { InputHTMLAttributes, ReactNode } from "react";
import { cva } from "class-variance-authority";
import type { VariantProps } from "class-variance-authority";

const styles = cva(
  "w-full text-left rounded-md text-md text-dark border border-gray-200 block focus:ring-dark focus:border-dark focus:border-[1.5px] focus:outline-none disabled:bg-gray-100 disabled:placeholder:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed",
  {
    variants: {
      size: {
        sm: "text-sm leading-8 h-9 px-3",
        md: "text-md leading-10 h-10 px-3.5",
        lg: "text-lg leading-12 h-12 px-4",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size"> &
  VariantProps<typeof styles> & {
    helperText?: ReactNode;
    error?: string;
    label?: string;
  };

export const Input = ({
  label,
  helperText,
  size = "md",
  required,
  error,
  disabled,
  id,
  ...props
}: InputProps) => {
  return (
    <div className="flex-col space-y-1.5 tracking-wide">
      {label && (
        <label
          className="block pl-1 font-semibold text-sm md:text-md"
          htmlFor={id}
        >
          {label}{" "}
          {required && <span className="text-red-500 align-middle">*</span>}
        </label>
      )}
      <input
        required={required}
        disabled={disabled}
        aria-invalid={!!error}
        aria-describedby="errMsg"
        className={styles({ size })}
        {...props}
      />
      {error && (
        <p id="errMsg" className="text-sm text-red-500">
          {error}
        </p>
      )}
      {helperText && !error && (
        <p className="text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
};
