import { createAction, props } from '@ngrx/store';
import { DraggableField } from './store_form-builder.reducer';

export const changeStyleField = createAction(
  '[FORM BUILDER] CHANGE_STYLE_FIELD', 
  props<{isFieldSelected: boolean}>()
)

export const setDraggableField = createAction(
  '[FORM BUILDER] SET_DRAGGABLE_FIELD',
  props<{ draggableField: DraggableField }>()
)