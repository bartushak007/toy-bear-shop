import React from "react";
import Image from "../../shared/image";

const LotConstructorForm = ({ onSubmit, onSetField, fields, load }) => {
  return (
    <form style={{ marginRight: "40px" }} onSubmit={onSubmit}>
      {Object.entries(fields).map(([key, { value }]) => (
        <div key={key}>
          <label style={{width: "150px" }}>{key}</label>
          <input name={key} type="text" value={value} onChange={onSetField} />
          {key === "urlImage" && (
            <div>
              <Image style={{ width: "200px" }} src={value} />
            </div>
          )}
        </div>
      ))}

      <div>
        <button>{load ? "load..." : "Register"}</button>
      </div>
    </form>
  );
};

export default LotConstructorForm;
