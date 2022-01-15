import { IUser } from "../../utils/TypeScript";

export const AUTH = "AUTH";

export interface IAuth {
  token?: string;
  user?: IUser;
}

export interface IAuthTypes {
  type: typeof AUTH;
  payload: IAuth;
}
