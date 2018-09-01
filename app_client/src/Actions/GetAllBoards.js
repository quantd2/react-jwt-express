import { GET_ALL_BOARDS } from './ActionTypes';
import axiosClient from '../Utils/axiosClient'

// const errorHandler = e => dispatch => {
//   dispatch({
//     type: API_ERROR,
//     payload: 'Api error'
//   });
// }

async function getAllBoardsRequest() {
  // 'await' the response from fetch - no callback, you can just carry on
  // and use 'response' as normal rather than wrap it in a function!
  const response = await axiosClient.get('/api/boards');
  const data = await response.data;
  return data;
}

export default function getAllBoards() {
  return async dispatch => {
    try {
      const data = await getAllBoardsRequest();
      dispatch({ type: GET_ALL_BOARDS, payload: data });
    } catch(e) {
      console.log(e);
    }
  }
}
