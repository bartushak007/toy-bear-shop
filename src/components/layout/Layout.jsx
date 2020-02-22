import React, { useContext } from "react";
import { Container } from "react-bootstrap";
import { withTranslation } from "react-i18next";
import Header from "./Header";
import Footer from "./Footer";
import { DataContext } from "../../index";
import ComponentWide from "../shared/component-wide";



const Layout = ({ children, t }) => {

  const { nav } = useContext(DataContext);
  return (
    <div>
      <ComponentWide backgroundImg="https://bizcom.kz/wp-content/uploads/2014/12/footer-background-011.jpg">
        <Header />
      </ComponentWide>
      {children}
      <ComponentWide backgroundColor="black">
        <Footer {...{ nav, t }} />
      </ComponentWide>
    </div>
  );
};

export default withTranslation()(Layout);
