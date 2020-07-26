import { put, select, takeLatest, all } from 'redux-saga/effects';
import { get, set, remove } from 'local-storage';
import { actions } from './slice';
import { Nullable } from '../../../types';
import { selectAuthProvider } from './selectors';

const ACCESS_TOKEN_STORAGE_KEY = 'access-token';

export function* retrieveAccessTokenSaga() {
  try {
    const token = get<Nullable<string>>(ACCESS_TOKEN_STORAGE_KEY);
    if (token) {
      yield put(actions.setAccessToken(token));
      return;
    }
  } catch (e) {
    // todo report error?
  }
  yield put(actions.logOut());
}

export function* changeAccessTokenSaga() {
  const { accessToken } = yield select(selectAuthProvider);
  if (accessToken) {
    set(ACCESS_TOKEN_STORAGE_KEY, accessToken);
  } else {
    remove(ACCESS_TOKEN_STORAGE_KEY);
  }
}

export function* authProviderSaga() {
  yield all([
    takeLatest(actions.retrieveAccessToken.type, retrieveAccessTokenSaga),
    takeLatest(
      [actions.setAccessToken.type, actions.logOut.type],
      changeAccessTokenSaga,
    ),
  ]);
}
