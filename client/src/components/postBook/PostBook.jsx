import React, { Component } from "react";
import { Link } from "react-router-dom";

// components
import BookForm from "../forms/BookForm";

class PostBook extends Component {
  render() {
    return (
      <div className="postBook">
        <Link to="/books" className="postBook__goback">
          Go Back
        </Link>
        <h1 className="postBook__title">Post New Textbook</h1>
        <h1 className="postBook__subtitle">
          Let's fill out some information about the textbook.
        </h1>
        <BookForm />
      </div>
    );
  }
}

export default PostBook;
