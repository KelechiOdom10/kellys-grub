import { NotFound } from "~/components/ui/error/NotFound";
import { rootRoute } from "../__root";

export const notFoundRoute = rootRoute.createRoute({
  path: "*",
  component: NotFound,
});
