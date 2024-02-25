import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import MainLayout from "~/components/layouts/MainLayout";
import { NotFound } from "~/components/ui/error";

export const rootRoute = createRootRoute({
  component: () => (
    <MainLayout>
      <Outlet />
      <TanStackRouterDevtools position="bottom-right" initialIsOpen={false} />
    </MainLayout>
  ),
  notFoundComponent: () => <NotFound />,
});
