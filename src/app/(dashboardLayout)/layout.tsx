import ResponsiveDrawer from "@/components/shared/Sidebar/ResponsiveDrawer";
import React from "react";

const Dashboardlayout = ({children}: {children: React.ReactNode}) => {
  return <ResponsiveDrawer>{children}</ResponsiveDrawer>;
};

export default Dashboardlayout;
