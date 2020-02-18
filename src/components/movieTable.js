import React, { Component } from "react";
import Like from "./like";

class MovieTable extends Component {
  raiseSort = path => {
    // if

    const sortColumn = { ...this.props.sortColumn };
    if (sortColumn.path === path) {
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    } else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }

    this.props.onSort(sortColumn);

    //check if the sort column in the state is the same as the path being passed
    //if it is then if order is asc change to desc, if orders is desc change to asc.
    //if not then change sortColumn to be equal to path and order to asc.

    // then set state with this sortColumn
  };

  render() {
    const {
      paginatedMovies,
      handleDeleteButtonClick,
      handleLikeClick,
      onSort
    } = this.props;
    return (
      <table className="table table-striped table-hover">
        <thead className="thead-dark">
          <tr>
            <th onClick={() => this.raiseSort("title")} scope="col">
              Title
            </th>
            <th onClick={() => this.raiseSort("genre.name")} scope="col">
              Genre
            </th>
            <th onClick={() => this.raiseSort("numberInStock")} scope="col">
              Stock
            </th>
            <th onClick={() => this.raiseSort("dailyRentalRate")} scope="col">
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
  }
}

export default MovieTable;
