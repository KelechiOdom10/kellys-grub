import { rootRoute } from "../__root";

export const About = () => {
  return <div>About</div>;
};

export const aboutRoute = rootRoute.createRoute({
  path: "/about",
  component: About,
});
