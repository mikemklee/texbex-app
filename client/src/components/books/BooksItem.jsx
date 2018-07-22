import React, { Component } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import numeral from "numeral";
import _ from "lodash";

// components
import ModalContact from "components/modals/ModalContact";

class BooksItem extends Component {
  state = {
    showModal: false
  };

  handleOpenModal = () => {
    this.setState({ showModal: true });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    const { book } = this.props;
    return (
      <div className="books__item">
        <div className="books__item__title">{_.startCase(book.title)}</div>
        <div className="books__item__price">
          {numeral(book.price / 100).format("$0,0.00")}
        </div>
        <div className="books__item__course">
          <span>{book.course.toUpperCase()}</span>
          {book.school && <span>({book.school})</span>}
        </div>
        <div className="books__item__desc">{book.description}</div>
        <div className="books__item__date">
          {moment(book.date).format("Do MMMM, YYYY")}
        </div>
        <div className="books__item__actions">
          <button className="books__item__actions--keep">
            <i className="far fa-heart" />
            <span>Keep</span>
          </button>
          <button
            className="books__item__actions--contact"
            onClick={this.handleOpenModal}
          >
            Contact
          </button>
          <ModalContact
            isOpen={this.state.showModal}
            handleClose={this.handleCloseModal}
            book={book}
          />
        </div>
      </div>
    );
  }
}

export default BooksItem;
