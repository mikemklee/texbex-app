import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

// actions
import { getBooks } from "actions/bookActions";

// components
import Spinner from "components/common/Spinner";
import BooksItem from "./BooksItem";

class BooksRecent extends Component {
  componentDidMount() {
    this.props.getBooks();
  }

  render() {
    const { books, loading } = this.props.book;

    if (loading) {
      return <Spinner />;
    }

    if (!books) {
      return (
        <div className="books container">
          <div className="books__header">No texbooks to display.</div>
        </div>
      );
    } else {
      return (
        <div className="books container">
          <div className="books__header">Recent Listings</div>
          {books.map(book => <BooksItem key={book._id} book={book} />)}
        </div>
      );
    }
  }
}

BooksRecent.propTypes = {
  book: PropTypes.object.isRequired,
  getBooks: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  book: state.book
});

export default connect(
  mapStateToProps,
  { getBooks }
)(BooksRecent);
