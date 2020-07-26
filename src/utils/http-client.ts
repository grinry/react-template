import Axios, { AxiosResponse } from 'axios';
import { store } from '../store/store';
import { actions } from 'app/containers/AuthProvider/slice';

export class AxiosError extends Error {
  response?: AxiosResponse;
}

const axios = Axios.create({
  baseURL: process.env.REACT_APP_BASE_API,
  headers: {
    accept: 'application/json',
    'content-type': 'application/json',
  },
});

axios.interceptors.request.use(
  config => {
    const state = store.getState();
    const token = state?.authProvider?.accessToken;
    if (token) {
      config.headers['Authorization'] = token;
    }
    return config;
  },
  error => Promise.reject(error),
);

axios.interceptors.response.use(
  response => {
    if (response.data && response.data.error) {
      const error = new AxiosError('API Error');
      error.response = response;
      return Promise.reject(error);
    }
    return response;
  },
  error => {
    if (Axios.isCancel(error)) {
      return;
    }

    if (!error.response) {
      return Promise.reject(
        new Error('Unable to reach server. Please try again.'),
      );
    }

    if (error.response.status === 401) {
      store.dispatch(actions.logOut());
    }
    return Promise.reject(error);
  },
);

export const httpClient = axios;
