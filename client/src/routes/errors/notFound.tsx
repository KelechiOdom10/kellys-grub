import { NotFound } from "~/components/ui/error/NotFound";
import { rootRoute } from "../__root";
import { NotFoundRoute } from "@tanstack/react-router";

export const notFoundRoute = new NotFoundRoute({
  getParentRoute: () => rootRoute,
  component: () => <NotFound />,
});
