import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";

import { registerRequest, loadRegisterSelector } from "../../reducers/user";

import RegisterForm from "../../components/forms/register-form";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      fields: {
        name: { value: "" },
        secondName: { value: "" },
        login: { value: "" },
        password: { value: "" },
        dateOfBirth: { value: "" },
        email: { value: "" },
      }
    };
  }

  resetForm = () => this.setState({ login: "", password: "" });

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
    const { fields } = this.state;
    const { registerRequest } = this.props;

    registerRequest(
      Object.entries(fields).reduce(
        (obj, [key, { value }]) => ({
          ...obj,
          [key]:
            key === "dateOfBirth"
              ? moment(value).format("YYYY_MM_DD")
              : value
        }),
        {}
      )
    );

    // this.resetForm();
  };

  render() {
    const { load, history } = this.props;
    const { fields } = this.state;

    // user.name && history.push("/");

    return (
      <RegisterForm
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

const mapStateToProps = state => ({ load: loadRegisterSelector(state) });
const mapDispatchToProps = {
  registerRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
