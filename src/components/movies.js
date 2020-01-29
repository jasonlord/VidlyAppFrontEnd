import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Like from "./like";
import Paginate from "./paginate";
import _ from "lodash";

class Movies extends Component {
  state = { movies: getMovies(), pageSize: 4, currentPage: 1 };

  handleLikeClick = movie => {
    //console.log("jheart clicked", movie);

    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handleDeleteButtonClick = movie => {
    //console.log("delete button on ", movie);

    const movies = this.state.movies.filter(m => m._id !== movie._id);
    this.setState({ movies });
  };

  handlePaginationClick = page => {
    //console.log("inside handle pagination click", page);

    this.setState({ currentPage: page });

    /*
    I've clicked on a page, i want to make it active, and then have the state re-render.
    So I change the state of curent apge with setState, this will call the render function again and the 
    active class will be applied based on the cureent page
    */
  };

  render() {
    const { movies, pageSize, currentPage } = this.state; // object destructuring

    /* some code to filter the movies based on the Pagination */
    const index = (currentPage - 1) * pageSize;
    const paginatedMovies = _(movies)
      .slice(index)
      .take(pageSize)
      .value();
    /* some code to filter the movies based on the Pagination */

    return (
      <React.Fragment>
        <h1>There are {movies.length} Movies in the Database</h1>

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
                  <Like
                    liked={movie.liked}
                    onClick={() => this.handleLikeClick(movie)}
                  />
                </td>
                <td className="align-middle">
                  <button
                    type="button"
                    onClick={() => this.handleDeleteButtonClick(movie)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Paginate
          pageSize={pageSize}
          currentPage={currentPage}
          numberOfMovies={movies.length}
          onPaginationClick={this.handlePaginationClick}
        />
      </React.Fragment>
    );
  }
}

export default Movies;
