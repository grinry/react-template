import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from './slice';

const selectDomain = (state: RootState) => state.authProvider || initialState;

export const selectAuthProvider = createSelector(
  [selectDomain],
  authProviderState => authProviderState,
);
