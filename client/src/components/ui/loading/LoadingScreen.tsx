import { LoadingIndicator } from "./LoadingIndicator";

type Props = {
  message?: string;
};

export const LoadingScreen = ({ message = "" }: Props) => {
  return (
    <>
      {" "}
      <div className="-mt-16 flex h-screen w-screen flex-col items-center justify-center space-y-16 text-brand">
        <LoadingIndicator />
        <h1 className="pl-6 text-center text-2xl font-bold tracking-widest  md:text-4xl">{message}</h1>
      </div>
    </>
  );
};
