import { AsyncStorage } from 'react-native'
import { DECKS_STORAGE_KEY, setDummyDataDecks } from './_decks'

export function getDecks() {
  let decksData = {}
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then((results) => {
      if (results === null)
      {
        
        AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify(setDummyDataDecks()))
        
        //alert(JSON.stringify('results is null...' + setDummyDataDecks()))
        return setDummyDataDecks()
      }
      else {
        //alert('result from asynstorage...' + JSON.stringify(results))
         return JSON.parse(results)
      }
    })

  //return decksData//setDummyDataDecks()//decksData
}
