import { isFieldSelectedState, addField } from './store_form-builder.selectors';
import { Action, createReducer, on} from '@ngrx/store';
import { changeStyleField, setDraggableField } from './store_form-builder.actions';

export interface State {
  isFieldSelected: boolean;
  constructorFields: ConstructorField[];
  draggableField: DraggableField
}



export type Styles = {
  [key:string]: string;
} 

export type ConstructorField = {
  type: string;
  styles: Styles
}

export type DraggableField = string | null;

const initialState: State = {
  isFieldSelected: false,
  constructorFields: [],
  draggableField: null
}

const formBuilderReducer = createReducer(
  initialState,
  on(changeStyleField, (state, { isFieldSelected }) => ({
    ...state,
    isFieldSelected,
  })),
  on(setDraggableField, (state, { draggableField }) => {
    console.log('DRAGGAVBLE', draggableField)
    return ({
      ...state,
      draggableField
    })
  })
  // on(addField, (state, { constructorField }) => ({
  //   ...state,
  //   constructorField: []
  // })
)

export function reducer(state: State | undefined, action: Action){
  return formBuilderReducer(state, action)
}