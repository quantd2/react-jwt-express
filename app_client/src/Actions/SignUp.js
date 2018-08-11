import axios from 'axios';

import {
  AUTHENTICATED,
  AUTHENTICATION_ERROR
} from './ActionTypes';

const registerSuccess = data => dispatch => {
   dispatch({ type: AUTHENTICATED });
   localStorage.setItem('user', data.token);
   history.push('/');
}

const registerFailure = e => dispatch => {
  console.log(e);
  dispatch({
    type: AUTHENTICATION_ERROR,
    payload: 'Invalid email or password'
  });
}

async function registerRequest ({ email, password }) {
  // 'await' the response from fetch - no callback, you can just carry on
  // and use 'response' as normal rather than wrap it in a function!
  const response = await fetch('/register', {
    method: 'POST',
    body: JSON.stringify({ email, password })
  });

  // response.json() is async too, but you don't need an 'await'
  // keyword in a return from 'async' (it's implied)
  return response.json();
}

export function signUpAction({ email, password }, history) {
  // this one's 'async'
  return async dispatch => {
    // wrap in try to listen for Promise rejections - equivalent of '.catch()'
    try {
      // wait for the fetch to finish then dispatch the result
      const data = await registerRequest({ email, password });
      dispatch(registerSuccess(data));
    } catch (e) {
      // catch errors from fetch
      dispatch(registerFailure(e));
    }
  };
}

// export function signUpAction({ email, password }, history) {
//   return async (dispatch) => {
//     try {
//       const res = await axios.post(`api/register`, { email, password });
//
//       dispatch({ type: AUTHENTICATED });
//       localStorage.setItem('user', res.data.token);
//       history.push('/');
//     } catch(error) {
//       dispatch({
//         type: AUTHENTICATION_ERROR,
//         payload: 'Invalid email or password'
//       });
//     }
//   };
// }
