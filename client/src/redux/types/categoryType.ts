import { ICategory } from "../../utils/TypeScript";

export const CREATE_CATEGORY = "CREATE_CATEGORY";
export const GET_CATEGORY = "GET_CATEGORY";
export const UPDATE_CATEGORY = "UPDATE_CATEGORY";
export const DELETE_CATEGORY = "DELETE_CATEGORY";

export interface ICreateCategoryT {
  type: typeof CREATE_CATEGORY;
  payload: ICategory;
}

export interface IGetCategoryT {
  type: typeof GET_CATEGORY;
  payload: ICategory[];
}

export interface IUpdateCategoryT {
  type: typeof UPDATE_CATEGORY;
  payload: ICategory;
}

export interface IDeleteCategoryT {
  type: typeof DELETE_CATEGORY;
  payload: string;
}

export type ICategoryType =
  | ICreateCategoryT
  | IGetCategoryT
  | IUpdateCategoryT
  | IDeleteCategoryT;
