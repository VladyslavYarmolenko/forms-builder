import { User, Error } from 'app/interfaces/interfaces';
import * as AuthActions from 'app/store-auth/store-auth.actions';
import { createReducer, on, Action } from '@ngrx/store';


export interface State {
  user: User;
  error: Error;
}

const initialState: State = {
  user: null,
  error: null
};

export const getUser = (state: State) => state.user;

const authReducer = createReducer(
  initialState,
  on(AuthActions.LoginAction, (state: State, { payload } : any ) => ({ ...state, user: payload, error: null })),
  on(AuthActions.LoginSuccessAction, (state: State, { payload } : any ) => ({ ...state, user: payload, error: null })),
  on(AuthActions.LoginFailedAction, (state: State, { payload } : any ) => ({ ...state, error: payload, user: null })),
  on(AuthActions.RegisterAction, (state: State, { payload } : any ) => ({ ...state, user: payload, error: null })),
  on(AuthActions.RegisterSuccessAction, (state: State, { payload } : any ) => ({ ...state, user: payload, error: null })),
  on(AuthActions.RegisterFailedAction, (state: State, { payload } : any ) => ({ ...state, error: payload, user: null })),
);

export function reducer(state: State | undefined, action: Action): any {
  return authReducer(state, action);
}
