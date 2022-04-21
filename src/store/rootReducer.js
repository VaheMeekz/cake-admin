import { combineReducers } from "redux";
import { isAuthReducer } from "./reducers/authReducer";
import { usersReducer } from "./reducers/usersReducer";
import {aboutUsReducer} from "./reducers/aboutUsReducer"
export const rootReducer = combineReducers({
  isAuthReducer,
  usersReducer,
  aboutUsReducer,
});
