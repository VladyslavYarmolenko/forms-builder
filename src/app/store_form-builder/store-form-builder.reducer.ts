import { Action, createReducer, on } from '@ngrx/store';
import { setSelectedFieldId, addConstructorField, changeFieldProp, setConstructorFields } from './store-form-builder.actions';

export interface State {
  constructorFields: ConstructorField[];
  selectedFieldId: SelectedFieldId;
  // selectedFieldOrder : SelectedFieldOrder; 
}

export type Styles = {
  [key:string]: any;
} 

export type ConstructorField = {
  id: number;
  type: string;
  styles: Styles;
  order: number;
  label?: string;
  options?: string[];
  placeholder?: string;
  text?: string;
}

// export type SelectedFieldOrder = number;

export type SelectedFieldId = number | null;

export type DraggableField = string | null;

export type FieldTypes = 'input' | 'textarea' | 'button' | 'select' | 'checkbox'; 

export type ChangeFieldPropArguments = {
  constructorFieldId: number;
  propToChange: keyof ConstructorField
  newPropState: number | string | string[] | String
}

const initialState: State = {
  constructorFields: [],
  selectedFieldId: null 
}

const formBuilderReducer = createReducer(
  initialState,
  on(setSelectedFieldId, (state, { selectedFieldId }) => {
    return({
      ...state,
      selectedFieldId : selectedFieldId,
    })
  }),
  on(addConstructorField, (state, { constructorFieldType }) => {
    const constructorFields = state.constructorFields;
    console.log(constructorFields)

    let fieldId = constructorFields.length;

    if (constructorFields.length === 0){
      fieldId = constructorFields.length;
    } else {
      fieldId = constructorFields[constructorFields.length - 1].id + 1;
    }

    const newField: ConstructorField = {
      type: constructorFieldType, 
      styles: {},
      order: constructorFields.length,
      id: constructorFields.length,
    };

    if (constructorFieldType === 'select') {
      newField.label = 'Default label';
      newField.options = ['example'];
    }

    if (constructorFieldType === 'checkbox') {
      newField.label = 'Default label';
    }

    if (constructorFieldType === 'input' || constructorFieldType === 'textarea') {
      newField.placeholder = 'Default placeholder';
    }

    if (constructorFieldType === 'button') {
      newField.text = 'Button'
    }
    
    return ({
      ...state,
      constructorFields: state.constructorFields.concat(newField)
      })
    }
  ),
  on(changeFieldProp, (state, { constructorFieldId, propToChange, newPropState }: ChangeFieldPropArguments) => {
    let constructorFields = state.constructorFields;
    const field: ConstructorField | undefined = constructorFields.find((field: ConstructorField) => field.id == constructorFieldId)
    let changedField: ConstructorField | null = null;
    
    if (field) {
      changedField = { ...field };
      //@ts-ignore
      changedField[propToChange] = newPropState;
    }
    
    constructorFields = constructorFields.filter((field: ConstructorField) => field.id !== constructorFieldId);
    if (changedField)
      constructorFields.push(changedField);

    return ({
      ...state,
      constructorFields: [...constructorFields]
      })
    }
  ),
  on(setConstructorFields, (state, { newConstructorArr }) => {
    return({
      ...state,
      constructorFields: [...newConstructorArr]
      })
    }
  )
)

export function reducer(state: State | undefined, action: Action){
  return formBuilderReducer(state, action)
}