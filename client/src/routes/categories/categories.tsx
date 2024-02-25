import { Link, createRoute } from "@tanstack/react-router";
import { categoriesRoute } from ".";
import categoryService from "~/services/categoryService";

export const CategoryHome = () => {
  const { data } = categoriesIndexRoute.useLoaderData();
  return (
    <>
      <div>Categories </div>
      <Link to="/categories/$categorySlug" preload="intent" params={{ categorySlug: data[0].slug }}>
        jj
      </Link>
    </>
  );
};

export const categoriesIndexRoute = createRoute({
  getParentRoute: () => categoriesRoute,
  path: "/",
  component: CategoryHome,
  loader: categoryService.getCategories,
});
