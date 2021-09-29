import { IUserModel } from "src/app/shared/models/iuser.model";
import * as UserStateActions from "./user-auth-state.actions";

export interface IUserAuthState {
  user: IUserModel;
  authError: { message: string };
  loading: boolean;
}


const initialState: IUserAuthState = {
  // user: { id: '', username: '', token: '' },
  user: { id: '', name: '', token: '' },
  authError: { message: null },
  loading: false,
}

export function userAuthStateReducer(state = initialState, action: UserStateActions.UserStateActions) {
  switch (action.type) {
    case UserStateActions.LOGIN_START:
      return {
        ...state,
        authError: { message: null },
        loading: true,
      }

    case UserStateActions.LOGIN_SUCCESS:
      return {
        ...state,
        authError: { message: null },
        user: action.payload,
        loading: false,
      }

    case UserStateActions.LOGOUT:
      return {
        ...state,
        authError: { message: null },
        user: { id: '', name: '', password: '', token: '' },
      }

    case UserStateActions.CLEAR_ERROR:
      return {
        ...state,
        authError: { message: null },
      }

    case UserStateActions.AUTH_FAILURE:
      return {
        ...state,
        user: { id: '', name: '', token: '' },
        authError: action.payload,
        loading: false,
      }

    default:
      return state;
  }
}



