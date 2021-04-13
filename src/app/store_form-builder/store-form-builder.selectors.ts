import { createSelector, createFeatureSelector } from '@ngrx/store';
// import { State } from './store_form-builder.reducer'

const state = createFeatureSelector('storeFormBuilder')


export const selectSelectedFieldId = createSelector(
  state, (state: any) => {
    return state.selectedFieldId
  }
);

export const selectConstructorFields = createSelector(
  state, (state: any) => {
    return state.constructorFields
  }
);

