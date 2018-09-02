import { HANDLE_DROP } from './ActionTypes';
import axiosClient from '../Utils/axiosClient';

// export default function handleDrop(cardName, cardId, listId, newListId) {
//     return dispatch => {
//         dispatch({ type: HANDLE_DROP, payload: { cardName, cardId, listId, newListId } });
//     }
// }

export default function handleDrop(cardName, cardId, listId, newListId) {
    return dispatch => {
        axiosClient.put(`/api/move-cards/${cardId}`, { srcListId: listId, desListId: newListId }).then(() => {
            dispatch({ type: HANDLE_DROP, payload: { cardName, cardId, listId, newListId } });
        });
    }
}
