import { isFieldSelectedState } from './store.selectors';
import { Action, createReducer, on} from '@ngrx/store';
import { changeStyleField } from './store.actions';

export interface State {
  isFieldSelected: boolean;
  constructorFields: ConstructorField[];
  draggableField: string | null
}

type Styles = {
  [key:string]: string;
} 

type ConstructorField = {
  type: string;
  styles: Styles
}

const initialState: State = {
  isFieldSelected: false,
  constructorFields: [],
  draggableField: null
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