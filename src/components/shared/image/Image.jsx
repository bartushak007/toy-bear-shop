import React from "react";
import classNames from "classnames";
import style from "./image.module.scss";

const Image = ({ src, alt, className }) => {
  const resolvePath = (
    filePath,
    prefix = process.env.PUBLIC_URL.concat("/")
  ) => (filePath.startsWith("http") ? filePath : prefix.concat(filePath));

  return (
    <img className={classNames(style.image, className)} src={resolvePath(src)} alt={alt} />
  );
};

export default Image;
