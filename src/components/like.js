import React from "react";
const Like = props => {
  const { liked } = props;
  if (liked)
    return (
      <i onClick={props.handleLikeClick} className="fas fa-heart fa-2x"></i>
    );
  else
    return (
      <i onClick={props.handleLikeClick} className="far fa-heart fa-2x"></i>
    );
};

export default Like;
