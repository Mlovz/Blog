import { Dispatch } from "redux";
import { getDataApi, postDataApi } from "../../utils/fetchData";
import { IBlog } from "../../utils/TypeScript";
import { imageUpload } from "../../utils/validImage";
import { ALERT, IAlertType } from "../types/alertType";
import {
  GET_BLOGS_CATEGORY_ID,
  GET_BLOGS_USER_ID,
  GET_HOME_BLOGS,
  IGetBlogsCategoryType,
  IGetBlogsUserType,
  IGetHomeBlogsType,
} from "../types/blogType";

export const createBlog =
  (blog: IBlog, token: string) => async (dispatch: Dispatch<IAlertType>) => {
    let url;
    try {
      dispatch({ type: ALERT, payload: { loading: true } });

      if (typeof blog.thumbnail !== "string") {
        const photo = await imageUpload(blog.thumbnail);
        url = photo.url;
      } else {
        url = blog.thumbnail;
      }
      const newBlog = { ...blog, thumbnail: url };

      const res = await postDataApi("blog", newBlog, token);

      dispatch({ type: ALERT, payload: { loading: false } });
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { error: err.response.data.msg } });
    }
  };

export const getHomeBlogs =
  () => async (dispatch: Dispatch<IAlertType | IGetHomeBlogsType>) => {
    try {
      dispatch({ type: ALERT, payload: { loading: true } });

      const res = await getDataApi("home/blog");

      dispatch({ type: GET_HOME_BLOGS, payload: res.data });

      dispatch({ type: ALERT, payload: { loading: false } });
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { error: err.response.data.msg } });
    }
  };

export const getBlogsByCategoryId =
  (id: string, search: string) =>
  async (dispatch: Dispatch<IAlertType | IGetBlogsCategoryType>) => {
    try {
      let limit = 6;
      let value = search ? search : `?page=${1}`;
      dispatch({ type: ALERT, payload: { loading: true } });

      const res = await getDataApi(`blogs/${id}${value}&limit=${limit}`);

      dispatch({ type: GET_BLOGS_CATEGORY_ID, payload: { ...res.data, id } });

      dispatch({ type: ALERT, payload: { loading: false } });
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { error: err.response.data.msg } });
    }
  };

export const getBlogsByUserId =
  (id: string, search: string) =>
  async (dispatch: Dispatch<IAlertType | IGetBlogsUserType>) => {
    try {
      let limit = 6;
      let value = search ? search : `?page=${1}`;

      dispatch({ type: ALERT, payload: { loading: true } });

      const res = await getDataApi(`blogs/user/${id}${value}&limit=${limit}`);

      dispatch({
        type: GET_BLOGS_USER_ID,
        payload: { ...res.data, id, search },
      });

      dispatch({ type: ALERT, payload: { loading: false } });
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { error: err.response.data.msg } });
    }
  };
