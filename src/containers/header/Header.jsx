import React from "react";
import { withTranslation } from "react-i18next";

import { withRouter } from "react-router-dom";

import { logOut, userSelector } from "../../reducers/user";
import { connect } from "react-redux";
import HeaderView from "../../components/layout/header";

function Header(props) {
  return <HeaderView {...props} />;
}

export default withRouter(
  withTranslation()(
    connect(state => ({ user: userSelector(state) }), { logOut })(Header)
  )
);
