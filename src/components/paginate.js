import React, { Component } from "react";
import PropTypes from "prop-types";

class Paginate extends Component {
  state = {};
  render() {
    const {
      numberOfMovies,
      pageSize,
      currentPage,
      onPaginationClick
    } = this.props;
    //console.log("page size is ", this.props.pageSize);
    //console.log("movies size is ", this.props.numberOfMovies);

    let numberOfPages = Math.ceil(numberOfMovies / pageSize);
    //console.log("number of pages - ", numberOfPages);
    let pageArray = [];
    for (let i = 0; i < numberOfPages; i++) {
      pageArray[i] = i + 1;
    }
    //console.log("pageArray is", pageArray);
    //console.log("current page is - ", currentPage);
    if (numberOfPages === 1) return null;
    return (
      <nav aria-label="Page navigation">
        <ul className="pagination">
          {pageArray.map(page => (
            <li
              key={page}
              className={
                page === currentPage ? "page-item active" : "page-item"
              }
            >
              <a onClick={() => onPaginationClick(page)} className="page-link">
                {pageArray[page - 1]}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    );
  }
}

Paginate.propTypes = {
  numberOfMovies: PropTypes.number.isRequired,
  pageSize: PropTypes.number,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func
};

export default Paginate;
