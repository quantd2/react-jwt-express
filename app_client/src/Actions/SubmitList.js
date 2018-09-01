import { SUBMIT_LIST } from './ActionTypes';
import axiosClient from '../Utils/axiosClient';

export default function submitList(id, listData) {
    return dispatch => {
        axiosClient.post(`/api/boards/${id}/lists`, { name: listData })
            .then((response) => {
                const newList = {
                    id: response.data._id,
                    name: response.data.name
                };
                dispatch({ type: SUBMIT_LIST, payload: newList })
            });
    }
}
