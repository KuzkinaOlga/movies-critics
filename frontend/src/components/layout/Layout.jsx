/* eslint-disable react/function-component-definition */
/* eslint-disable import/no-extraneous-dependencies */
import { Outlet } from "react-router-dom";
import Footer from "../footer/Footer";
import NavBar from "../navBar/NavBar";

const Layout = () => {
  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
