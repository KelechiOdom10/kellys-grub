import { ReactNode } from "react";
import { Footer } from "./footer";
import { Navbar } from "./navigation";

type LayoutProps = {
  children: ReactNode;
};

const MainLayout = ({ children }: LayoutProps) => {
  return (
    <>
      <Navbar />
      <main className="min-h-[70vh]">{children}</main>
      <Footer />
    </>
  );
};

export default MainLayout;
