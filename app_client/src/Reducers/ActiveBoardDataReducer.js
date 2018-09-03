import { combineReducers } from 'redux';
import {
    SUBMIT_LIST,
    SUBMIT_NEW_CARD,
    HANDLE_DROP,
    ARCHIVE_POST,
    SELECT_ACTIVE_BOARD
} from '../Actions/ActionTypes';
import uniqueId from 'lodash/uniqueId';
import isEmpty from 'lodash/isEmpty';
import keyBy from 'lodash/keyBy';

const ListReducer = (state = {}, action) => {

    // const listId = uniqueId("list_");

    switch (action.type) {

        case SELECT_ACTIVE_BOARD:
            if(isEmpty(action.payload.lists)) {
                return [];
            } else {
                return keyBy(action.payload.lists, '_id');
            }

        case SUBMIT_LIST:
            return {
                ...state,
                [action.payload.id]: { // the unique ID of the list
                    name: action.payload.name, // name of the list
                    id: action.payload.id, // list ID
                    cards: [] // card IDs go inside here
                }
            };

        case SUBMIT_NEW_CARD: {
            const { listId, cardName, cardId } = action.payload;
            const currentList = state[listId];
            currentList.cards.push({ name: cardName, _id: cardId, listId, isArchived: false })
            return {
                ...state,
                [listId]: currentList,
            }
        }

        case HANDLE_DROP: {
            const { cardId, cardName, listId, newListId } = action.payload;
            const currentList = state[newListId]; // list that's going to be taking the new card
            currentList.cards.push({ name: cardName, _id: cardId, listId: newListId }) // add the card to the list
            const removeCard = state[listId].cards.findIndex(card => card._id === cardId); // find the card to remove
            const oldList = state[listId].cards.splice(removeCard, 1) // remove the card from the list

                return {
                    ...state,
                    [newListId]: currentList,
                }
        }

        case ARCHIVE_POST: {
            const { cardId, listId, isArchived } = action.payload;
            const currentList = state[listId];
            const findCard = currentList.cards.find(card => card._id === cardId);

            findCard.isArchived = isArchived;
            // if (findCard.isArchived === false) {
            //     findCard.isArchived = true;
            // } else {
            //     findCard.isArchived = false;
            // }

            return {
                ...state,
                [listId]: currentList
            }
        }

        default:
            return state;
    }
}


const ActiveBoardReducer = combineReducers({
    listItems: ListReducer,
})

export default ActiveBoardReducer;
