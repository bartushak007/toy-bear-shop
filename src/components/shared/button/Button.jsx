import React from "react";

import classNames from "classnames";
import style from "./button.module.scss";

const Button = ({
  handler,
  className,
  name,
  load,
  disabled,
  children,
  submit
}) => (
  <div className={classNames(style.buttonWrapper, className)}>
    <button
      onClick={handler}
      disabled={disabled}
      className={classNames(submit ? style.submitButton : style.button, {
        [style.buttonTransparentText]: load
      })}
    >
      {load && <div className={style.submitButton_load} />}
      {name || children}
    </button>
  </div>
);
export default Button;
