import {
    SELECT_ACTIVE_BOARD,
    SELECT_ACTIVE_BOARD_SUCCESS,
} from './ActionTypes';

import axiosClient from '../Utils/axiosClient';


export default function selectActiveBoard(id) {
    return dispatch => {
        axiosClient.get(`/api/boards/${id}`)
            .then((response) => {
                const activeBoard = response.data;

                dispatch({ type: SELECT_ACTIVE_BOARD, payload: activeBoard });

                dispatch({ type: SELECT_ACTIVE_BOARD_SUCCESS });
            });

    }
}
