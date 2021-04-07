import { isFieldSelectedState } from './store.selectors';
import { Action, createReducer, on} from '@ngrx/store';
import { changeStyleField } from './store.actions';

export interface State {
  isFieldSelected: boolean;
}

const initialState: State = {
  isFieldSelected: false,
}

const storeReducer = createReducer(
  initialState,
  on(changeStyleField, (state, { isFieldSelected }) => ({
    ...state,
    isFieldSelected,
  }))
)

export function reducer(state: State | undefined, action: Action){
  return storeReducer(state, action)
}