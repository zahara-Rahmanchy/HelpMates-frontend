import Footer from "@/components/shared/Footer/Footer";
import Navbar from "@/components/shared/Navbar/Navbar";
import {Container} from "@mui/material";
import React, {ReactNode} from "react";

const MainLayout = ({children}: {children: ReactNode}) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default MainLayout;
