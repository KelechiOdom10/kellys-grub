import { NotFound } from "~/components/ui/error/NotFound";
import { rootRoute } from "../__root";
import MainLayout from "~/components/layouts/MainLayout";

export const notFoundRoute = rootRoute.createRoute({
  path: "*",
  component: () => (
    <MainLayout>
      <NotFound />
    </MainLayout>
  ),
});
