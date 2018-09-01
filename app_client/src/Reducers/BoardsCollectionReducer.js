import {
    STORE_NEW_BOARD_TO_COLLECTION,
    GET_ALL_BOARDS
} from '~Actions/ActionTypes';

const initialState = [];

export default function(state = initialState, action) {
    switch (action.type) {

        case STORE_NEW_BOARD_TO_COLLECTION:
            return [...state, action.payload];

        case GET_ALL_BOARDS:
            return [...state, ...action.payload];

        default:
            return state;

    }
}
