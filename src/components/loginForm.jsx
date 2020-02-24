import React, { Component } from "react";

class LoginForm extends Component {
  handleSubmit = e => {
    e.preventDefault();

    console.log("submittied");
  };
  render() {
    return (
      <div className="container containter-sm">
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="email"
              className="form-control"
              placeholder="name@example.com"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input id="password" type="password" className="form-control" />
          </div>
          <button className="btn btn-primary">Login</button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
