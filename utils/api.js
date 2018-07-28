import { AsyncStorage } from 'react-native'
import { DECKS_STORAGE_KEY, setDummyDataDecks } from './_decks'

export function getDecks() {
  //danger....remember to comment
  //AsyncStorage.removeItem(DECKS_STORAGE_KEY)
  
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then((results) => {
      console.log('api results::getDecks' + JSON.stringify(results))
      if (results === null || results === undefined)
      {
        let dummyDecks = setDummyDataDecks()
        AsyncStorage.setItem(DECKS_STORAGE_KEY,JSON.stringify(dummyDecks))
        return dummyDecks
      }
      else {
         return JSON.parse(results)
      }
    })
}

export function getDeck(deckName) {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then((results) => {
      let deckz
      let deck
      if (results === null || results === undefined)
      {
         AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify(setDummyDataDecks()))
         deckz = setDummyDataDecks()
         deck = deckz.filter((deck)=>(deck.title===deckName))
      }
      else {
         deckz = JSON.parse(results)
         deck = deckz.filter((deck)=>(deck.title===deckName))
      }
      console.log('api results::getDeck:' + deckName + ' +++' + JSON.stringify(deck))
      return deck
    })
}

export function setNewDeck(deck) {
  console.log('setNewDeck..' + JSON.stringify(deck))
  // fetch available decks, append new deck then save new deck
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then((results)=>{
      if (results === undefined) {
        AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify(deck))
        return deck
      }
      else {
        // has decks...so clear deck and append our new deck
        let res = JSON.parse(results)
        res.push(deck)
        AsyncStorage.removeItem(DECKS_STORAGE_KEY)
          .then(() => {
            //insert new data
            console.log('insert new data...' + JSON.stringify(res))
            AsyncStorage.setItem(DECKS_STORAGE_KEY,JSON.stringify(res))
          })
      }
      return deck
    })
    

  return AsyncStorage.setItem(DECKS_STORAGE_KEY,JSON.stringify(deck), () => {
    AsyncStorage.getItem(DECKS_STORAGE_KEY).then((result)=>{
      return JSON.parse(result)
    })
  })
}

export function addCardToDeck(deckName,new_card) {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then((results) => {
      let res = JSON.parse(results)
      // some cookery :-)
      let cardToUpdate = res.filter((deck)=>(deck.title === deckName))
      cardToUpdate[0]["questions"].push(new_card)
      
      let decksRemoveUpdatedDeck = res.filter((deck)=>(deck.title !== deckName))

      //re-insert updated deck
      let decksToSave =  [...decksRemoveUpdatedDeck, ...cardToUpdate]
      decksRemoveUpdatedDeck.push(cardToUpdate)
      
      //then save to db...
      //first we clear...then save...naive(mtu hajaiva) way for now aisee :-)
      AsyncStorage.removeItem(DECKS_STORAGE_KEY)
          .then(() => {
            //insert new data
            console.log('insert updated data...' + JSON.stringify(decksToSave))
            AsyncStorage.setItem(DECKS_STORAGE_KEY,JSON.stringify(decksToSave))
          })

      return new_card//new_card // return card updated...so we can update it in redux reducer
      }
  )}
