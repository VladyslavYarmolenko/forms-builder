import { Action } from '@ngrx/store';
import { User, Error } from '../../interfaces/interfaces';

export enum ActionTypes {
  Login = '[Auth] Login',
  LoginSuccess = '[Auth] Login success',
  LoginFailed = '[Auth] Login failed',

  Register = '[Auth] Register',
  RegisterSuccess = '[Auth] Register success',
  RegisterFailed = '[Auth] Register failed',
}

export class LoginAction implements Action {
  readonly type = ActionTypes.Login;

  constructor(public payload: User) {}
}

export class LoginSuccessAction implements Action {
  readonly type = ActionTypes.LoginSuccess;

  constructor(public payload: User) {}
}

export class LoginFailedAction implements Action {
  readonly type = ActionTypes.LoginFailed;

  constructor(public payload: Error) {}
}

export class RegisterAction implements Action {
  readonly type = ActionTypes.Register;

  constructor(public payload: User) {}
}

export class RegisterSuccessAction implements Action {
  readonly type = ActionTypes.RegisterSuccess;

  constructor(public payload: User) {}
}

export class RegisterFailedAction implements Action {
  readonly type = ActionTypes.RegisterFailed;

  constructor(public payload: Error) {}
}


export type Actions = LoginAction | LoginSuccessAction | LoginFailedAction | RegisterAction | RegisterSuccessAction | RegisterFailedAction;