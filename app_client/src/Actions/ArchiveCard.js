import { ARCHIVE_POST } from './ActionTypes';
import axiosClient from '../Utils/axiosClient';

// export default function archiveCard(cardId, listId) {
//     return dispatch => {
//         dispatch({ type: ARCHIVE_POST, payload: { cardId, listId } })
//     }
// }

export default function archiveCard(cardId, listId) {
    return dispatch => {
        axiosClient.put(`/api/archive-cards/${cardId}`).then((response) => {
            const card = response.data;
            dispatch({ type: ARCHIVE_POST, payload: { cardId: card._id, isArchived: card.isArchived, listId } })
        });
    }
}
