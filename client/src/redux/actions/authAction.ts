import { Dispatch } from "react";
import { postDataApi } from "../../utils/fetchData";
import { IUserLogin } from "../../utils/TypeScript";
import { ALERT, IAlertType } from "../types/alertType";
import { AUTH, IAuthTypes } from "../types/authTypes";

export const login =
  (data: IUserLogin) => async (dispatch: Dispatch<IAuthTypes | IAlertType>) => {
    try {
      dispatch({ type: ALERT, payload: { loading: true } });
      const res = await postDataApi("login", data, "");
      dispatch({
        type: AUTH,
        payload: {
          user: res.data.user,
          token: res.data.access_token,
        },
      });
      dispatch({ type: ALERT, payload: { loading: false } });
      localStorage.setItem("logged", "true");
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { error: err.response.data.msg } });
    }
  };

export const refreshLogin =
  () => async (dispatch: Dispatch<IAuthTypes | IAlertType>) => {
    const logged = localStorage.getItem("logged");
    if (logged === "true") {
      try {
        dispatch({ type: ALERT, payload: { loading: true } });
        const res = await postDataApi("refresh_token", {}, "");

        dispatch({
          type: AUTH,
          payload: {
            user: res.data.user,
            token: res.data.access_token,
          },
        });
        dispatch({ type: ALERT, payload: { loading: false } });
      } catch (err: any) {
        dispatch({ type: ALERT, payload: { error: err.response.data.msg } });
      }
    }
  };

export const logout =
  () => async (dispatch: Dispatch<IAuthTypes | IAlertType>) => {
    try {
      const res = await postDataApi("logout", {}, "");
      window.location.href = "/login";
      localStorage.removeItem("logged");
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { error: err.response.data.msg } });
    }
  };
