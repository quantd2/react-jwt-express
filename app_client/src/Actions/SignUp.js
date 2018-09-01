import axiosClient from '../Utils/axiosClient';

import {
  AUTHENTICATED,
  AUTHENTICATION_ERROR
} from './ActionTypes';

const registerSuccess = data => dispatch => {
   dispatch({ type: AUTHENTICATED });
   localStorage.setItem('authToken', data.token);
   history.push('/');
}

const registerFailure = e => dispatch => {
  dispatch({
    type: AUTHENTICATION_ERROR,
    payload: 'Invalid email or password'
  });
}

async function registerRequest ({ name, email, password }) {
  // 'await' the response from fetch - no callback, you can just carry on
  // and use 'response' as normal rather than wrap it in a function!
  const response = await axiosClient.post(`/api/register`, { name, email, password });
  const body = await response.data;
  return body;
}

export function signUpAction({ name, email, password }, history) {
  // this one's 'async'
  return async dispatch => {
    // wrap in try to listen for Promise rejections - equivalent of '.catch()'
    try {
      // wait for the fetch to finish then dispatch the result
      const data = await registerRequest({ name, email, password });
      dispatch(registerSuccess(data));
    } catch (e) {
      // catch errors from fetch
      dispatch(registerFailure(e));
    }
  };
}
