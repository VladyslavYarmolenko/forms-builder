import { createAction, props } from '@ngrx/store';

import { Field, FieldTypes, selectedFieldId, StyleList } from 'app/interfaces/interfaces';

export enum ActionTypes {
  setSelectedFieldId = '[FORM BUILDER] SET_SELECTED_FIELD_ID',
  addConstructorField = '[FORM BUILDER] ADD_CONSTRUCTOR_FIELD',
  setConstructorFields = '[FORM BUILDER] REORDERED_FIELDS_IN_CONSTRUCTOR',
  deleteField = '[FORM BUILDER] DELETE_FIELD',
  changeFieldStyles = '[FORM BUILDER] CHANGE_FIELD_STYLES'
}

export const setSelectedFieldId = createAction(ActionTypes.setSelectedFieldId, props<{ selectedId: selectedFieldId }>());

export const addConstructorField = createAction(ActionTypes.addConstructorField, props<{ constructorFieldType: FieldTypes }>());

export const setConstructorFields = createAction(ActionTypes.setConstructorFields, props<{ newConstructorArr: Field[] }>());

export const deleteField = createAction(ActionTypes.deleteField);

export const changeFieldStyles = createAction(ActionTypes.changeFieldStyles, props<{ newStyles: StyleList }>());
