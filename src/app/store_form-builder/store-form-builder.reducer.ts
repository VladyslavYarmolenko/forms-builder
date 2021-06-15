import { Action, createReducer, on } from '@ngrx/store';

import {
  FormBuilderState,
  ConstructorField,
} from 'app/interfaces/interfaces';

import {
  setSelectedFieldId,
  addConstructorField,
  changeFieldProp,
  setConstructorFields, deleteField,
} from 'app/store_form-builder/store-form-builder.actions';
import { typeFields } from "../constants/constants";


const initialState: FormBuilderState = {
  constructorFields: [],
  selectedFieldId: null,
};


export const formBuilderReducer = createReducer(
  initialState,
  on(setSelectedFieldId, (state: FormBuilderState, { selectedFieldId } : any ) => {

    return({
      ...state,
      selectedFieldId,
    });
  }),
  on(addConstructorField, (state : FormBuilderState, { constructorFieldType } : any) => {
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

    // newField.label = constructorFieldType === typeFields.select || constructorFieldType === typeFields.checkbox
    //   ?  defaultValues.label : null;
    // newField.options = constructorFieldType === typeFields.select
    //   ? defaultValues.option : null;
    // newField.placeholder = constructorFieldType === typeFields.input || constructorFieldType === typeFields.textarea
    //   ? defaultValues.placeholder : null;
    // newField.text = constructorFieldType === typeFields.button
    //   ? defaultValues.button : null;
    // newField.isChecked = constructorFieldType === typeFields.checkbox
    //   ? defaultValues.isChecked : null;
    //
    //
    // if (constructorFieldType === typeFields.input || constructorFieldType === typeFields.textarea){
    //   newField.isRequired = false;
    // }

    switch (constructorFieldType) {
      case typeFields.input:
      case typeFields.textarea:
        newField.styles.placeholder = 'Placeholder';
        newField.styles.isRequired = false;
        break;
      case typeFields.checkbox:
      case typeFields.select:
        newField.styles.label = 'Label';
        break;
      case typeFields.button:
        newField.styles.text = 'Text';
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
  on(changeFieldProp, (state : FormBuilderState , { constructorFieldId, propToChange, newPropState } : any) => {
    let constructorFields = state.constructorFields;
    const field: ConstructorField | undefined = constructorFields.find((elem: ConstructorField) => elem.id === constructorFieldId);

    let changedField: ConstructorField | null = null;

    if (field) {
      changedField = { ...field };

      // @ts-ignore
      changedField[propToChange] = newPropState;
    }

    constructorFields = constructorFields.filter((elem: ConstructorField) => elem.id !== constructorFieldId);

    if (changedField) {
      constructorFields.push(changedField);
    }

    return {
      ...state,
      constructorFields: [...constructorFields]
    };
  }),
  on(setConstructorFields, (state : FormBuilderState, { newConstructorArr } : any) => {

    return({
      ...state,
      constructorFields: [...newConstructorArr]
      });
    }
  ),
  on(deleteField, (state: FormBuilderState) => {

    const fieldId = state.selectedFieldId;
    const filteredArr = state.constructorFields.filter(fields => fields.id !== fieldId );

    return({
      ...state,
      selectedFieldId: null,
      constructorFields: filteredArr
    })
  })
);

// tslint:disable-next-line:typedef
export function reducer(state: FormBuilderState | undefined, action: Action){
  return formBuilderReducer(state, action);
}



