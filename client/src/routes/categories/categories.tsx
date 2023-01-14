import { Link, useMatch } from "@tanstack/react-router";
import { categoriesRoute } from ".";
import categoryService from "~/services/categoryService";

export const CategoryHome = () => {
  const {
    loaderData: { data },
  } = useMatch(categoriesIndexRoute.id);

  console.log(data);
  return (
    <>
      <div>Categories </div>
      <Link to="/categories/$categorySlug" preload="intent" params={{ categorySlug: data[0].slug }}>
        jj
      </Link>
    </>
  );
};

export const categoriesIndexRoute = categoriesRoute.createRoute({
  path: "/",
  component: CategoryHome,
  loader: categoryService.getCategories,
});
