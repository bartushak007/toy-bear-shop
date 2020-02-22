import React from "react";

import {} from "react-bootstrap";
import style from "./component-wide.module.scss";
const ComponentWide = ({ children, backgroundImg, backgroundColor }) => {
  return (
    <div
      className={style.componentWide}
      style={{ backgroundImage: `url(${backgroundImg})`, backgroundColor: backgroundColor }}
    >
      <div
        className={style.componentWide__inner}        
      >
        {children}
      </div>
    </div>
  );
};

export default ComponentWide;
