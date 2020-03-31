import React from "react";
import { withTranslation } from "react-i18next";
import Header from "../../containers/header";
import Footer from "./footer";


const Layout1 = ({ children,  }) => {
  return <div>{children}</div>;
};

const Layout = withTranslation()(Layout1);
Layout.Header = Header;
Layout.Footer = Footer;
export default Layout;
