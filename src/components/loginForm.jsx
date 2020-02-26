import React from "react";
import Joi from "joi-browser";
import Input from "./input";
import Form from "./form";

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {}
  };

  schema = {
    username: Joi.string()
      .required()
      .label("Username"),
    password: Joi.string()
      .required()
      .label("Password")
  };

  doSubmit = () => {
    console.log("no errors so now we can call the server or what have you..");
  };

  render() {
    return (
      <div className="container containter-sm">
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <Input
            name="username"
            label="Username"
            value={this.state.data.username}
            onChange={this.handleChange}
            error={this.state.errors.username}
          />

          <Input
            name="password"
            lable="Password"
            value={this.state.data.password}
            onChange={this.handleChange}
            error={this.state.errors.password}
          />

          <button disabled={this.validate()} className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
