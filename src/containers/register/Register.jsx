import React, { Component } from "react";
import { connect } from "react-redux";

import {
  registerRequest,
  loadRegisterSelector,
  formFieldsSelector,
  setFormValue
} from "../../reducers/user";

import BasicForm from "../../components/forms/basic-form";

class Register extends Component {
  // componentDidMount() {
  //   const {
  //     match: { params },
  //     setCreateLot
  //   } = this.props;

  //   if (params.id) {
  //     setCreateLot(params.id);
  //   }
  // }

  // componentWillUnmount() {
  //   const { resetCreateLot } = this.props;
  //   resetCreateLot();
  // }

  onSetField = ({ target }) => {
    const { setFormValue } = this.props;
    setFormValue({ key: target.name, value: target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    // e.persist();
    const {
      // match: { params },
      registerRequest
    } = this.props;
    registerRequest();
  };

  render() {
    const { load, fields } = this.props;

    return (
      <BasicForm
        {...{
          fields,
          onSubmit: this.onSubmit,
          onSetField: this.onSetField,
          load
        }}
      />
    );
  }
}

const mapStateToProps = state => ({
  load: loadRegisterSelector(state),
  fields: formFieldsSelector(state)
});
const mapDispatchToProps = {
  registerRequest,
  setFormValue
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
