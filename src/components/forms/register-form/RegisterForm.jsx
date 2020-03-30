import React from "react";
import DatePicker from "react-datepicker";


import "react-datepicker/dist/react-datepicker.css";

const RegisterForm = ({ onSubmit, onSetField, fields, load }) => (
  <div>
    <form onSubmit={onSubmit}>
      {Object.entries(fields).map(([key, { value }]) => (
        <div key={key}>
          <label>{key}</label>
          {key === "dateOfBirth" ? (
            <DatePicker
              dateFormat="dd.MM.yyyy"
              selected={value}
              onChange={value =>
                onSetField({
                  target: { name: "dateOfBirth", value }
                })
              }
            />
          ) : (
            <input name={key} type="text" value={value} onChange={onSetField} />
          )}
        </div>
      ))}

      <div>
        <button>{load ? "load..." : "Register"}</button>
      </div>
    </form>
  </div>
);

export default RegisterForm;
