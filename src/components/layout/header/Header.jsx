import React from "react";
import i18next from "i18next";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ComponentWide, FontIcon } from "../../../components/shared";
import classNames from "classnames";
import Languages from "../../languages";
import UserMenu from "../../user-menu";
import style from "./header.module.scss";

export default ({ t, user, logOut, history }) => {
  const { languages } = i18next;

  return (
    <ComponentWide backgroundColor="#122538">
      <div className={style.header_top}>
        <Languages {...{ languages }} />
        <UserMenu {...{ user, history, logOut }} />
      </div>
      <div className={style.header}>
        <div>
          <Link to="/">
            <h1 className={style.header__logo}>{t("ONLINE-SHOP")}</h1>
          </Link>
        </div>
        <div className={style.header__search}>
          <FontIcon iconClassName={style.header__searchIcon} iconKey="search"/>
          <input />
        </div>
      </div>
    </ComponentWide>
  );
};
