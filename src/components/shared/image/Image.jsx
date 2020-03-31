import React from "react";
import { resolvePath } from "../../../helpers";
import classNames from "classnames";
import style from "./image.module.scss";

const Image = ({ src, alt, className }) => (
  <img
    {...{
      src: typeof src === "string" ? resolvePath(src) : src,
      alt,
      className: classNames(style.image, className)
    }}
  />
);
export default Image;
