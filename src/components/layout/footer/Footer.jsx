import React, {useContext} from "react";
import { ListGroup } from "react-bootstrap";
import FontIcon from "../../shared/font-icon";
import style from "./footer.module.scss";
import { NavLink } from "react-router-dom";
import ComponentWide from "../../shared/component-wide";
import { withTranslation } from "react-i18next";
import { DataContext } from "../../../index";

const Footer = ({ t }) => {
const { nav } = useContext(DataContext);
  return (
    <ComponentWide backgroundColor="black">
      <div className={style.footer}>
        <div>
          {nav.map(({ link, to, exact }) => (
            <NavLink
              exact={exact}
              key={link + to}
              className={style.nav}
              activeClassName={style.nav__active}
              to={to}
            >
              {t(link)}
            </NavLink>
          ))}
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
    </ComponentWide>
  );
};

export default withTranslation()(Footer);
