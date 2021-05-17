import { Params } from '@angular/router';
import { ActionReducerMap, createSelector, MetaReducer } from '@ngrx/store';
import { environment } from '../../environments/environment';

// Imports from reducers
import * as authStore from '../store-auth/store-auth.reducer';

export const getLoginState = (state: authStore.State) => state;

export const getUser = createSelector(
  getLoginState,
  authStore.getUser
);