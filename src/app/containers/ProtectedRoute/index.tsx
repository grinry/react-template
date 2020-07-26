/**
 *
 * ProtectedRoute
 *
 */

import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useCheckAuth } from '../../hooks/useCheckAuth';

interface Props {
  component: React.ComponentType<any>;
  [key: string]: any;
}

export function ProtectedRoute({ component: Component, ...rest }: Props) {
  const isAuthorized = useCheckAuth();

  return (
    <Route
      {...rest}
      render={props => {
        if (isAuthorized) {
          return <Component {...props} {...rest} />;
        }
        return <Redirect to={{ pathname: '/sign-in' }} />;
      }}
    />
  );
}
