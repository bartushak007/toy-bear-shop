import React from "react";
import LotConstructor from "../containers/lot-constructor";
import Layout from "../components/layout";

export default props => (
  <Layout>
    <Layout.Header />
    {console.log(props)}
    <LotConstructor  />
    <Layout.Footer />
  </Layout>
);
