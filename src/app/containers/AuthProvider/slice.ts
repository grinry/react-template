import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { ContainerState } from './types';
import { Nullable } from '../../../types';

// The initial state of the AuthProvider container
export const initialState: ContainerState = {
  accessToken: null,
  loadingToken: false,
};

const authProviderSlice = createSlice({
  name: 'authProvider',
  initialState,
  reducers: {
    retrieveAccessToken(state) {
      state.loadingToken = true;
    },
    setAccessToken(state, action: PayloadAction<Nullable<string>>) {
      state.accessToken = action.payload;
      state.loadingToken = false;
    },
    logOut(state) {
      state.accessToken = null;
      state.loadingToken = false;
    },
  },
});

export const { actions, reducer, name: sliceKey } = authProviderSlice;
