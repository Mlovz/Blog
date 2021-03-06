import { combineReducers } from "redux";
import auth from "./authReducer";
import alert from "./alertReducer";
import category from "./categoryReducer";
import homeBlogs from "./blogReducer";
import blogsCategory from "./blogsCategoryReducer";
import otherInfo from "./otherInfoReducer";
import blogsUser from "./blogsUserReducer";

export default combineReducers({
  auth,
  alert,
  category,
  homeBlogs,
  blogsCategory,
  otherInfo,
  blogsUser,
});
