import { Nullable } from '../../../types';

export interface AuthProviderState {
  accessToken: Nullable<string>;
  loadingToken: boolean;
}

export type ContainerState = AuthProviderState;
