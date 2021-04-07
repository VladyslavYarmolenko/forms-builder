import { createSelector, createFeatureSelector } from '@ngrx/store';
import { State } from './store.reducer';

const state = createFeatureSelector('store')

export interface isFieldSelectedState {
  isFieldSelected: boolean;
}

// export const selectIsFieldSelected = (state: State) => state.isFieldSelected;
 
export const selectField = createSelector(
  state, (state: any) => {
    console.log('state.isFieldSelected', state)
    return state.isFieldSelected
  }
);