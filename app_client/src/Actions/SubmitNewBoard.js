import axiosClient from '../Utils/axiosClient';

import {
    SUBMIT_NEW_BOARD,
    STORE_NEW_BOARD_TO_COLLECTION,
} from './ActionTypes';
import Store from './../Store';

export default function submitNewBoard(boardData) {
  return dispatch => {
    axiosClient.post('/api/boards', { name: boardData })
      .then((response) => {
        const newBoard = {
            _id: response.data._id,
            name: response.data.name,
            slug: response.data.slug
        };
        dispatch({ type: STORE_NEW_BOARD_TO_COLLECTION, payload: newBoard });
      })
  }

}
