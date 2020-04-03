import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import {
  createLotRequest,
  userLotsSelector,
  createLotSelector,
  setCreateLot,
  setCreateLotValue,
  resetCreateLot,
  accumulateFields,
  createlotLoadingSelector
} from "../../reducers/userLots";

import LotConstructorView from "../../components/lot-constructor-view";

class Login extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    const {
      match: { params },
      setCreateLot
    } = this.props;

    if (params.id) {
      setCreateLot(params.id);
    }
  }

  componentWillUnmount() {
    const { resetCreateLot } = this.props;
    resetCreateLot();
  }

  onSetField = ({ target }) => {
    const { setCreateLotValue } = this.props;
    setCreateLotValue({ key: target.name, value: target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const {
      match: { params },
      createLotRequest
    } = this.props;
    createLotRequest(params.id);
  };

  render() {
    const { createLot, userLots } = this.props;

    return (
      <LotConstructorView
        {...{
          pageLoad: userLots.load,
          submitLoad: userLots.createlotLoading,
          onSubmit: this.onSubmit,
          onSetField: this.onSetField,
          fields: createLot,
          lotFields: { ...accumulateFields(createLot) }
        }}
      />
    );
  }
}

const mapStateToProps = state => ({
  userLots: userLotsSelector(state),
  createLot: createLotSelector(state)
});
const mapDispatchToProps = {
  createLotRequest,
  setCreateLot,
  setCreateLotValue,
  resetCreateLot
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));
