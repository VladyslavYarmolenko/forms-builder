import { createAction, props } from '@ngrx/store';

import { FieldTypes, SelectedFieldId} from '../../interfaces/interfaces';

export const setSelectedFieldId = createAction(
  '[FORM BUILDER] SET_SELECTED_FIELD_ID', 
  props<{ selectedFieldId: SelectedFieldId }>()
)


export const addConstructorField = createAction(
  '[FORM BUILDER] ADD_CONSTRUCTOR_FIELD',
  props<{ constructorFieldType: FieldTypes }>()
)

export const changeFieldProp = createAction(
  '[FORM BUILDER] CHANGE_FIELD_PROP',
  props<{ constructorFieldId: any, propToChange: any, newPropState: any }>()
)

export const setConstructorFields = createAction(
  '[FORM BUILDER] REORDERED_FIELDS_IN_CONSTRUCTOR',
  props<{ newConstructorArr : any }>()
)


export const changeInStyleList = createAction(
  '[FORM BUILDER] CHANGE_IN_STYLE_LIST',
  props<{ propToChange: any, newPropState: any }>()
)

export const returnInitialState = createAction(
  '[FORM BUILDER] RETURN_INITIAL_STATE'
)

export const onDataChange = createAction(
  '[FORM BUILDER] ON_DATA_CHANGE',
  props <{ event: any, typeField: any, index: number }>()
)

export const submitForm = createAction(
    '[FORM BUILDER] SUBMIT_FORM'
  )
