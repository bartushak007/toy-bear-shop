import React from "react";
import { withTranslation } from "react-i18next";
import {} from "react-bootstrap";
import ComponentWide from "../components/shared/component-wide";
import Slider from "../components/slider";
import SendFrom from "../components/SendForm";

const Home = ({ t }) => {
  return (
    <div>
      <ComponentWide backgroundColor="#ccc">Home</ComponentWide>
      <Slider />
      <ComponentWide backgroundColor="#ccc">
        <SendFrom />
      </ComponentWide>
    </div>
  );
};

export default withTranslation()(Home);
