import React, { Component } from "react";
import { connect } from "react-redux";

import { userSelector } from "../../reducers/user";

class User extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { user, history } = this.props;

    return (
      <div>
        {Object.entries(user).map(([field, text]) => (
          <div key={field}>
            {field}:{text}
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({ user: userSelector(state) });
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(User);
