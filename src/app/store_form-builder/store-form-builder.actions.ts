import { createAction, props } from '@ngrx/store';
import { FieldTypes, SelectedFieldId } from './store-form-builder.reducer';

export const setSlectedFieldId = createAction(
  '[FORM BUILDER] SET_SELECTED_FIELD_ID', 
  props<{selectedFieldId: SelectedFieldId}>()
)


export const addConstructorField = createAction(
  '[FORM BUILDER] ADD_CONSTRUCTOR_FIELD',
  props<{ constructorFieldType: FieldTypes }>()
)