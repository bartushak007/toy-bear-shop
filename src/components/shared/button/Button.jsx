import React from "react";

import classNames from "classnames";
import style from "./button.module.scss";

const Button = ({ hendler, className, name, load, disabled, children }) => (
  <button
    onClick={hendler}
    disabled={disabled}
    className={classNames(style.button, className, { [style.load]: load })}
  >
    {name || children}
  </button>
);
export default Button;
