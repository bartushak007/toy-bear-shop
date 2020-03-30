import React from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const RegisterForm = ({ onSubmit, onSetField, fields, user }) => (
  <div>
    <form onSubmit={onSubmit}>
      {Object.entries(fields).map(([key, { value }]) => (
        <div key={key}>
          <label>{key}</label>
          {key === "dateOfBirth" ? (
            <DatePicker
              selected={value}
              onChange={value =>
                onSetField({ target: { name: "dateOfBirth", value } })
              }
            />
          ) : (
            <input name={key} type="text" value={value} onChange={onSetField} />
          )}
        </div>
      ))}

      <div>
        <button>{user.load ? "load..." : "Login"}</button>
      </div>
    </form>
  </div>
);

export default RegisterForm;
