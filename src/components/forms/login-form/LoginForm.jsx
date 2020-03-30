import React from "react";

const LoginForm = ({ onSubmit, onSetField, login, password, user }) => (
  <div>
    <form onSubmit={onSubmit}>
      <div>
        <input
          name="login"
          type="text"
          value={login}
          onChange={onSetField}
        />
      </div>
      <div>
        <input
          name="password"
          value={password}
          type="password"
          onChange={onSetField}
        />
      </div>
      <div>
        <button>{user.load ? "load..." : "Login"}</button>
      </div>
    </form>
  </div>
);

export default LoginForm