import React, { Component } from "react";
import Like from "./like";
import TableHeader from "./tableHeader";

class MovieTable extends Component {
  columns = [
    { path: "title", label: "Title" },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    { key: "like" },
    { key: "delete" }
  ];
  render() {
    const {
      paginatedMovies,
      handleDeleteButtonClick,
      handleLikeClick,
      onSort,
      sortColumn
    } = this.props;
    return (
      <table className="table table-striped table-hover">
        <TableHeader
          columns={this.columns}
          sortColumn={sortColumn}
          onSort={onSort}
        />
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
