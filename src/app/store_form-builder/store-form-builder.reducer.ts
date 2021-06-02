import { Action, createReducer, on } from '@ngrx/store';

import { typeFields , propNames, defaultValues } from 'app/constants/constants';
import { FormBuilderState, ConstructorField, ChangeFieldPropArguments } from 'app/interfaces/interfaces';

import { setSelectedFieldId,
         addConstructorField,
         changeFieldProp,
         setConstructorFields,
         changeInStyleList,
         returnInitialState, } from 'app/store_form-builder/store-form-builder.actions';


const initialState: FormBuilderState = {
  constructorFields: [],
  selectedFieldId: null,
  stylesFields: {
    isRequired: false,
    isChecked: false,
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
};


export const formBuilderReducer = createReducer(
  initialState,
  on(setSelectedFieldId, (state, { selectedFieldId }) => {

    const constructorFields = state.constructorFields;
    const field: ConstructorField | undefined = constructorFields.find((elem: ConstructorField) => elem.id === selectedFieldId);


    const newStylesFields = {...state.stylesFields};
    // tslint:disable-next-line:forin
    for (const prop in field) {
      switch (prop){
        case propNames.isChecked:
        case propNames.isRequired:
        case propNames.placeholder:
        case propNames.label:
        case propNames.text:
          newStylesFields[prop] = field[prop];
          break;

        case propNames.styles:
          const styles = field[prop];
          // tslint:disable-next-line:forin
          for (const style in styles) {
            newStylesFields[style] = styles[style];
          }
          break;
      }
    }

    return({
      ...state,
      selectedFieldId,
      stylesFields: newStylesFields
    });
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

    newField.label = constructorFieldType === typeFields.select || constructorFieldType === typeFields.checkbox
      ?  defaultValues.label : null;
    newField.options = constructorFieldType === typeFields.select
      ? defaultValues.option : null;
    newField.placeholder = constructorFieldType === typeFields.input || constructorFieldType === typeFields.textarea
      ? defaultValues.placeholder : null;
    newField.text = constructorFieldType === typeFields.button
      ? defaultValues.button : null;
    newField.isChecked = constructorFieldType === typeFields.checkbox
      ? defaultValues.isChecked : null;


    if (constructorFieldType === typeFields.input || constructorFieldType === typeFields.textarea){
      newField.isRequired = false;
    }

    return ({
      ...state,
      constructorFields: state.constructorFields.concat(newField)
      });
    }
  ),
  on(changeFieldProp, (state, { constructorFieldId, propToChange, newPropState }: ChangeFieldPropArguments) => {
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
  on(setConstructorFields, (state, { newConstructorArr }) => {

    return({
      ...state,
      constructorFields: [...newConstructorArr]
      });
    }
  ),
  on(changeInStyleList, (state, { propToChange, newPropState }) => {

    const stateStyles = {...state.stylesFields};

    for (const key in stateStyles){
          if (key.toUpperCase() === propToChange.toUpperCase()){
              stateStyles[key] = newPropState;
          }
        }

    return({
              ...state,
              stylesFields : stateStyles
          });
        }
    ),
    on(returnInitialState, (state) => {

      const stateStyles = {...state.stylesFields};

      for (const key in stateStyles){
        if (stateStyles.isRequired){
         stateStyles.isRequired = false;
        } else if (stateStyles.isChecked){
          stateStyles.isChecked = false;
        }else {
          stateStyles[key] = null;
        }
      }

      return({
          ...state,
          stylesFields : stateStyles
            });
          }
      ),
);

// tslint:disable-next-line:typedef
export function reducer(state: FormBuilderState | undefined, action: Action){
  return formBuilderReducer(state, action);
}



