import { Button } from "../button";

type NotFoundProps = {
  message?: string;
};
export const NotFound = ({ message = "Oops this page couldn't be found" }: NotFoundProps) => {
  return (
    <div className="mx-auto h-screen w-screen p-8">
      <div className="flex h-full w-full flex-col space-y-8 pt-28 md:pt-32">
        <h1 className="text-center text-4xl font-extrabold md:text-5xl lg:text-6xl">{message}</h1>
        <h2 className="flex items-center justify-center text-9xl font-extrabold text-red-500 md:text-[130px]  lg:text-[240px]">
          4{" "}
          <span>
            <img
              loading="eager"
              src="/images/tomato.svg"
              alt="Tomato SVG"
              className="lg:max-h-5/6 max-h-20 w-full self-center object-cover pl-4 md:max-h-40 md:pl-8"
            />
          </span>
          4
        </h2>
        <div className="flex flex-wrap justify-center space-x-0 md:space-x-4">
          <Button
            intent="secondary"
            className="mb-4 w-full md:w-auto"
            size="lg"
            as="link"
            to="/"
            search={{}}
            params={{}}
          >
            Go to Homepage
          </Button>

          <Button
            intent="secondary-outline"
            className="mb-4 w-full md:w-auto"
            size="lg"
            as="link"
            to="/contact"
            search={{}}
            params={{}}
          >
            Contact Us
          </Button>
        </div>
      </div>
    </div>
  );
};
