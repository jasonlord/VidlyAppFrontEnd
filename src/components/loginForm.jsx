import React, { Component } from "react";
import Input from "./input";

class LoginForm extends Component {
  state = {
    account: { username: "", password: "" },
    errors: {}
  };

  handleSubmit = e => {
    e.preventDefault();
    const errors = this.validate();
    console.log("errors", errors);
    this.setState({ errors: errors || {} });
    if (errors) return;
    console.log("no errors so I can submit to the server or whatever");
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const account = { ...this.state.account };
    account[input.name] = input.value;
    this.setState({ account, errors });
  };
  validateProperty = ({ name, value }) => {
    if (name === "username") {
      if (value.trim() === "") return "Username is Required.";
    }
    if (name === "password") {
      if (value.trim() === "") return "Password is Required.";
    }
  };
  validate = () => {
    const errors = {};
    if (this.state.account.username.trim() === "")
      errors.username = "Username is Required";
    if (this.state.account.password.trim() === "")
      errors.password = "Password is Required";
    console.log("inside validate fgunction");
    return Object.keys(errors).length === 0 ? null : errors;
  };
  render() {
    return (
      <div className="container containter-sm">
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <Input
            name="username"
            label="Username"
            value={this.state.account.username}
            onChange={this.handleChange}
            error={this.state.errors.username}
          />

          <Input
            name="password"
            lable="Password"
            value={this.state.account.password}
            onChange={this.handleChange}
            error={this.state.errors.password}
          />

          <button className="btn btn-primary">Login</button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
