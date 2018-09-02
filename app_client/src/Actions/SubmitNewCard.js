import { SUBMIT_NEW_CARD } from './ActionTypes';
import axiosClient from '../Utils/axiosClient';


export default function submitNewCard(cardName, listId) {
    return dispatch => {
        axiosClient.post(`/api/cards`, { name: cardName, listId: listId })
            .then((response) => {
                const card = response.data;
                dispatch({ type: SUBMIT_NEW_CARD, payload: { cardName: card.name, listId, cardId: card._id } });
            })
    }
}
