import { FC, InputHTMLAttributes, ReactNode } from "react";
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

export const Input: FC<InputProps> = ({ label, helperText, size = "md", required, error, disabled, id, ...props }) => {
  return (
    <div className="flex-col space-y-1.5 tracking-wide">
      {label && (
        <label className="md:text-md block pl-1 text-sm font-semibold" htmlFor={id}>
          {label} {required && <span className="align-middle text-red-500">*</span>}
        </label>
      )}
      <input
        id={id}
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
      {helperText && !error && <p className="text-sm text-gray-500">{helperText}</p>}
    </div>
  );
};
