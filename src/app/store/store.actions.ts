import { createAction, props } from '@ngrx/store';

export const changeStyleField = createAction(
  '[FORM BUILDER] CHANGE_STYLE_FIELD', 
  props<{isFieldSelected: boolean}>()
)

