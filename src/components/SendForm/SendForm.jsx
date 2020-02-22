import React from "react";
import email from "emailjs/email";

const SendForm = () => {
  return (
    <form id="contact-form">
    <input type="hidden" className="xxx" name="contact_number"/>
    <label>Name</label>
    <input type="text" name="user_name"/>
    <label>Email</label>
    <input type="email" name="user_email"/>
    <label>Message</label>
    <textarea name="message"></textarea>
    <input type="submit" value="Send"/>
    </form>
    

  );
};

export default SendForm;


    