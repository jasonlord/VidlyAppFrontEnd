import React, { Component } from "react";

class LoginForm extends Component {
  state = { account: { username: "", password: "" } };

  handleSubmit = e => {
    e.preventDefault();
  };

  handleChange = e => {
    const account = { ...this.state.account };
    account[e.currentTarget.name] = e.currentTarget.value;
    this.setState({ account });
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
              value={this.state.account.username}
              type="email"
              className="form-control"
              placeholder="name@example.com"
              onChange={this.handleChange}
              name="username"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              className="form-control"
              value={this.state.account.password}
              onChange={this.handleChange}
              name="password"
            />
          </div>
          <button className="btn btn-primary">Login</button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
