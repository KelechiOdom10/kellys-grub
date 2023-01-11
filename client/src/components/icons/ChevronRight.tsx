import { SVGComponent } from "~/types";

const ChevronRight: SVGComponent = ({
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
      <polyline points="9 18 15 12 9 6"></polyline>
    </svg>
  );
};

export default ChevronRight;
