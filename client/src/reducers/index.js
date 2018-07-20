import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import bookReducer from "./bookReducer";

// Root reducer
export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  book: bookReducer
});
