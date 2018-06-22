import { AsyncStorage } from 'react-native'
import { DECKS_STORAGE_KEY, setDummyDataDecks } from './_decks'

export function getDecks() {
  let decks = AsyncStorage.getItem(DECKS_STORAGE_KEY)
  if (decks === null) {
    return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify(setDummyDataDecks()))
  }
}
