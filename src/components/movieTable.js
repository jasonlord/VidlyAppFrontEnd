import React, { Component } from "react";
import Like from "./like";
import Table from "./table";

class MovieTable extends Component {
  columns = [
    { path: "title", label: "Title" },
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
