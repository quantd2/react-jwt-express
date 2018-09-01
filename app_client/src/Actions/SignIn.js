import axiosClient from '../Utils/axiosClient';
import getAllBoards from './GetAllBoards';

import {
  AUTHENTICATED,
  AUTHENTICATION_ERROR
} from './ActionTypes';


export function signInAction({ email, password }, history) {
  return async (dispatch) => {
    try {
      const response = await axiosClient.post(`/api/login`, { email, password });
      const body = await response.data;
      localStorage.setItem('authToken', body.accessToken);
      dispatch({ type: AUTHENTICATED });
      dispatch(getAllBoards());
      history.push('/');
    } catch(error) {
      dispatch({
        type: AUTHENTICATION_ERROR,
        payload: 'Invalid email or password'
      });
    }
  };
}
