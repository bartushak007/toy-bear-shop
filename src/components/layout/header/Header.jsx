import React from "react";
import i18next from "i18next";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { Link } from "react-router-dom";
import ComponentWide from "../../../components/shared/component-wide";
import style from "./header.module.scss";


export default  ({ t, user, logOut, history }) => {
  const { languages } = i18next;

  return (
    <ComponentWide backgroundImg="https://bizcom.kz/wp-content/uploads/2014/12/footer-background-011.jpg">
      <div className={style.header}>
        <div>
          <Link className={style.header__logo} to="/">
            <h1>{t("welcom-title")}</h1>
          </Link>
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

          {user.name ? (
            <DropdownButton title={user.name} variant={"info"}>
              
              <Dropdown.Item
                onClick={() => history && history.push("/user/profile")}
              >
                Profile
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => history && history.push("/user/lots")}
              >
                Lots
              </Dropdown.Item>
              <Dropdown.Item onClick={logOut}>Log out</Dropdown.Item>
            </DropdownButton>
          ) : (
            <>
              <Link to="/authentication/login">Login</Link>{' '}/{' '}
              <Link to="/authentication/registration">Registration</Link>
            </>
          )}
        </div>
      </div>
    </ComponentWide>
  );
}


