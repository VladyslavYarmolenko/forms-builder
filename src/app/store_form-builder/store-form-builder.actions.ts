import { createAction, props } from '@ngrx/store';

import { ConstructorField, FieldTypes, selectedFieldId} from 'app/interfaces/interfaces';


export const setSelectedFieldId = createAction(
  '[FORM BUILDER] SET_SELECTED_FIELD_ID',
  props<{ selectedFieldId: selectedFieldId }>()
);

export const addConstructorField = createAction(
  '[FORM BUILDER] ADD_CONSTRUCTOR_FIELD',
  props<{ constructorFieldType: FieldTypes }>()
);

export const changeFieldProp = createAction(
  '[FORM BUILDER] CHANGE_FIELD_PROP',
  props<{ constructorFieldId: number, propToChange: any, newPropState: any }>()
);

export const setConstructorFields = createAction(
  '[FORM BUILDER] REORDERED_FIELDS_IN_CONSTRUCTOR',
  props<{ newConstructorArr: ConstructorField[] }>()
);

export const deleteField = createAction(
  '[FORM BUILDER] DELETE_FIELD'
);
