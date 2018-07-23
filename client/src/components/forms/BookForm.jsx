import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import moment from "moment";

// actions
import { postBook } from "actions/bookActions";

// components
import TextField from "../common/TextField";
import PriceField from "../common/PriceField";
import TextAreaField from "../common/TextAreaField";

class BookForm extends Component {
  state = {
    title: "",
    course: "",
    school: "",
    price: "",
    description: "",
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

  onPriceChange = event => {
    const price = event.target.value;
    if (!price || price.match(/^\d{1,}(\.\d{0,2})?$/)) {
      this.setState({ price });
    }
  };

  onSubmit = event => {
    event.preventDefault();
    const { user } = this.props.auth;
    const newBook = {
      title: this.state.title,
      course: this.state.course,
      school: this.state.school,
      price: this.state.price,
      description: this.state.description,
      date: this.state.date,
      seller: user.name,
      sellerPhoto: user.avatar
    };
    this.props.postBook(newBook, this.props.history);
  };

  render() {
    const { errors } = this.state;

    return (
      <form className="bookForm" onSubmit={this.onSubmit}>
        <TextField
          placeholder="e.g., Managerial Accounting 8th Edition"
          name="title"
          label="* Title"
          value={this.state.title}
          onChange={this.onChange}
          error={errors.title}
        />
        <TextField
          placeholder="e.g., RSM222"
          name="course"
          label="* Course Code"
          value={this.state.course}
          onChange={this.onChange}
          error={errors.course}
        />
        <TextField
          placeholder="e.g., University of Toronto"
          name="school"
          label="School"
          value={this.state.school}
          onChange={this.onChange}
          error={errors.school}
        />
        <PriceField
          placeholder="e.g., enter 4000 for $40.00"
          name="price"
          label="* Price"
          value={this.state.price}
          onChange={this.onPriceChange}
          error={errors.price}
        />
        <TextAreaField
          placeholder="e.g., in mint condition, with no markings or rips"
          name="description"
          label="* Description"
          value={this.state.description}
          onChange={this.onChange}
          error={errors.description}
        />
        <input type="submit" value="Submit" className="bookForm__submit" />
      </form>
    );
  }
}

BookForm.propTypes = {
  postBook: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default withRouter(
  connect(
    mapStateToProps,
    { postBook }
  )(BookForm)
);
