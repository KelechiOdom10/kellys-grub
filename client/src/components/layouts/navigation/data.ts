import { Squares2By2 } from "~/components/icons/Squares2By2";

type NavigationLink = {
  name: string;
  href?: string;
  icon?: ({ width, height, ...props }: React.SVGProps<SVGSVGElement>) => JSX.Element;
  image?: string;
  description?: string;
  children?: NavigationLink[];
};

export const navigationLinks: NavigationLink[] = [
  {
    name: "Categories",
    icon: Squares2By2,
    children: [
      {
        name: "Starters",
        description: " Appetizers to begin your meal",
        href: "/categories/starters",
        image: "https://i0.wp.com/tastyafricanfood.com/wp-content/uploads/2021/06/Meat-Chicken-Fish-Pie-scaled.jpg",
      },
      {
        name: "Rice Dishes",
        href: "/categories/rice-dishes",
        description: "A variety of rice-based entrees",
        image: "https://i0.wp.com/tastyafricanfood.com/wp-content/uploads/2021/06/Jollof-Rice-scaled-1.jpg",
      },
      {
        name: "Meat and Fish",
        description: "Dishes featuring meat or fish as the main ingredient",
        href: "/categories/meat-and-fish",
        image: "https://i0.wp.com/tastyafricanfood.com/wp-content/uploads/2021/06/Beef.jpg",
      },
      {
        name: "Soup Dishes",
        description: " A selection of soups to warm you up",
        href: "/categories/soup-dishes",
        image: "https://i0.wp.com/tastyafricanfood.com/wp-content/uploads/2021/06/Eforiro-Plain-scaled.jpg",
      },
      {
        name: "Special Dishes",
        description: "Unique, signature dishes of the restaurant",
        href: "/categories/special-dishes",
        image: "https://i0.wp.com/tastyafricanfood.com/wp-content/uploads/2021/06/Ofada-Stew-scaled.jpg",
      },
      {
        name: "Drinks",
        description: "Beverages to quench your thirst",
        href: "/categories/drinks",
        image: "https://birrabiss.com/wp-content/uploads/2017/05/Maltina-Midweek.jpg",
      },
    ],
  },
  {
    name: "Menu",
    href: "/menu",
  },
  {
    name: "About",
    href: "/about",
  },
  {
    name: "Contact",
    href: "/contact",
  },
];
