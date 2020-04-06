import React from "react";
import classNames from "classnames";
import {Image, Button} from "../../shared";


import style from "./lotconstrucorform.module.scss";

const LotConstructorForm = ({ onSubmit, onSetField, fields, submitLoad }) => {

  return (
    <form className={style.constructorForm} onSubmit={onSubmit}>      
      {Object.entries(fields).map(([key, { value, error, fieldType }]) => (
        <div key={key}>
          <label style={{ width: "150px" }}>{key}</label>
          <div>
            {fieldType === "textarea" && (
              <textarea
                name={key}
                type="text"
                value={value}
                onChange={onSetField}
              />
            )}
            {(!fieldType || fieldType === "label") && (
              <input
                name={key}
                type="text"
                value={value}
                onChange={onSetField}
              />
            )}
          </div>
          {error && <div className="error">{error}</div>}
          {key === "urlImage" && (
            <div className={style.constructorForm__img}>
              <Image src={value} />
            </div>
          )}
        </div>
      ))}

      <div className={classNames(style.constructorForm__save, { load: submitLoad })}>
        <Button submit load={submitLoad}>SAVE</Button>
      </div>
    </form>
  );
};

export default LotConstructorForm;
