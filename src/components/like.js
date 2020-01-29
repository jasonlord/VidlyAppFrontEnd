import React, { Component } from "react";
class Like extends Component {
  state = {};

  render() {
    const { liked } = this.props;
    if (liked)
      return (
        <i onClick={this.props.onClick} className="fas fa-heart fa-2x"></i>
      );
    else
      return (
        <i onClick={this.props.onClick} className="far fa-heart fa-2x"></i>
      );
  }
}

export default Like;
