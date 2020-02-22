import React from "react";
import { Container } from "react-bootstrap";
import Header from "./Header";
import Footer from "./Footer";

import ComponentWide from "../shared/component-wide";

const Layout = ({ children }) => {
  return (
    <div>
      <ComponentWide backgroundImg="https://bizcom.kz/wp-content/uploads/2014/12/footer-background-011.jpg">
        <Header />
      </ComponentWide>
      {children}
      <ComponentWide backgroundColor="black">
        <Footer />
      </ComponentWide>
    </div>
  );
};

export default Layout;
