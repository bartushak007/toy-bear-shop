import React from "react";
import { withTranslation } from "react-i18next";

import { withRouter } from "react-router-dom";

import { logOut, fildsSelector } from "../../reducers/user";
import { connect } from "react-redux";
import HeaderView from "../../components/layout/header";

function Header(props) {

  return <HeaderView {...props} />;
}
const mapStateToProps = state => ({ user: fildsSelector(state) });

export default withRouter(
  withTranslation()(
    connect(mapStateToProps, { logOut })(Header)
  )
);
