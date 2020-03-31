import React from "react";

import classNames from "classnames";
import style from "./button.module.scss";

const Button = ({ handler, className, name, load, disabled, children }) => (
  <button
    onClick={handler}
    disabled={disabled}
    className={classNames(style.button, className, { [style.load]: load })}
  >
    {name || children}
  </button>
);
export default Button;
