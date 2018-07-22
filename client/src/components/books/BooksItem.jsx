import React from "react";
import moment from "moment";

export default ({ book }) => {
  return (
    <div className="books__item">
      <div className="books__item__title">{book.title}</div>
      <div className="books__item__course">{book.course.toUpperCase()}</div>
      <div className="books__item__desc">{book.description}</div>
      <div className="books__item__date">
        {moment(book.date).format("Do MMMM, YYYY")}
      </div>
      <div className="books__item__actions">
        <button className="books__item__actions--keep">
          <i className="far fa-heart" />
          <span>Keep</span>
        </button>
        <button className="books__item__actions--contact">Contact</button>
      </div>
    </div>
  );
};
