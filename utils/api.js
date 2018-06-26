import { AsyncStorage } from 'react-native'
import { DECKS_STORAGE_KEY, setDummyDataDecks } from './_decks'

export function getDecks() {
  let decksData = {}
  AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then((results) => {
      if (results === null)
      {
        AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify(setDummyDataDecks()))
        decksData = setDummyDataDecks()
      }
      else {
        decksData = JSON.parse(results)
      }
    })

  return setDummyDataDecks()//decksData
}
