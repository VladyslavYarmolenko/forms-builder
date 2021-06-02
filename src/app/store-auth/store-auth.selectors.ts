import { createSelector } from '@ngrx/store';

import * as authStore from 'app/store-auth/store-auth.reducer';

export const getLoginState = (state: authStore.State) => state;

export const getUser = createSelector(
  getLoginState,
  authStore.getUser
);
