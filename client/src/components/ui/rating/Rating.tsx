import { cx } from "class-variance-authority";
import { Star } from "~/components/icons/Star";

type RatingSize = "xs" | "sm" | "md" | "lg";
type RatingIntent = "primary" | "secondary";

interface RatingProps {
  rating: number;
  denominator?: number;
  size?: RatingSize;
  intent?: RatingIntent;
}

const sizesPropsBySize: Record<RatingSize, string> = {
  xs: "w-4 h-4", // 16px
  sm: "w-4.5 h-4.5", // 18px
  md: "w-5 h-5", // 20px
  lg: "w-6 h-6", //22px
} as const;

const intentProps: Record<RatingIntent, string> = {
  primary: "text-brand",
  secondary: "text-secondary",
};

export const Rating = ({ rating, size = "sm", intent = "primary", denominator = 5 }: RatingProps) => {
  return (
    <div className={cx("flex items-center gap-2", intentProps[intent])}>
      <Star className={cx("fill-current", sizesPropsBySize[size])} />
      <p className={`font-semibold text-${size}`}>
        {rating}/{denominator}
      </p>
    </div>
  );
};
