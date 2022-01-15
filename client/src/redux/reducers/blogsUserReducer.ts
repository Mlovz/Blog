import {
  IBlogsCategory,
  GET_BLOGS_USER_ID,
  IGetBlogsUserType,
} from "../types/blogType";

const blogsUserReducer = (
  state: IBlogsCategory[] = [],
  action: IGetBlogsUserType
): IBlogsCategory[] => {
  switch (action.type) {
    case GET_BLOGS_USER_ID:
      if (state.every((item) => item.id !== action.payload.id)) {
        return [...state, action.payload];
      } else {
        return state.map((blog) =>
          blog.id === action.payload.id ? action.payload : blog
        );
      }

    default:
      return state;
  }
};

export default blogsUserReducer;
