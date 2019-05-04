import {AsyncStorage} from 'react-native'

const DECK_KEY = 'UCard:deck';

export function getDeck(id) {
    return AsyncStorage.getItem(DECK_KEY)
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
    getDeckList()
        .then(data => !data
            ? AsyncStorage.setItem(DECK_KEY, JSON.stringify({[deck.id]: deck}))
            : AsyncStorage.setItem(DECK_KEY, JSON.stringify({...data, [deck.id]: deck}))
                .catch(err => console.log(err)))
        .catch(err => console.log(err))
}

export async function clearStorage() {
    return await AsyncStorage.removeItem(DECK_KEY)
}
