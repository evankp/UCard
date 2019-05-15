import * as AsyncStorage from "../../utils/async-storage";

export const ADD_DECK = 'ADD_DECK';
export const REMOVE_DECK = 'REMOVE_DECK';
export const ADD_CARD = 'ADD_CARD';
export const INIT_DECKS = 'INIT_DECKS';

export function addDeck(deck) {
    return {
        type: ADD_DECK,
        deck
    }
}

export function initDecks(decks) {
    return {
        type: INIT_DECKS,
        decks
    }
}

export function removeDeck(id) {
    return {
        type: REMOVE_DECK,
        id
    }
}

export function addCard(id, card) {
    return {
        type: ADD_CARD,
        id,
        card
    }
}

export const submitDeck = deck => dispatch => {
    dispatch(addDeck(deck));

    AsyncStorage.addDeck(deck)
        .catch(err => {
            console.log(err)
        })
};

export const deleteDeck = id => dispatch => {
  dispatch(removeDeck(id));

  AsyncStorage.deleteDeck(id)
      .catch(err => console.log(err))
};
