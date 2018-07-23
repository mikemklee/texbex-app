import React, { Component } from "react";
import Modal from "react-modal";
import moment from "moment";
import numeral from "numeral";
import _ from "lodash";

// components
import TextAreaField from "../common/TextAreaField";

// Modal Configuration
Modal.setAppElement("#root");

class ModalContact extends Component {
  state = {
    message: "",
    date: moment(),
    errors: {}
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  onSubmit = event => {
    event.preventDefault();
    const { user } = this.props.auth;
    const newMessage = {
      message: this.state.message,
      date: this.state.date,
      buyer: user.name,
      buyerPhoto: user.avatar
    };
    console.log(newMessage);
  };
  render() {
    const { isOpen, handleClose, book } = this.props;
    const { errors } = this.state;

    return (
      <Modal
        className="modalContact"
        isOpen={isOpen}
        onRequestClose={handleClose}
        shouldCloseOnOverlayClick={true}
        shouldCloseOnEsc={true}
      >
        <div className="modalContact__title">{_.startCase(book.title)}</div>
        <button className="modalContact__close" onClick={handleClose}>
          &times;
        </button>
        <div className="modalContact__course">
          <span>{book.course.toUpperCase()}</span>
          {book.school && <span>({book.school})</span>}
        </div>
        <div className="modalContact__desc">{book.description}</div>
        <div className="modalContact__date">
          {moment(book.date).format("Do MMMM, YYYY")}
        </div>
        <div className="modalContact__price">
          {numeral(book.price / 100).format("$0,0.00")}
        </div>
        <div className="modalContact__sellerInfo">
          <div className="modalContact__sellerInfo--heading">
            Contact seller directly or send an inquiry:
          </div>
          <img
            className="modalContact__sellerInfo--photo"
            src={book.sellerPhoto}
            alt="seller"
          />
          <div className="modalContact__sellerInfo--name">{book.seller}</div>
          <div className="modalContact__sellerInfo--email">
            Email: test@test.com
          </div>
          <div className="modalContact__sellerInfo--phone">
            Phone: 6476421813
          </div>
        </div>
        <div className="modalContact__inquiry">
          <TextAreaField
            placeholder={`Write a short message to ${book.seller}`}
            name="message"
            value={this.state.message}
            onChange={this.onChange}
            error={errors.message}
          />
          <div className="modalContact__inquiry--submit">Send</div>
        </div>
      </Modal>
    );
  }
}

export default ModalContact;
