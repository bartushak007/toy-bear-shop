import React from "react";
import {} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import style from "./font-icon.module.scss";
import {
  faTelegramPlane,
  faInstagram,
  faFacebook
} from "@fortawesome/free-brands-svg-icons";
const icons = {
  telegram: faTelegramPlane,
  instagram: faInstagram,
  facebook: faFacebook
};
const FontIcon = ({ iconKey, link, className }) => {
  return (
    <a
      className={classNames(style.fontIcon, className)}
      href={link || "#"}
      target={link ? "_blank" : "_self"}
    >
      <FontAwesomeIcon icon={icons[iconKey]} />
    </a>
  );
};

export default FontIcon;
