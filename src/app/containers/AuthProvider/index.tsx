/**
 *
 * AuthProvider
 *
 */

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { reducer, sliceKey, actions } from './slice';
import { selectAuthProvider } from './selectors';
import { authProviderSaga } from './saga';
import { LoadingPage } from '../../components/LoadingPage';

interface Props {
  children: React.ReactNode;
}

export function AuthProvider(props: Props) {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: authProviderSaga });

  const authProvider = useSelector(selectAuthProvider);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.retrieveAccessToken());
  }, [dispatch]);

  if (authProvider.loadingToken) {
    return <LoadingPage />;
  }

  return <>{props.children}</>;
}
