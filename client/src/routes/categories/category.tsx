import { useMatch } from "@tanstack/react-router";
import { categoriesRoute } from ".";
import categoryService from "~/services/categoryService";

export const Category = () => {
  const {
    params,
    loaderData: { data },
  } = useMatch(categoryRoute.id);
  return (
    <div>
      Category {params.categorySlug} {data.name}
    </div>
  );
};

export const categoryRoute = categoriesRoute.createRoute({
  path: "$categorySlug",
  component: Category,
  loader: async ({ params }) => categoryService.getCategory(params.categorySlug),
});
