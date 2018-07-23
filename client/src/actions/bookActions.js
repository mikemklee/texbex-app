import axios from "axios";

import {
  GET_ERRORS,
  CLEAR_ERRORS,
  GET_BOOKS,
  SEARCH_BOOKS,
  POST_BOOK,
  BOOK_LOADING
} from "./types";

// Post Book
export const postBook = (bookData, history) => dispatch => {
  dispatch(clearErrors());
  axios
    .post("/api/books", bookData)
    .then(res => {
      dispatch({ type: POST_BOOK, payload: res.data });
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

// Search Books
export const searchBooks = searchTerm => dispatch => {
  dispatch(setBookLoading());
  axios
    .get(`/api/books/search/${searchTerm}`)
    .then(res => dispatch({ type: SEARCH_BOOKS, payload: res.data }))
    .catch(error => dispatch({ type: SEARCH_BOOKS, payload: null }));
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
