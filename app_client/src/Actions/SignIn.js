import axios from 'axios';

import {
  AUTHENTICATED,
  AUTHENTICATION_ERROR
} from './ActionTypes';


export function signInAction({ email, password }, history) {
  return async (dispatch) => {
    try {
      const res = await axios.post(`/login`, { email, password });

      dispatch({ type: AUTHENTICATED });
      localStorage.setItem('user', res.data.token);
      history.push('/');
    } catch(error) {
      dispatch({
        type: AUTHENTICATION_ERROR,
        payload: 'Invalid email or password'
      });
    }
  };
}
