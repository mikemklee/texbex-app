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
      <div>
        <h1>Recent Books</h1>
        {books.map(book => (
          <div key={book._id}>
            <h1>{book.title}</h1>
            <h1>{book.course}</h1>
            <h1>{book.description}</h1>
            <h1>{book.seller}</h1>
            <h1>{moment(book.date).format("Do MMMM, YYYY")}</h1>
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
