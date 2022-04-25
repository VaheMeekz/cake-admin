import { combineReducers } from "redux";
import { isAuthReducer } from "./reducers/authReducer";
import { usersReducer } from "./reducers/usersReducer";
import { aboutUsReducer } from "./reducers/aboutUsReducer";
import { contactUsReducer } from "./reducers/contactUsReducer";
import { subscribersReducer } from "./reducers/subscribersReducer";
import { infoReducer } from "./reducers/infoReducer";
import { bannersReducer } from "./reducers/bannersReducer";
import { categoryReducer } from "./reducers/categoryReducer";
import { productReducer } from "./reducers/productReducer";
export const rootReducer = combineReducers({
  isAuthReducer,
  usersReducer,
  aboutUsReducer,
  contactUsReducer,
  subscribersReducer,
  infoReducer,
  bannersReducer,
  categoryReducer,
  productReducer,
});
