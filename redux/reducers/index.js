import {ADD_CARD, ADD_DECK, INIT_DECKS, REMOVE_DECK} from "../actions";

import {omit} from 'lodash'

export default function decks(state = {}, action) {
    switch (action.type) {
        case INIT_DECKS:
            return action.decks;

        case ADD_DECK:
            return {
                ...state,
                [action.deck.id]: {
                    ...action.deck
                }
            };

        case REMOVE_DECK:
            return omit(state, [action.id]);

        case ADD_CARD:
            const deck = state[action.id];

            return {
                ...state,
                [action.id]: {
                    ...deck,
                    cards: [...deck.cards, action.card]
                }
            };

        default:
            return state
    }
}
