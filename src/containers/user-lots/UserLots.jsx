import React, { Component } from "react";
import { connect } from "react-redux";
import { userLotsRequest, userLotsSelector } from "../../reducers/userLots";

import ComponentWide from "../../components/shared/component-wide";
import LotsList from "../../components/lots-list";

class Userlots extends Component {
  componentDidMount() {
    const { userLotsRequest } = this.props;
    userLotsRequest();
  }
  render() {
    const {
      userLots: { userLots }
    } = this.props;
    return (
      <div>
        <LotsList lots={userLots}>
          <LotsList.AddLot />
        </LotsList>
      </div>
    );
  }
}
const mapStateToProps = state => ({ userLots: userLotsSelector(state) });
const mapDispatchToProps = { userLotsRequest };

export default connect(mapStateToProps, mapDispatchToProps)(Userlots);
