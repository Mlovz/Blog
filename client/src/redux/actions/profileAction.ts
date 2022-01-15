import { Dispatch } from "react";
import { getDataApi, pathcDataApi } from "../../utils/fetchData";
import { IUserAvatar, IUserRegister } from "../../utils/TypeScript";
import { checkImage, imageUpload } from "../../utils/validImage";
import { ALERT, IAlertType } from "../types/alertType";
import { AUTH, IAuth, IAuthTypes } from "../types/authTypes";
import { GET_OTHER_INFO, IGetOtherInfoType } from "../types/profileType";

export const updateUserProfile =
  (data: IUserRegister, avatar: File, auth: IAuth) =>
  async (dispatch: Dispatch<IAlertType | IAuthTypes>) => {
    try {
      if (auth.token && auth.user) {
        dispatch({ type: ALERT, payload: { loading: true } });
        let url;
        if (avatar) {
          const media = await imageUpload(avatar);
          url = media.url;
        }
        const res = await pathcDataApi(
          "user",
          {
            avatar: url ? url : auth.user?.avatar,
            name: data.name ? data.name : auth.user?.name,
          },
          auth.token
        );

        if (res.status === 200) {
          dispatch({
            type: AUTH,
            payload: {
              token: auth.token,
              user: {
                ...auth.user,
                avatar: url ? url : auth.user?.avatar,
                name: data.name ? data.name : auth.user?.name,
              },
            },
          });
        }

        dispatch({ type: ALERT, payload: { loading: false } });
      }
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { error: err.response.data.msg } });
    }
  };

export const resetPassword =
  (data: any, token: string) =>
  async (dispatch: Dispatch<IAlertType | IAuthTypes>) => {
    try {
      if (data.password !== data.cf_password) {
        return dispatch({
          type: ALERT,
          payload: { error: "Confirm password Error" },
        });
      }

      const res = await pathcDataApi(
        "reset_password",
        {
          password: data.password,
        },
        token
      );
      console.log(res);
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { error: err.response.data.msg } });
    }
  };

export const getOtherInfo =
  (id: string) =>
  async (dispatch: Dispatch<IAlertType | IGetOtherInfoType>) => {
    try {
      dispatch({ type: ALERT, payload: { loading: true } });

      const res = await getDataApi(`user/${id}`);

      dispatch({
        type: GET_OTHER_INFO,
        payload: res.data,
      });

      dispatch({ type: ALERT, payload: {} });
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { error: err.response.data.msg } });
    }
  };
