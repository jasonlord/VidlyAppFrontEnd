import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";

class Register extends Form {
  state = {
    data: { username: "", password: "", name: "" },
    errors: {}
  };

  schema = {
    username: Joi.string()
      .required()
      .email({ minDomainAtoms: 2 })
      .label("Username"),

    password: Joi.string()
      .required()
      .min(5)
      .max(20)
      .label("Password"),
    name: Joi.string()
      .required()
      .label("Name")
  };

  doSubmit = () => {
    console.log("no errors so now we can call the server or what have you..");
  };

  render() {
    return (
      <div className="container containter-sm">
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("name", "Name", "name")}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default Register;
