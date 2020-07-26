import { useSelector } from 'react-redux';
import { selectAuthProvider } from '../containers/AuthProvider/selectors';

export function useCheckAuth() {
  const state = useSelector(selectAuthProvider);
  return !!state?.accessToken;
}
