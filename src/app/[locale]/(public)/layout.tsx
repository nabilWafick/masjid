import Navbar from "@/components/navbar";
import { FC, ReactNode } from "react";
import { Footer } from "react-day-picker";

interface PublicLayoutProps {
  children: ReactNode;
}

const PublicLayout: FC<PublicLayoutProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default PublicLayout;
