import { Outlet } from "@tanstack/react-router";
import { rootRoute } from "../__root";

export const Categories = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export const categoriesRoute = rootRoute.createRoute({
  path: "categories",
  component: Categories,
});
