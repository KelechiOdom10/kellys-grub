import { Outlet } from "@tanstack/react-router";
import { rootRoute } from "../__root";
import MainLayout from "~/components/layouts/MainLayout";

export const Categories = () => {
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
};

export const categoriesRoute = rootRoute.createRoute({
  path: "categories",
  component: Categories,
});
