import React, { useContext } from "react";
import { withTranslation } from "react-i18next";
import {} from "react-bootstrap";
import ComponentWide from "../components/shared/component-wide";
import Slider from "../components/slider";
import SendFrom from "../components/SendForm";
import ShowBlock from "../components/show-block";
import Image from "../components/shared/image";
import { DataContext } from "../index";

const Home = ({ t }) => {
  const data = useContext(DataContext);
  return (
    <div>
      {/* <Slider /> */}
      <Image src={data.images.slider[0]} />
      <ComponentWide backgroundColor="#ccc">
        <SendFrom />
      </ComponentWide>
      {data.goods.map((product, i) => (
        <ComponentWide key={i + product.src}>
          <ShowBlock {...product} />
        </ComponentWide>
      ))}
    </div>
  );
};

export default withTranslation()(Home);
