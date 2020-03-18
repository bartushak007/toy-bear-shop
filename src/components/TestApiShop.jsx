// https://shop-app-brtshk.herokuapp.com/api/products
import React, { useContext, useState } from "react";
import { withTranslation } from "react-i18next";
import ComponentWide from "../components/shared/component-wide";

import { DataContext } from "../index";

const TestApiShop = ({ t }) => {
  const [data, setData] = useState([]);
  React.useEffect(() => {
    try {
      fetch(
        "https://shop-app-brtshk.herokuapp.com/api/products"
      ).then(res => res.json()).then(console.log)

      // const response = await fetch(
      //   "https://shop-app-brtshk.herokuapp.com/api/products"
      // );
      // const dataResponse = await response.json();
      // setData(dataResponse);
    } catch (e) {
      console.log(e);
    }
  }, []);
return <ComponentWide backgroundColor="#ccc">{console.log(data)}</ComponentWide>;
};

export default withTranslation()(TestApiShop);
