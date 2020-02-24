import React, { Component } from "react";
import Like from "./like";
import Table from "./table";
import { Link } from "react-router-dom";
class MovieTable extends Component {
  columns = [
    {
      path: "title",
      label: "Title",
      content: movie => <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
    },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      content: movie => (
        <Like
          liked={movie.liked}
          handleLikeClick={() => this.props.handleLikeClick(movie)}
        />
      )
    },
    {
      key: "delete",
      content: movie => (
        <button
          type="button"
          onClick={() => this.props.handleDeleteButtonClick(movie)}
          className="btn btn-danger"
        >
          Delete
        </button>
      )
    }
  ];
  render() {
    const { paginatedMovies, onSort, sortColumn } = this.props;

    return (
      <Table
        columns={this.columns}
        sortColumn={sortColumn}
        onSort={onSort}
        data={paginatedMovies}
      />
    );
  }
}

export default MovieTable;
