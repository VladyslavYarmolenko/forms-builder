import { createAction, props } from '@ngrx/store';
import { FieldTypes, SelectedFieldId } from './store-form-builder.reducer';

export const changeStyleField = createAction(
  '[FORM BUILDER] CHANGE_STYLE_FIELD', 
  props<{getSelectedFieldId: SelectedFieldId}>()
)


export const addConstructorField = createAction(
  '[FORM BUILDER] ADD_CONSTRUCTOR_FIELD',
  props<{ constructorFieldType: FieldTypes }>()
)