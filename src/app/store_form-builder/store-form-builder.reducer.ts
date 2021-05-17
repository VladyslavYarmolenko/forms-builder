import { Action, createReducer, on } from '@ngrx/store';

import { typeFields ,propNames, defaultValues } from './../constants/constants';
import { formBuilderState, ConstructorField, ChangeFieldPropArguments } from '../../interfaces/interfaces';

import { setSelectedFieldId, addConstructorField, changeFieldProp, setConstructorFields, changeInStyleList, returnInitialState } from './store-form-builder.actions';


const initialState: formBuilderState = {
  constructorFields: [],
  selectedFieldId: null,
  stylesFields: {
    isRequired: false,
    placeholder: null,
    text: null,
    label: null,  
    width: null,
    height: null,
    border: null,
    fontSize: null,
    fontWeight: null,
    color: null,
  }
}

export const formBuilderReducer = createReducer(
  initialState,
  on(setSelectedFieldId, (state, { selectedFieldId }) => {

    let constructorFields = state.constructorFields;
    const field: ConstructorField | undefined = constructorFields.find((field: ConstructorField) => field.id == selectedFieldId)
    

    let newStylesFields = {...state.stylesFields}
    for (let prop in field) {
      switch(prop){
        case propNames.isRequired:
          newStylesFields.isRequired = field[prop];
        break;
  
        case propNames.placeholder:
        case propNames.label:
        case propNames.text:
          newStylesFields[prop] = field[prop];
        break;
  
        case propNames.styles:
          const styles = field[prop];
          for (let style in styles) {
            newStylesFields[style] = styles[style];
          }
        break; 
      }
    }

    return({
      ...state,
      selectedFieldId : selectedFieldId,
      stylesFields: newStylesFields
    })
  }),
  on(addConstructorField, (state, { constructorFieldType }) => {
    const constructorFields = state.constructorFields;
    
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

    newField.label = constructorFieldType === typeFields.select || constructorFieldType === typeFields.checkbox ?  defaultValues.label : null;
    newField.options = constructorFieldType === typeFields.select ? defaultValues.option : null;
    newField.placeholder = constructorFieldType === typeFields.input || constructorFieldType === typeFields.textarea ? defaultValues.placeholder : null;
    newField.text = constructorFieldType === typeFields.button ? defaultValues.button : null;

    if(constructorFieldType === typeFields.input || constructorFieldType === typeFields.textarea){
      newField.isRequired = false;
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

    return {
      ...state,
      constructorFields: [...constructorFields]
    }
  }),
  on(setConstructorFields, (state, { newConstructorArr }) => {

    return({
      ...state,
      constructorFields: [...newConstructorArr]
      })
    }
  ),
  on(changeInStyleList, (state, { propToChange, newPropState }) => {

    let stateStyles = {...state.stylesFields};

        for(let key in stateStyles){
          if(key.toUpperCase() == propToChange.toUpperCase()){
              stateStyles[key] = newPropState;
          }
        }
          return({ 
              ...state,
              stylesFields : stateStyles
          })
        }
    ),
    on(returnInitialState, (state) => {

      let stateStyles = {...state.stylesFields};

      for(let key in stateStyles){
        if(stateStyles.isRequired){
         stateStyles.isRequired = false;
        } else {
          stateStyles[key] = null;
        }
      }
      return({ 
          ...state,
          stylesFields : stateStyles
            })
          }
      ),
)

export function reducer(state: formBuilderState | undefined, action: Action){
  return formBuilderReducer(state, action)
}



