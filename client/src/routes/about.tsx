import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./__root";

export const About = () => {
  return <div>About</div>;
};

export const aboutRoute = createRoute({
  getParentRoute() {
    return rootRoute;
  },
  path: "/about",
  component: About,
});
