import React from "react";

import { Link } from "react-router-dom";
import { capitalizeFirst } from "../../helpers";

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
          <div
            className={style.userMenu__dropItem}
            onClick={() => history && history.push("/user/profile")}
          >
            Profile
          </div>
          <div
            className={style.userMenu__dropItem}
            onClick={() => history && history.push("/user/lots")}
          >
            Lots
          </div>
          <div className={style.userMenu__dropItem} onClick={logOut}>
            Log out
          </div>
        </div>
      </div>
    ) : (
      <>
        <Link to="/authentication/login">Login</Link>
        <span className={style.userMenu__divider}>{"|"}</span>
        <Link to="/authentication/registration">Registration</Link>
      </>
    )}
  </div>
);

export default UserMenu;
