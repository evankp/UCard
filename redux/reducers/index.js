import {ADD_CARD, ADD_DECK, CLEAR_DECKS, INIT_DECKS, REMOVE_DECK} from "../actions";

// Used to remove a deck from state, action: REMOVE_DECK
import {omit} from 'lodash'

export default function decks(state, action) {
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

        case CLEAR_DECKS:
            return state = undefined;

        default:
            return state
    }
}
