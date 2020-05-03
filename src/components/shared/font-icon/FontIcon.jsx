import React from "react";
import {} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faCheck } from "@fortawesome/free-solid-svg-icons";
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
  facebook: faFacebook,
  search: faSearch,
  checkMArk: faCheck,
};

const FontIcon = ({
  iconKey,
  link,
  className,
  iconClassName,
  blank,
  style,
  click = () => {}
}) => {
  const icon = (
    <FontAwesomeIcon
      className={iconClassName || ""}
      icon={icons[iconKey]}
      onClick={click}
    />
  );
  
  return (
    <>
      {link ? (
        <a
          className={classNames(style.fontIcon, className)}
          href={link || "#"}
          target={link && blank ? "_blank" : "_self"}
          style={style}
        >
          {icon}
        </a>
      ) : (
        icon
      )}
    </>
  );
};

export default FontIcon;
