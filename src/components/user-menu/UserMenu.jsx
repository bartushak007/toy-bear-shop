import React from "react";
import i18next from "i18next";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { Link } from "react-router-dom";
import { capitalizeFirst } from "../../helpers";

import classNames from "classnames";
import style from "./usermenu.module.scss";

const UserMenu = ({ user, history, logOut }) => (
  <div className={style.userMenu}>
    {user.name ? (
      <div>
        <span>
          Welcome, {capitalizeFirst(user.name)}{" "}
          {capitalizeFirst(user.secondName)}
        </span>
        <div className={style.userMenu__drop}>
            <div className={style.userMenu__dropItem} onClick={() => history && history.push("/user/profile")}>
              Profile
            </div>
            <div className={style.userMenu__dropItem} onClick={() => history && history.push("/user/lots")}>
              Lots
            </div>
            <div className={style.userMenu__dropItem} onClick={logOut}>Log out</div>
          </div>
      </div>
    ) : (
      <>
        <Link to="/authentication/login">Login</Link> /{" "}
        <Link to="/authentication/registration">Registration</Link>
      </>
    )}
  </div>
);

export default UserMenu;

// <DropdownButton title={user.name} variant={"info"}>
//         <Dropdown.Item onClick={() => history && history.push("/user/profile")}>
//           Profile
//         </Dropdown.Item>
//         <Dropdown.Item onClick={() => history && history.push("/user/lots")}>
//           Lots
//         </Dropdown.Item>
//         <Dropdown.Item onClick={logOut}>Log out</Dropdown.Item>
//       </DropdownButton>
