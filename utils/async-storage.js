import {AsyncStorage} from 'react-native'

const DECK_KEY = 'UCard:deck';

export function getDeck(id) {
    AsyncStorage.getItem(DECK_KEY)
        .then(res => {
            const data = JSON.parse(res);

            return data[id]
        })
}

export async function getDeckList() {
    return AsyncStorage.getItem(DECK_KEY)
        .then(res => JSON.parse(res))
}

export function addDeck(deck) {
    AsyncStorage.mergeItem(DECK_KEY, JSON.stringify(deck))
        .catch(err => console.log(err))
}

export async function clearStorage() {
    return await AsyncStorage.removeItem(DECK_KEY)
}
