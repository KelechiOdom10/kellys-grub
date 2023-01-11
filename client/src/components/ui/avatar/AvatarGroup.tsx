import { Avatar, AvatarSize, sizesPropsBySize } from "./Avatar";

export type AvatarGroupProps = {
  size: AvatarSize;
  items: {
    image: string;
    title: string;
    alt: string;
  }[];
  className?: string;
  overflowCount?: number;
};

export const AvatarGroup = ({ overflowCount = 4, ...props }: AvatarGroupProps) => {
  const avatars = props.items.slice(0, overflowCount);
  const LENGTH = props.items.length;

  return (
    <ul className={`${props.className} "flex items-center -space-x-3`}>
      {avatars.map((item, enumerator) => {
        if (item.image != null) {
          if (LENGTH > 4 && enumerator === 3) {
            return (
              <li key={enumerator} className="relative -mr-4 inline-block ">
                <div className="relative">
                  <Avatar
                    className="border-[1.5px] border-neutral"
                    imageSrc={item.image}
                    alt={item.alt || ""}
                    size={props.size}
                  />
                </div>
                <div
                  className={`flex ${
                    sizesPropsBySize[props.size]
                  } absolute top-0 right-0  items-center justify-center rounded-full border-2 border-neutral bg-dark text-xs font-medium text-white`}
                >
                  +{LENGTH - 3}
                </div>
              </li>
            );
          }
          // Always display the first Four items items
          return (
            <li key={enumerator} className="inline-block">
              <Avatar
                className={`${item.image && "border-[1.5px] border-neutral"}`}
                imageSrc={item.image}
                title={item.title}
                alt={item.alt || ""}
                size={props.size}
                withBorder={!item.image}
              />
            </li>
          );
        }
      })}
    </ul>
  );
};
