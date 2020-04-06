import React, { useReducer } from "react";

import classNames from "classnames";
import emailjs from "emailjs-com";
import style from "./send-form.module.scss";
const initValue = {
  name: "",
  email: "",
  text: "",
  phone: ""
};
function reducer(state, action) {
  switch (action.type) {
    case "name":
      return { ...state, name: action.payload };
    case "phone":
      return { ...state, phone: action.payload };
    case "email":
      return {
        ...state,
        email: {
          value: action.payload,
          error: !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
            action.payload
          )
        }
      };
    case "text":
      return { ...state, text: action.payload };
    case "clear":
      return { ...initValue };
    default:
      throw new Error();
  }
}

export default function SendForm() {
  const [stateForm, dispatchFrom] = useReducer(reducer, initValue);

  function sendEmail(e) {
    e.preventDefault();

    emailjs
      .sendForm(
        "iryna",
        "template_Q0cWPtxM",
        e.target,
        "user_DNvGDlLmJeKu6MUJMWsRd"
      )
      .then(
        result => {
          console.log(result.text);
          dispatchFrom({ type: "clear" });
        },
        error => {
          console.log(error.text);
        }
      );
  }

  const handleName = ({ target }) =>
    dispatchFrom({ type: "name", payload: target.value });
  const handleText = ({ target }) =>
    dispatchFrom({ type: "text", payload: target.value });
  const handleEmail = ({ target }) =>
    dispatchFrom({ type: "email", payload: target.value });
  const handlePhone = ({ target }) =>
    dispatchFrom({ type: "phone", payload: target.value });

  return (
    <form className={style.sendForm} onSubmit={sendEmail}>
      <input type="hidden" name="contact_number" />
      <div className={style.sendForm__fieldContainer}>
        <label>Name</label>
        <input
          className={style.sendForm__field}
          value={stateForm.name}
          onChange={handleName}
          type="text"
          name="from_name"
        />
      </div>
      <div className={style.sendForm__fieldContainer}>
        <label>Email</label>
        <input
          className={classNames(style.sendForm__field, {
            [style.error]: stateForm.email.error
          })}
          value={stateForm.email.value}
          onChange={handleEmail}
          type="email"
          name="user_email"
        />
      </div>
      <div className={style.sendForm__fieldContainer}>
        <label>Phone number</label>
        <input
          className={style.sendForm__field}
          value={stateForm.phone}
          onChange={handlePhone}
          name="phone_number"
        />
      </div>
      <div className={style.sendForm__fieldContainer}>
        <label>Message</label>
        <textarea
          className={style.sendForm__field}
          value={stateForm.text}
          onChange={handleText}
          name="message_html"
        />
      </div>

      <input className={style.sendForm__send} type="submit" value="Send" disabled={!stateForm.phone && stateForm.email.error}/>
    </form>
  );
}
