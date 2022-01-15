import { Dispatch } from "react";
import {
  deleteDataApi,
  getDataApi,
  pathcDataApi,
  postDataApi,
} from "../../utils/fetchData";
import { ICategory } from "../../utils/TypeScript";
import { IAlertType, ALERT } from "../types/alertType";
import {
  CREATE_CATEGORY,
  DELETE_CATEGORY,
  GET_CATEGORY,
  ICreateCategoryT,
  IDeleteCategoryT,
  IGetCategoryT,
  IUpdateCategoryT,
  UPDATE_CATEGORY,
} from "../types/categoryType";

export const createCategory =
  (name: string, token: string) =>
  async (dispatch: Dispatch<IAlertType | ICreateCategoryT>) => {
    try {
      dispatch({ type: ALERT, payload: { loading: true } });

      const res = await postDataApi("category", { name }, token);
      dispatch({ type: CREATE_CATEGORY, payload: res.data.newCategory });

      dispatch({ type: ALERT, payload: { loading: false } });
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { error: err.response.data.msg } });
    }
  };

export const getCategory =
  () => async (dispatch: Dispatch<IAlertType | IGetCategoryT>) => {
    try {
      dispatch({ type: ALERT, payload: { loading: true } });

      const res = await getDataApi("category", "");
      dispatch({ type: GET_CATEGORY, payload: res.data.categories });

      dispatch({ type: ALERT, payload: { loading: false } });
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { error: err.response.data.msg } });
    }
  };

export const updateCategory =
  (data: ICategory, token: string) =>
  async (dispatch: Dispatch<IAlertType | IUpdateCategoryT>) => {
    try {
      dispatch({ type: ALERT, payload: { loading: true } });

      dispatch({ type: UPDATE_CATEGORY, payload: data });

      const res = await pathcDataApi(
        `category/${data._id}`,
        { name: data.name },
        token
      );
      console.log(res);

      dispatch({ type: ALERT, payload: { loading: false } });
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { error: err.response.data.msg } });
    }
  };

export const deleteCategory =
  (id: string, token: string) =>
  async (dispatch: Dispatch<IAlertType | IDeleteCategoryT>) => {
    try {
      dispatch({ type: ALERT, payload: { loading: true } });

      const res = await deleteDataApi(`category/${id}`, token);
      dispatch({ type: DELETE_CATEGORY, payload: id });

      dispatch({ type: ALERT, payload: { loading: false } });
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { error: err.response.data.msg } });
    }
  };
