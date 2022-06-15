import { combineReducers } from "redux";
import userRegister from "./userRegister";
import userLogin from "./userLogin";
import productsApi from "./productsApi";
export default combineReducers({
  userRegister,
  userLogin,
  productsApi,
});
