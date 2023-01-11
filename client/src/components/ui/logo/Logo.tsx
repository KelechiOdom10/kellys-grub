import { FC, HTMLAttributes } from "react";

export const LogoWithText: FC<HTMLAttributes<HTMLImageElement>> = (props) => {
  return <img title="Kelly's Grub Logo" src="/logo-with-text.svg" alt="Kelly's Grub Logo" {...props} />;
};

export const Logo: FC<HTMLAttributes<HTMLImageElement>> = (props) => {
  return <img title="Kelly's Grub Logo" src="/logo.svg" alt="Kelly's Grub Logo" {...props} />;
};
