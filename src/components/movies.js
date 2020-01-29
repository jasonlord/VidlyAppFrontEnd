import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Like from "./like";

class Movies extends Component {
  state = { movies: getMovies() };

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

  render() {
    const { movies } = this.state;

    // object destructuring

    //console.log("movies is", movies());
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
            {movies.map(movie => (
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
      </React.Fragment>
    );
  }
}

export default Movies;
