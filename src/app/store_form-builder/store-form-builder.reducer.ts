import { formBuilderState, ConstructorField, ChangeFieldPropArguments } from '../../interfaces/interfaces';
import { Action, createReducer, on } from '@ngrx/store';
import { setSelectedFieldId, addConstructorField, changeFieldProp, setConstructorFields } from './store-form-builder.actions';

const initialState: formBuilderState = {
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

    if (constructorFieldType === 'checkbox' || constructorFieldType === 'select') {
      newField.label = 'Default label';
    }

    if (constructorFieldType === 'input' || constructorFieldType === 'textarea'){
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
  ),
)

export function reducer(state: formBuilderState | undefined, action: Action){
  return formBuilderReducer(state, action)
}