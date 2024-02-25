import { createRoute } from "@tanstack/react-router";
import { categoriesRoute } from ".";
import categoryService from "~/services/categoryService";

export const Category = () => {
  const { data } = categoryRoute.useLoaderData();
  const params = categoryRoute.useParams();
  return (
    <div>
      Category {params.categorySlug} {data.name}
    </div>
  );
};

export const categoryRoute = createRoute({
  getParentRoute: () => categoriesRoute,
  path: "$categorySlug",
  component: Category,
  loader: async ({ params }) => categoryService.getCategory(params.categorySlug),
});
