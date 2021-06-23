import { createAction, props } from '@ngrx/store';
import { User, Error } from 'app/interfaces/interfaces';

export enum ActionTypes {
  Login = '[Auth] Login',
  LoginSuccess = '[Auth] Login success',
  LoginFailed = '[Auth] Login failed',

  Register = '[Auth] Register',
  RegisterSuccess = '[Auth] Register success',
  RegisterFailed = '[Auth] Register failed',
}

export const LoginAction = createAction(ActionTypes.Login, props<{ payload: User }>());

export const LoginSuccessAction = createAction(ActionTypes.LoginSuccess, props<{ payload: User }>());

export const LoginFailedAction = createAction(ActionTypes.LoginFailed, props<{ payload: Error }>());

export const RegisterAction = createAction(ActionTypes.Register, props<{ payload: User }>());

export const RegisterSuccessAction = createAction(ActionTypes.RegisterSuccess, props<{ payload: User }>());

export const RegisterFailedAction = createAction(ActionTypes.RegisterFailed, props<{ payload: Error }>());


export type Actions = typeof LoginAction |typeof LoginSuccessAction | typeof LoginFailedAction |
                      typeof RegisterAction | typeof RegisterSuccessAction | typeof RegisterFailedAction
