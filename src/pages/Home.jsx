import React, { useContext } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import {} from "react-bootstrap";
import ComponentWide from "../components/shared/component-wide";
import Slider from "../components/slider";
import SendFrom from "../components/SendForm";
import ShowBlock from "../components/show-block";
import Image from "../components/shared/image";
import Layout from "../components/layout";
import Lots from "../containers/lots";
import { DataContext } from "../index";

const Home = ({ t, ...props }) => {
  const data = useContext(DataContext);
  return (
    <Layout>
      <Layout.Header />
      <div>
        {/* <Slider /> */}
        {/* <Image src={data.images.slider[0]} /> */}
        <ComponentWide>
          <Lots />
        </ComponentWide>
        <ComponentWide backgroundColor="#ccc">
          <SendFrom />
        </ComponentWide>
        {data.goods.map((product, i) => (
          <ComponentWide key={i + product.src}>
            <ShowBlock {...product} />
          </ComponentWide>
        ))}
      </div>
      <Layout.Footer />
    </Layout>
  );
};

export default withTranslation()(connect(store => ({ ...store }))(Home));
