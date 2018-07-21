import React, { Component } from "react";
import PropTypes from "prop-types";

class BooksSearched extends Component {
  static propTypes = {
    prop: PropTypes
  };

  render() {
    const { searchTerm } = this.props.match.params;
    return (
      <div>
        <h1>Searched Books</h1>
        <h1>Displaying results for: {searchTerm}</h1>
      </div>
    );
  }
}

export default BooksSearched;
