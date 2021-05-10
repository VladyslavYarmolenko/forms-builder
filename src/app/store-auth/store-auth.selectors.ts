import { Params } from '@angular/router';
import { ActionReducerMap, createSelector, MetaReducer } from '@ngrx/store';
import { environment } from '../../environments/environment';

// Imports from reducers
import * as authStore from '../store-auth/store-auth.reducer';

// export const metaReducers: MetaReducer<any, any>[] = !environment.production ? [] : [];

/**
 * Selectors returns smaller piece of state out of the root state
 */
export const getLoginState = (state: authStore.State) => state;

/**
 * Selectors from Core module
 */

export const getUser = createSelector(
  getLoginState,
  authStore.getUser
);