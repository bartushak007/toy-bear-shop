import React from "react";
import { withTranslation } from "react-i18next";
import i18next from "i18next";
import { Dropdown, DropdownButton } from "react-bootstrap";

import style from "./header.module.scss";

function Header({ t }) {
  const { languages } = i18next;

  return (
    <div className={style.header}>
      <div>
        <h1 onClick={() => i18next.changeLanguage("ua")}>
          {t("welcom-title")}
        </h1>
      </div>
      <div lg="2">
        <DropdownButton title={i18next.language} variant={"info"}>
          {languages.map(lang => (
            <Dropdown.Item
              key={lang}
              onClick={() => i18next.changeLanguage(lang)}
              eventKey={lang}
              active={i18next.language === lang}
            >
              {lang}
            </Dropdown.Item>
          ))}
        </DropdownButton>
      </div>
    </div>
  );
}

export default withTranslation()(Header);
