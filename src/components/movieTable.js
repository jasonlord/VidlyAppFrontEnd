import React, { Component } from "react";
import Like from "./like";

const MovieTable = props => {
  const { paginatedMovies, handleDeleteButtonClick, handleLikeClick } = props;
  return (
    <table className="table table-striped table-hover">
      <thead className="thead-dark">
        <tr>
          <th scope="col">Title</th>
          <th scope="col">Genre</th>
          <th scope="col">Stock</th>
          <th scope="col">Rate</th>
          <th scope="col"></th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        {paginatedMovies.map(movie => (
          <tr key={movie._id}>
            <th className="align-middle">{movie.title}</th>
            <td className="align-middle">{movie.genre.name}</td>
            <td className="align-middle">{movie.numberInStock}</td>
            <td className="align-middle">{movie.dailyRentalRate}</td>
            <td className="align-middle">
              <Like liked={movie.liked} handleLikeClick={handleLikeClick} />
            </td>
            <td className="align-middle">
              <button
                type="button"
                onClick={() => handleDeleteButtonClick(movie)}
                className="btn btn-danger"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MovieTable;
