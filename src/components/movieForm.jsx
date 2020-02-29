import React from "react";
import Joi from "joi-browser";
import Input from "./input";
import Form from "./form";

class MovieForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {}
  };

  schema = {
    title: Joi.string()
      .required()
      .label("Title"),
    numberInStock: Joi.string()
      .required()
      .label("Number In Stock")
      .min(0)
      .max(100),
    rate: Joi.string()
      .required()
      .min(0)
      .max(10)
      .label("Rate")
  };

  doSubmit = () => {
    console.log("no errors so now we can call the server or what have you..");
  };

  render() {
    const { match, history } = this.props;

    return (
      <div className="container containter-sm">
        <h1>Movie Id = {match.params.id}</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          <div className="form-group">
            <label htmlFor="genre">Genre</label>
            <select id="genre" name="genre" class="custom-select">
              <option value="rabbit">Rabbit</option>
              <option value="duck">Duck</option>
              <option value="fish">Fish</option>
            </select>
          </div>
          {this.renderInput("numberInStock", "Number In Stock")}
          {this.renderInput("rate", "Rate")}
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
