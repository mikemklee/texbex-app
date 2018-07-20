import axios from "axios";

import {
  GET_ERRORS,
  CLEAR_ERRORS,
  GET_BOOKS,
  GET_BOOK,
  CREATE_BOOK,
  DELETE_BOOK,
  BOOK_LOADING
} from "./types";

// Create Book
export const createBook = (bookData, history) => dispatch => {
  dispatch(clearErrors());
  axios
    .post("/api/books", bookData)
    .then(res => {
      dispatch({ type: CREATE_BOOK, payload: res.data });
      history.push("/books");
    })
    .catch(error =>
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      })
    );
};

// Get Books
export const getBooks = () => dispatch => {
  dispatch(setBookLoading());
  axios
    .get("/api/books")
    .then(res =>
      dispatch({
        type: GET_BOOKS,
        payload: res.data
      })
    )
    .catch(error =>
      dispatch({
        type: GET_BOOKS,
        payload: null
      })
    );
};

// Set loading state
export const setBookLoading = () => {
  return {
    type: BOOK_LOADING
  };
};

// Clear Errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
