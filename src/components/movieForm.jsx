import React from "react";
import Joi from "joi-browser";
import Input from "./input";
import Form from "./form";
import { getGenres } from "../services/fakeGenreService";
import { getMovies, getMovie, saveMovie } from "../services/fakeMovieService";

class MovieForm extends Form {
  state = {
    data: { title: "", genreId: "", numberInStock: "", dailyRentalRate: "" },
    genres: [],
    errors: {}
  };

  schema = {
    title: Joi.string()
      .required()
      .label("Title"),
    numberInStock: Joi.number()
      .required()
      .integer()
      .min(0)
      .max(100)
      .label("Number In Stock"),
    dailyRentalRate: Joi.number()
      .required()
      .min(0)
      .max(10)
      .label("Rate"),
    _id: Joi.string(),
    genreId: Joi.string()
      .required()
      .label("Genre")
  };

  componentDidMount() {
    const genres = getGenres();
    this.setState({ genres: genres });

    const movieId = this.props.match.params.id;

    if (movieId === "new") return;

    const movie = getMovie(movieId);

    if (!movie) return this.props.history.replace("/not-found");
    this.setState({ data: this.mapToViewModel(movie) });

    //console.log("mounted, with", genres[0].name);
  }

  mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate
    };
  }

  doSubmit = () => {
    saveMovie(this.state.data);
    this.props.history.push("/movies");
    console.log("no errors so now we can call the server or what have you..");
  };

  render() {
    const { match, history } = this.props;

    return (
      <div className="container containter-sm">
        <h1>Movie Id = {this.state.data.title}</h1>
        <form onSubmit={this.doSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderSelect("genreId", "Genre", this.state.genres)}
          {this.renderInput("numberInStock", "Number In Stock")}
          {this.renderInput("dailyRentalRate", "Rate")}
        </form>
        <button
          id="saveButtonMovieForm"
          className="btn btn-primary"
          onClick={() => history.push("/movies")}
        >
          Save
        </button>
      </div>
    );
  }
}

export default MovieForm;
