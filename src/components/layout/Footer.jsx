import React from "react";
import { ListGroup } from "react-bootstrap";
import FontIcon from "../shared/font-icon";
import style from "./footer.module.scss";
import { NavLink } from "react-router-dom";

const Footer = ({}) => {
  return (
    <div className={style.footer}>
      <div>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/Nolink">Nolink</NavLink>
      </div>
      <ListGroup horizontal>
        <div className={style.footer__icon}>
          <FontIcon iconKey="telegram" />
        </div>
        <div className={style.footer__icon}>
          <FontIcon iconKey="instagram" />
        </div>
        <div className={style.footer__icon}>
          <FontIcon iconKey="facebook" />
        </div>
      </ListGroup>
    </div>
  );
};

export default Footer;
