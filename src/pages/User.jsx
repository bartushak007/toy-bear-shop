import React from "react";
import User from "../containers/user";
import Layout from "../components/layout";

export default props => (
  <Layout>
    <Layout.Header />
    <User {...props} />
    <Layout.Footer />
  </Layout>
);
