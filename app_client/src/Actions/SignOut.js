import {
  UNAUTHENTICATED
} from './ActionTypes';

export function signOutAction() {
  localStorage.clear();
  return {
    type: UNAUTHENTICATED
  };
}
