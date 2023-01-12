import { SVGProps } from "react";

export const Menu = ({ width = "18", height = "18", ...props }: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <line x1="21" y1="6" x2="3" y2="6"></line>
      <line x1="15" y1="12" x2="3" y2="12"></line>
      <line x1="17" y1="18" x2="3" y2="18"></line>
    </svg>
  );
};
