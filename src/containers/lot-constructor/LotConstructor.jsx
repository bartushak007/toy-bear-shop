import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { createLotRequest, userLotsSelector } from "../../reducers/userLots";

import LotConstructorForm from "../../components/forms/lot-constructor-form";
import Lot from "../../components/lot";

const fields = {
  productName: { value: "" },
  description: { value: "" },
  urlImage: { value: "" },
  quantity: { value: "" },
  added: { value: "" },
  characteristic: { value: "" },
  asset: { value: "" },
  price: { value: "" }
};

class Login extends Component {
  constructor() {
    super();
    this.state = { fields };
  }

  resetForm = () => this.setState({ fields });
  componentDidMount() {
    const {
      match: { params },
      userLots
    } = this.props;
    if (params.id) {
      const lot = userLots.userLots.filter(({ _id }) => _id === params.id)[0];
      lot &&
        this.setState({
          fields: Object.entries(lot).reduce(
            (acc, [key, value]) => ({ ...acc, [key]: { value } }),
            {}
          )
        });
    }
  }

  onSetField = ({ target }) => {
    const { fields } = this.state;

    this.setState({
      fields: {
        ...fields,
        [target.name]: { ...fields[target.name], value: target.value }
      }
    });
  };

  onSubmit = e => {
    e.preventDefault();

    e.preventDefault();
    const { fields } = this.state;
    const { createLotRequest } = this.props;

    createLotRequest(this.accumulateFields(fields));
  };

  accumulateFields = fields =>
    Object.entries(fields).reduce(
      (obj, [key, { value }]) => ({
        ...obj,
        [key]: value
      }),
      {}
    );

  render() {
    const { user, history } = this.props;
    const { fields } = this.state;
    console.log("this.props;", this.props.match);
    return (
      <div
        style={{ display: "flex", justifyContent: "center", margin: "40px 0" }}
      >
        <LotConstructorForm
          {...{
            onSubmit: this.onSubmit,
            onSetField: this.onSetField,
            fields: fields
          }}
        />
        {console.log(fields)}
        <Lot {...this.accumulateFields(fields)} />
      </div>
    );
  }
}

const mapStateToProps = state => ({ userLots: userLotsSelector(state) });
const mapDispatchToProps = {
  createLotRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));
