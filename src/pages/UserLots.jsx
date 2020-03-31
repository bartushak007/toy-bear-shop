import React from "react";
import Userlots from "../containers/user-lots";
import Layout from "../components/layout";

export default props => (
  <Layout>
    <Layout.Header />
    <Userlots {...props} />
    <Layout.Footer />
  </Layout>
);
