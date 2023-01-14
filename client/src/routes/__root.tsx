import { createRouteConfig } from "@tanstack/react-router";
import { lazy } from "react";
import { IS_PROD } from "~/utils/constants";

export const TanStackRouterDevtools = IS_PROD
  ? () => null // Render nothing in production
  : lazy(() =>
      // Lazy load in development
      import("@tanstack/react-router-devtools").then((res) => ({
        default: res.TanStackRouterDevtools,
        // For Embedded Mode
        // default: res.TanStackRouterDevtoolsPanel
      }))
    );

export const rootRoute = createRouteConfig();
