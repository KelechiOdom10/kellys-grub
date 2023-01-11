type Position = "top" | "middle" | "bottom";
type Placement = "start" | "center" | "end";

export type IndicatorPosition = `${Position}-${Placement}`;

export function getPositionStyles(_position: IndicatorPosition) {
  const [position, placement] = _position.split("-") as [Position, Placement];
  let style = "";

  if (position === "top") {
    style += "top-0 -translate-y-1/2 ";
  }

  if (position === "middle") {
    style += "top-1/2 -translate-y-1/2 ";
  }

  if (position === "bottom") {
    style += "bottom-0 translate-y-1/2 ";
  }

  if (placement === "start") {
    style += "left-0 -translate-x-1/2 ";
  }

  if (placement === "center") {
    style += "left-1/2 -translate-x-1/2 ";
  }

  if (placement === "end") {
    style += "right-0 translate-x-1/2 ";
  }

  return style;
}
