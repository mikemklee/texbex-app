import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

// actions
import { searchBooks } from "actions/bookActions";

// components
import Spinner from "components/common/Spinner";
import BooksItem from "./BooksItem";

class BooksSearched extends Component {
  componentDidMount() {
    const { searchTerm } = this.props.match.params;
    this.props.searchBooks(searchTerm);
  }

  render() {
    const { books, loading } = this.props.book;
    const { searchTerm } = this.props.match.params;

    if (loading) {
      return <Spinner />;
    }

    if (!books) {
      return (
        <div className="books container">
          <div className="books__header">
            No texbooks found for: {searchTerm}
          </div>
        </div>
      );
    } else {
      return (
        <div className="books container">
          <div className="books__header">
            Displaying results for: <span>{searchTerm}</span>
          </div>
          {books.map(book => <BooksItem key={book._id} book={book} />)}
        </div>
      );
    }
  }
}

BooksSearched.propTypes = {
  book: PropTypes.object.isRequired,
  searchBooks: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  book: state.book
});

export default connect(
  mapStateToProps,
  { searchBooks }
)(BooksSearched);
