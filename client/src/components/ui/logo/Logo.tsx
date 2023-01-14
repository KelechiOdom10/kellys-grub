import { FC, HTMLAttributes } from "react";

export const LogoWithText: FC<HTMLAttributes<HTMLImageElement>> = (props) => {
  return <img title="Kelly's Grub Logo" src="/images/logo-with-text.svg" alt="Kelly's Grub Logo" {...props} />;
};

export const Logo: FC<HTMLAttributes<HTMLImageElement>> = (props) => {
  return <img title="Kelly's Grub Logo" src="/images/logo.svg" alt="Kelly's Grub Logo" {...props} />;
};
