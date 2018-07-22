import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import moment from "moment";

// actions
import { getBooks } from "actions/bookActions";

class BooksRecent extends Component {
  componentDidMount() {
    this.props.getBooks();
  }

  render() {
    const { books } = this.props.book;

    return (
      <div className="books container">
        <div className="books__header">Recent Listings</div>
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
  { getBooks }
)(BooksRecent);
