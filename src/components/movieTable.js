import React from "react";
import Like from "./like";

const MovieTable = props => {
  const {
    paginatedMovies,
    handleDeleteButtonClick,
    handleLikeClick,
    onSort
  } = props;
  return (
    <table className="table table-striped table-hover">
      <thead className="thead-dark">
        <tr>
          <th onClick={() => onSort("title")} scope="col">
            Title
          </th>
          <th onClick={() => onSort("genre.name")} scope="col">
            Genre
          </th>
          <th onClick={() => onSort("numberInStock")} scope="col">
            Stock
          </th>
          <th onClick={() => onSort("dailyRentalRate")} scope="col">
            Rate
          </th>
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
              <Like
                liked={movie.liked}
                handleLikeClick={() => handleLikeClick(movie)}
              />
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
