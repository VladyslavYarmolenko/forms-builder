import { createSelector, createFeatureSelector } from '@ngrx/store';
// import { State } from './store_form-builder.reducer'


const state = createFeatureSelector('storeFormBuilder')

export interface isFieldSelectedState {
  isFieldSelected: boolean;
  constructorFields: [];
};

export const selectField = createSelector(
  state, (state: any) => {
    return state.isFieldSelected
  }
);

export const selectConstructorFields = createSelector(
  state, (state: any) => {
    return state.constructorFields
  }
);

export const selectDraggableField = createSelector(
  state, (state: any) => {
    return state.draggableField
  }
);
