import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Header />
      <main className="min-h-screen mb-4 px-5">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
