import { SVGComponent } from "~/types";

export const Menu: SVGComponent = ({
  width = "18",
  height = "18",
  ...props
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      {...props}
    >
      <line x1="21" y1="6" x2="3" y2="6"></line>
      <line x1="15" y1="12" x2="3" y2="12"></line>
      <line x1="17" y1="18" x2="3" y2="18"></line>
    </svg>
  );
};
