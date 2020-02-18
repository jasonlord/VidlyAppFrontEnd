import React, { Component } from "react";
class TableHeader extends Component {
  state = {};
  raiseSort = path => {
    // if

    const sortColumn = { ...this.props.sortColumn };
    if (sortColumn.path === path) {
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    } else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }

    this.props.onSort(sortColumn);

    //check if the sort column in the state is the same as the path being passed
    //if it is then if order is asc change to desc, if orders is desc change to asc.
    //if not then change sortColumn to be equal to path and order to asc.

    // then set state with this sortColumn
  };
  render() {
    return (
      <thead>
        <tr>
          {this.props.columns.map(column => (
            <th
              key={column.path || column.key}
              onClick={() => this.raiseSort(column.path)}
            >
              {column.label}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
