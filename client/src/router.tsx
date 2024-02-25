import { RouterProvider, createRouter } from "@tanstack/react-router";
import { rootRoute } from "./routes/__root";
import { indexRoute } from "./routes";
import { categoriesRoute } from "./routes/categories";
import { categoryRoute } from "./routes/categories/category";
import { categoriesIndexRoute } from "./routes/categories/categories";
import { aboutRoute } from "./routes/about";
import { LoadingScreen } from "./components/ui/loading";

const routeTree = rootRoute.addChildren([
  indexRoute,
  aboutRoute,
  categoriesRoute.addChildren([categoriesIndexRoute, categoryRoute]),
]);

export const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  defaultStaleTime: 5000,
  defaultPendingComponent: LoadingScreen,
});

export function Router() {
  return <RouterProvider router={router} />;
}

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
