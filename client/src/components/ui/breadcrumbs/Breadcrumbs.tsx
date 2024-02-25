import { Link } from "@tanstack/react-router";
import { FC, HTMLAttributes, ReactNode } from "react";

type Props = HTMLAttributes<HTMLElement> & {
  separator?: ReactNode;
  transparent?: boolean;
  items: { title: ReactNode; href?: string }[];
};

export const Breadcrumbs: FC<Props> = ({ transparent, items, separator = "/", ...props }) => {
  return (
    <nav
      className={`bg-${
        transparent ? "transparent" : "white border border-gray-100"
      } flex flex-wrap items-center rounded-md py-2 px-3`}
      {...props}
    >
      <ul className="flex items-center">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className="inline-flex items-center">
              <Link
                to={item.href}
                className={`text-xs md:text-[15px] ${
                  isLast
                    ? "cursor-default font-normal text-gray-500 hover:text-gray-500"
                    : "font-medium text-gray-700 hover:fill-current hover:text-dark"
                }`}
              >
                {item.title}
              </Link>

              <span className={`mx-3 h-auto font-medium text-gray-400 ${isLast && "hidden"}`}>{separator}</span>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
