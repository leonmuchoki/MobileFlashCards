import { AsyncStorage } from 'react-native'
import { DECKS_STORAGE_KEY, setDummyDataDecks } from './_decks'

export function getDecks() {
  let decksData = {}
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then((results) => {
      if (results === null)
      {
        AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify(setDummyDataDecks()))
        return setDummyDataDecks()
      }
      else {
         return JSON.parse(results)
      }
    })
}

export function setNewDeck(title) {
  return AsyncStorage.mergeItem(DECKS_STORAGE_KEY,JSON.stringify(title))
}
