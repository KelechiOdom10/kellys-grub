import {
  RouterProvider,
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
  useRouterState,
} from "@tanstack/react-router";
import { createContext, useContext, type ReactNode } from "react";

//#region Dummy story router
function RenderStory() {
  const storyFn = useContext(CurrentStoryContext);
  if (!storyFn) {
    throw new Error("Storybook root not found");
  }
  return storyFn();
}

export const CurrentStoryContext = createContext<(() => ReactNode) | undefined>(undefined);

function NotFoundComponent() {
  const state = useRouterState();
  return (
    <div>
      <i>Warning:</i> Simulated route not found for path <code>{state.location.href}</code>
    </div>
  );
}

const storyPath = "/__story__";
const storyRoute = createRoute({
  path: storyPath,
  getParentRoute: () => rootRoute,
  component: RenderStory,
});

const rootRoute = createRootRoute({
  notFoundComponent: NotFoundComponent,
});
rootRoute.addChildren([storyRoute]);

export const storyRouter = createRouter({
  history: createMemoryHistory({ initialEntries: [storyPath] }),
  routeTree: rootRoute,
});
//#endregion

export function storyRouterDecorator(storyFn: () => ReactNode) {
  return (
    <CurrentStoryContext.Provider value={storyFn}>
      <RouterProvider router={storyRouter} />
    </CurrentStoryContext.Provider>
  );
}
