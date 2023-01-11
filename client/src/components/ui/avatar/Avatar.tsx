import { FC, HTMLAttributes, useEffect, useState } from "react";
import { AvatarPlaceholderIcon } from "./AvatarPlaceholderIcon";
import { cx } from "class-variance-authority";

export type AvatarSize = "xs" | "sm" | "md" | "mdLg" | "lg" | "xl" | "2xl";
type AvatarProps = HTMLAttributes<HTMLDivElement> & {
  imageSrc?: string;
  alt: string;
  size?: AvatarSize;
  withBorder?: boolean;
  imageProps?: HTMLAttributes<HTMLImageElement>;
};

export const sizesPropsBySize: Record<AvatarSize, string> = {
  xs: "w-4 h-4", // 16px
  sm: "w-6 h-6", // 24px
  md: "w-8 h-8", // 32px
  mdLg: "w-9 h-9", // 36px
  lg: "w-10 h-10", //40px
  xl: "w-12 h-12", //48px
  "2xl": "w-16 h-16", // 64px
} as const;

export const Avatar: FC<AvatarProps> = ({
  className,
  children,
  imageSrc,
  alt,
  size = "md",
  imageProps,
  withBorder,
  ...props
}) => {
  const [error, setError] = useState(!imageSrc);
  const sizeClassName = sizesPropsBySize[size];
  const rootClass = cx("rounded-full self-center object-cover aspect-square ", sizeClassName, className);

  useEffect(() => {
    !imageSrc ? setError(true) : setError(false);
  }, [imageSrc]);

  return (
    <div
      className={`${sizeClassName} item-center relative inline-flex aspect-square justify-center overflow-hidden rounded-full ${
        withBorder && "ring-1 ring-gray-400"
      }`}
      {...props}
    >
      {error ? (
        <div
          title={alt}
          className={`round-full flex h-full w-full items-center justify-center self-center font-bold ${
            children && "border-2 border-dark"
          } text-xs ${rootClass}`}
        >
          {children || <AvatarPlaceholderIcon className={rootClass} />}
        </div>
      ) : (
        <img src={imageSrc} alt={alt} className={rootClass} onError={() => setError(true)} {...imageProps} />
      )}
    </div>
  );
};
