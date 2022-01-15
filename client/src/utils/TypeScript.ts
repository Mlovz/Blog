import { ChangeEvent, FormEvent } from "react";
import rootReducer from "../redux/reducers/index";

export type InputChange = ChangeEvent<
  HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
>;
export type FormSubmit = FormEvent<HTMLFormElement>;
export type RootStore = ReturnType<typeof rootReducer>;

export interface IParams {
  page?: string;
  id: string;
}

export interface IUserLogin {
  account?: string;
  password?: string;
}

export interface IUser extends IUserLogin {
  avatar: string;
  createdAt?: string;
  name: string;
  role: string;
  updatedAt?: string;
  __v?: 0;
  _id?: string;
}

export interface IAlert {
  loading?: boolean;
  error?: string | string[];
}

export interface IParams {
  id: string;
}

export interface IUserRegister extends IUserLogin {
  name: string;
  cf_password: string;
}

export interface IUserAvatar {
  avatar: string | File;
}

export interface ICategory {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}
export interface IBlog {
  _id?: string;
  user: string | IUser;
  title: string;
  content: string;
  description: string;
  thumbnail: string | File;
  category: string;
  createdAt: string;
}
