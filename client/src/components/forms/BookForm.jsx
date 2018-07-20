import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import moment from "moment";

// actions
import { postBook } from "actions/bookActions";

// components
import TextField from "../common/TextField";
import TextAreaField from "../common/TextAreaField";

class BookForm extends Component {
  state = {
    title: "",
    course: "",
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

  onSubmit = event => {
    event.preventDefault();
    const { user } = this.props.auth;
    const newBook = {
      title: this.state.title,
      course: this.state.course,
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
          label="Title"
          value={this.state.title}
          onChange={this.onChange}
          error={errors.title}
        />
        <TextField
          placeholder="e.g., RSM222"
          name="course"
          label="Course Code"
          value={this.state.course}
          onChange={this.onChange}
          error={errors.course}
        />
        <TextAreaField
          placeholder="e.g., in mint condition, with no markings or rips"
          name="description"
          label="Description"
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
