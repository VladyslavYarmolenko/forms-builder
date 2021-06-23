import { Action, createReducer, on } from '@ngrx/store';

import { Field, FormBuilderState } from 'app/interfaces/interfaces';
import { typeFields, styles } from '../constants/constants';


import {
  setSelectedFieldId,
  addConstructorField,
  setConstructorFields, deleteField, changeFieldStyles,
} from 'app/store_form-builder/store-form-builder.actions';


const initialState: FormBuilderState = {
  constructorFields: [],
  selectedFieldId: null,
};


export const formBuilderReducer = createReducer(
  initialState,
  on(setSelectedFieldId, (state, { selectedId }): FormBuilderState => {
    return({
      ...state,
      selectedFieldId: selectedId,
    });
  }),
  on(addConstructorField, (state, { constructorFieldType }): FormBuilderState => {
    const constructorFields = state.constructorFields;

    let fieldId;

    if (constructorFields.length === 0){
      fieldId = constructorFields.length;
    } else {
      fieldId = constructorFields[constructorFields.length - 1].id + 1;
    }

    const newField: Field = {
      type: constructorFieldType,
      styles: {...styles},
      id: constructorFields.length,
    };

    switch (constructorFieldType) {
      case typeFields.input:
      case typeFields.textarea:
        newField.styles.placeholder = 'Default placeholder';
        newField.styles.isRequired = false;
        break;
      case typeFields.checkbox:
      case typeFields.select:
        newField.styles.label = 'Default label';
        newField.styles.options = ['Default option'];
        break;
      case typeFields.button:
        newField.styles.text = 'Default text';
        break;

      default:
        break;
    }

    return ({
      ...state,
      constructorFields: state.constructorFields.concat(newField)
      });
    }
  ),
  on(changeFieldStyles, (state , { newStyles }): FormBuilderState => {

    const fieldId = state.selectedFieldId;
    const fieldsArr = [...state.constructorFields];

    const field = fieldsArr.find(elem => elem.id === fieldId);

    const changedField = {...field};

    if (field.type === typeFields.select) {

      // @ts-ignore
      const optionsStr = newStyles.options;
      const optionsArr = optionsStr.split('-');

      changedField.styles = {...newStyles};
      changedField.styles.options = [...optionsArr];
    } else {
      changedField.styles = {...newStyles};
    }

    fieldsArr.splice(fieldId, 1, changedField);

    return ({
      ...state,
      constructorFields: fieldsArr,
    });
  }),
  on(setConstructorFields, (state , { newConstructorArr }): FormBuilderState => {

    return({
      ...state,
      constructorFields: [...newConstructorArr]
      });
    }
  ),
  on(deleteField, (state: FormBuilderState): FormBuilderState => {

    const fieldId = state.selectedFieldId;
    const filteredArr = state.constructorFields.filter(fields => fields.id !== fieldId );

    return({
      selectedFieldId: null,
      constructorFields: filteredArr
    });
  })
);

// tslint:disable-next-line:typedef
export function reducer(state: FormBuilderState | undefined, action: Action){
  return formBuilderReducer(state, action);
}



