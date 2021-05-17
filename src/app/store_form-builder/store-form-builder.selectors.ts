import { formBuilderState } from './../../interfaces/interfaces';
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { State } from 'app/store-auth/store-auth.reducer';

const state = createFeatureSelector<formBuilderState>('storeFormBuilder');


export const selectSelectedFieldId = createSelector(
  state, (state: formBuilderState) => {
    return state.selectedFieldId
  }
);

export const selectConstructorFields = createSelector(
  state, (state: any) => {
    return state.constructorFields
  }
);


export const getStylingState = createSelector(
  state, (state: any) => {
    return state.stylesFields
  }
);

