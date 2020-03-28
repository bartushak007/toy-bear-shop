import React, { Component } from "react";
import Layout from "../components/layout";
import { loginRequest, userSelector } from "../reducers/user";
import { connect } from "react-redux";

class Login extends Component {
  constructor() {
    super();
    this.state = { login: "mYyyyyyyy", password: "yyyyyyyyy" };
  }

  resetForm = () => this.setState({ login: "", password: "" });

  onSetField = ({ target }) => this.setState({ [target.name]: target.value });

  onSubmit = e => {
    e.preventDefault();
    const { login, password } = this.state;
    const { loginRequest } = this.props;

    loginRequest({ login, password });

    // this.resetForm();
  };

  render() {
    const { user, history } = this.props;
    const { login, password } = this.state;
    user.name && history.push('/')
    return (
      <Layout>
        <Layout.Header />
        <div>
          <form onSubmit={this.onSubmit}>
            <div>
              <input
                name="login"
                type="text"
                value={login}
                onChange={this.onSetField}
              />
            </div>
            <div>
              <input
                name="password"
                value={password}
                type="password"
                onChange={this.onSetField}
              />
            </div>
            <div>
              <button>{user.load ? "load..." : "Login"}</button>
            </div>
          </form>
        </div>
      </Layout>
    );
  }
}

export default connect(state => ({ user: userSelector(state) }), {
  loginRequest
})(Login);
