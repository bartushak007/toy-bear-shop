import React from "react";
import Lots from "../containers/lots";
import Layout from "../components/layout";

export default props => (
  <Layout>
    <Layout.Header />
    <Lots {...props} />
    <Layout.Footer />
  </Layout>
);
