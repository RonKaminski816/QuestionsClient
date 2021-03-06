import { Action, createAction, props } from "@ngrx/store";
import { IUserModel } from "src/app/shared/models/iuser.model";

export const AUTO_LOGIN = '[User State] Auto Login';
export const LOGIN_START = '[User State] Login Start';
export const LOGIN_SUCCESS = '[User State] Login Success';
export const LOGIN_FAIL = '[User State] Login Fail';
export const AUTH_FAILURE = '[User State] Auth Failure';
export const LOGOUT = ' [User State] Logout';
export const CLEAR_ERROR = ' [User State] ClearError';

//NgRx Actions new convNew conventional syntax
// export const login = createAction(
//   LOGIN_START,
//   props<{ username: string, password: string }>()
// );

// export const loginSuccess = createAction(
//   LOGIN_SUCCESS,
//   props<IUserModel>()
// );

// export const loginFailure = createAction(
//   LOGIN_FAIL,
//   props<{ message: string }>()
// );


export class LoginStart implements Action {
  readonly type = LOGIN_START;
  constructor(public payload: { username: string, password: string }) { }
}

export class LoginSuccess implements Action {
  readonly type = LOGIN_SUCCESS;
  constructor(public payload: IUserModel) { }
}

export class AuthFailure implements Action {
  readonly type = AUTH_FAILURE;
  constructor(public payload: { message: string }) { }
}

export class Logout implements Action {
  readonly type = LOGOUT;
}

export class ClearError implements Action {
  readonly type = CLEAR_ERROR;
}

export class AutoLogin implements Action {
  readonly type = AUTO_LOGIN;
}

export type UserStateActions = LoginStart | LoginSuccess | AuthFailure | Logout | ClearError;
