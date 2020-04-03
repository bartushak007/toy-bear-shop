import React from "react";
import style from "./loader.module.scss";

const Loader = () => (
  <div className={style.loaderWrapper}>
    <div className={style.loader} />
  </div>
);

Loader.Wrapper = ({ children, pageLoad }) => <div className={style.wrapper}>{pageLoad && <Loader />}{children}</div>;

export default Loader;
