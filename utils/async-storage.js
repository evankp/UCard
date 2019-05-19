import {AsyncStorage} from 'react-native';

const DECK_KEY = 'UCard:deck';

export async function getDeckList() {
    return AsyncStorage.getItem(DECK_KEY)
        .then(res => JSON.parse(res))
}

export function addDeck(deck) {
    return getDeckList()
        .then(data => !data
            ? AsyncStorage.setItem(DECK_KEY, JSON.stringify({[deck.id]: deck}))
            : AsyncStorage.setItem(DECK_KEY, JSON.stringify({...data, [deck.id]: deck})))
}

export function modifyDeck(deck) {
    return getDeckList()
        .then(data => AsyncStorage.setItem(DECK_KEY, JSON.stringify({...data, [deck.id]: deck})))
}

export function deleteDeck(id) {
    return getDeckList()
        .then(data => {
            if (data) {
                delete data[id];

                AsyncStorage.setItem(DECK_KEY, JSON.stringify(data))
            }
        })
}

export async function clearStorage() {
    return await AsyncStorage.removeItem(DECK_KEY)
}
