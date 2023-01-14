import { RouterProvider, createReactRouter } from "@tanstack/react-router";
import { rootRoute } from "./routes/__root";
import { indexRoute } from "./routes";
import { categoriesRoute } from "./routes/categories";
import { categoryRoute } from "./routes/categories/category";
import { categoriesIndexRoute } from "./routes/categories/categories";
import { aboutRoute } from "./routes/about";
import { notFoundRoute } from "./routes/errors/notFound";
import { LoadingScreen } from "./components/ui/loading";

const routeConfig = rootRoute.addChildren([
  indexRoute,
  aboutRoute,
  categoriesRoute.addChildren([categoriesIndexRoute, categoryRoute]),
  notFoundRoute,
]);

export const router = createReactRouter({ routeConfig, defaultPendingComponent: () => <LoadingScreen /> });

export function Router() {
  return <RouterProvider router={router} defaultPreload="intent" />;
}

declare module "@tanstack/react-router" {
  interface RegisterRouter {
    router: typeof router;
  }
}
