import { createSelector, createFeatureSelector } from '@ngrx/store';
import { FormBuilderState } from 'app/interfaces/interfaces';


const state = createFeatureSelector<FormBuilderState>('storeFormBuilder');


export const selectSelectedFieldId = createSelector(
  state, (currentState: FormBuilderState) => {
    return currentState.selectedFieldId;
  }
);

export const selectConstructorFields = createSelector(
  state, (currentState: FormBuilderState) => {
    return currentState.constructorFields;
  }
);

