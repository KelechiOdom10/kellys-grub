import { Outlet, createRoute } from "@tanstack/react-router";
import { rootRoute } from "../__root";

export const Categories = () => {
  return <Outlet />;
};

export const categoriesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "categories",
  component: Categories,
});
