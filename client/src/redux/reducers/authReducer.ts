import { AUTH, IAuth, IAuthTypes } from "../types/authTypes";

// const initialState = {
//   loading: false,
// };

const authReducer = (state: IAuth = {}, action: IAuthTypes): IAuth => {
  switch (action.type) {
    case AUTH:
      return action.payload;
    default:
      return state;
  }
};

export default authReducer;
