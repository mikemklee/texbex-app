import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import moment from "moment";

// actions
import { searchBooks } from "actions/bookActions";

// components
import Spinner from "components/common/Spinner";

class BooksSearched extends Component {
  componentDidMount() {
    const { searchTerm } = this.props.match.params;
    this.props.searchBooks(searchTerm);
  }

  render() {
    const { books, loading } = this.props.book;
    const { searchTerm } = this.props.match.params;

    if (!books) {
      return (
        <div className="books container">
          <div className="books__header">
            No texbooks found for: {searchTerm}
          </div>
        </div>
      );
    }

    if (loading) {
      return <Spinner />;
    }

    return (
      <div className="books container">
        <div className="books__header">
          Displaying results for: {searchTerm}
        </div>
        {books.map(book => (
          <div key={book._id} className="books__item">
            <div className="books__item__title">{book.title}</div>
            <div className="books__item__course">
              {book.course.toUpperCase()}
            </div>
            <div className="books__item__desc">{book.description}</div>
            <div className="books__item__date">
              {moment(book.date).format("Do MMMM, YYYY")}
            </div>
            <div className="books__item__actions">
              <button className="books__item__actions--pin">Pin</button>
              <button className="books__item__actions--contact">Contact</button>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  book: state.book
});

export default connect(
  mapStateToProps,
  { searchBooks }
)(BooksSearched);
