import {
  POST_BOOK,
  GET_BOOKS,
  GET_BOOK,
  DELETE_BOOK,
  SEARCH_BOOKS
} from "../actions/types";

const initialState = {
  loading: false,
  books: [],
  book: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case POST_BOOK:
      return {
        ...state,
        books: [action.payload, ...state.books]
      };
    case DELETE_BOOK:
      return {
        ...state,
        books: state.books.filter(book => book._id !== action.payload)
      };
    case GET_BOOK:
      return {
        ...state,
        book: action.payload,
        loading: false
      };
    case GET_BOOKS:
      return {
        ...state,
        books: action.payload,
        loading: false
      };
    case SEARCH_BOOKS:
      return {
        ...state,
        books: action.payload,
        loading: false
      };
    default:
      return state;
  }
};
