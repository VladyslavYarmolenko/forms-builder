
import { Action, createReducer, on } from '@ngrx/store';
import { setSlectedFieldId, addConstructorField } from './store-form-builder.actions';

export interface State {
  constructorFields: ConstructorField[];
  selectedFieldId: SelectedFieldId;
}

export type Styles = {
  [key:string]: string;
} 

export type ConstructorField = {
  type: string;
  styles: Styles;
  order: number;
  id: number;
}

export type SelectedFieldId = number | null;

export type DraggableField = string | null;

export type FieldTypes = 'input' | 'textarea' | 'button' | 'select' | 'checkbox'; 

const initialState: State = {
  constructorFields: [],
  selectedFieldId: null 
}

const formBuilderReducer = createReducer(
  initialState,
  on(setSlectedFieldId, (state, { selectedFieldId }) => {

    return({
      ...state,
      selectedFieldId : selectedFieldId,
    })
  }),
  on(addConstructorField, (state, { constructorFieldType }) => {
    const constructorFields = state.constructorFields;
    
    let fieldId = 0;

    if (constructorFields.length === 0){
      fieldId = constructorFields.length;
    } else {
      fieldId = constructorFields[constructorFields.length - 1].id + 1;
    }

    const newField = {
      type: constructorFieldType, 
      styles: {},
      order: constructorFields.length,
      id: fieldId,
    };

    return ({
      ...state,
      constructorFields: [...constructorFields, newField ]
      })
    }
  )
)

export function reducer(state: State | undefined, action: Action){
  return formBuilderReducer(state, action)
}