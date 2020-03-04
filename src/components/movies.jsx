import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import _ from "lodash";
import Paginate from "../utils/paginate";
import ListGroup from "./common/listGroup";
import MovieTable from "./movieTable";
import Searchbox from "./searchbox";
import { Link } from "react-router-dom";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    sortColumn: { path: "path", order: "asc" },
    searchQuery: "",
    selectedGenre: null
  };

  componentDidMount() {
    const genres = [{ name: "All Genres", _id: "all" }, ...getGenres()];
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

  handleSearch = query => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
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
    this.setState({ selectedGenre: genre, searchQuery: "", currentPage: 1 });
  };

  filterMovies = (selectedGenre, movies) => {
    if (selectedGenre && selectedGenre._id) {
      if (selectedGenre._id === "all") {
        return movies;
      }

      return movies.filter(m => m.genre._id === selectedGenre._id);
    } else {
      return movies;
    }
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  render() {
    const {
      movies,
      pageSize,
      currentPage,
      selectedGenre,
      sortColumn,
      searchQuery
    } = this.state; // object destructuring

    let filteredMovies = this.filterMovies(selectedGenre, movies);

    if (searchQuery)
      filteredMovies = movies.filter(m =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedGenre && selectedGenre._id)
      filteredMovies = movies.filter(m => m.genre._id === selectedGenre._id);

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
        <div className="container">
          <Link
            to="/movies/new"
            id="newMovieButton"
            className="btn btn-primary "
          >
            New Movie
          </Link>
          <h1>There are {filteredMovies.length} Movies in the Database</h1>
          <br />
          <div className="row">
            <div className="col">
              <ListGroup
                selectedGenre={this.state.selectedGenre}
                items={this.state.genres}
                onItemSelect={this.handleGenreSelect}
              />
            </div>

            <div className="col-9">
              <Searchbox value={searchQuery} onChange={this.handleSearch} />
              <MovieTable
                paginatedMovies={paginatedMovies}
                handleLikeClick={this.handleLikeClick}
                handleDeleteButtonClick={this.handleDeleteButtonClick}
                onSort={this.handleSort}
                sortColumn={this.state.sortColumn}
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
