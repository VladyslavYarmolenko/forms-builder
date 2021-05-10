import { loginState } from './../../interfaces/interfaces';
import { User, Error } from '../../interfaces/interfaces';
import { Actions, ActionTypes } from '../store-auth/store-auth.actions';

export interface State {
  user: User;
  error: Error;
}

const INIT_STATE: State = {
  user: null,
  error: null
}

export function reducer(state: State = INIT_STATE, action: Actions): State {
  switch (action.type) {
    case ActionTypes.LoginSuccess:
    console.log(state, action.payload)
      return  { ...state, user: action.payload, error: null };
    case ActionTypes.LoginFailed:
      return  { ...state, error: action.payload, user: null };
    default:
      return state;
  }
}

export const getUser = (state: State) => state.user;