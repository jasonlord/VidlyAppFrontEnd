import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import _ from "lodash";
import Paginate from "./paginate";
import ListGroup from "./listGroup";
import MovieTable from "./movieTable";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    sortColumn: { path: "path", order: "ascinitstate" }
  };

  componentDidMount() {
    const genres = [
      { name: "All Genres", _id: 343943434334324233049 },
      ...getGenres()
    ];
    this.setState({ movies: getMovies(), genres: genres });
  }

  componentDidUpdate() {}
  handleLikeClick = movie => {
    console.log("inside handleLikeClick");
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    console.log("ionded,", movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handleDeleteButtonClick = movie => {
    const movies = this.state.movies.filter(m => m._id !== movie._id);
    this.setState({ movies });
  };

  handlePaginationClick = page => {
    this.setState({ currentPage: page });

    /*
    I've clicked on a page, i want to make it active, and then have the state re-render.
    So I change the state of curent apge with setState, this will call the render function again and the 
    active class will be applied based on the cureent page
    */
  };

  handleGenreSelect = genre => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  handleSort = path => {
    // if

    const sortColumn = { ...this.state.sortColumn };
    if (sortColumn.path === path) {
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    } else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }

    this.setState({ sortColumn });

    //check if the sort column in the state is the same as the path being passed
    //if it is then if order is asc change to desc, if orders is desc change to asc.
    //if not then change sortColumn to be equal to path and order to asc.

    // then set state with this sortColumn
  };

  filterMovies(selectedGenre, movies) {
    if (selectedGenre && selectedGenre._id)
      return movies.filter(m => m.genre._id === selectedGenre._id);
    else return movies;
  }

  render() {
    const {
      movies,
      pageSize,
      currentPage,
      selectedGenre,
      sortColumn
    } = this.state; // object destructuring

    const filteredMovies = this.filterMovies(selectedGenre, movies);

    const sorted = _.orderBy(
      filteredMovies,
      [sortColumn.path],
      [sortColumn.order]
    );
    /* some code to filter the movies based on the Pagination */
    const index = (currentPage - 1) * pageSize;

    const paginatedMovies = _(sorted)
      .slice(index)
      .take(pageSize)
      .value();
    /* some code to filter the movies based on the Pagination */

    return (
      <React.Fragment>
        <h1>There are {filteredMovies.length} Movies in the Database</h1>
        <br />
        <div className="container">
          <div className="row">
            <div className="col">
              <ListGroup
                selectedGenre={this.state.selectedGenre}
                items={this.state.genres}
                onItemSelect={this.handleGenreSelect}
              />
            </div>
            <div className="col-9">
              <MovieTable
                handleDeleteButtonClick={this.handleDeleteButtonClick}
                paginatedMovies={paginatedMovies}
                handleLikeClick={this.handleLikeClick}
                onSort={this.handleSort}
              />
              <Paginate
                pageSize={pageSize}
                currentPage={currentPage}
                numberOfMovies={filteredMovies.length}
                onPaginationClick={this.handlePaginationClick}
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Movies;
