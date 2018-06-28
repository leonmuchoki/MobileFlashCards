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

export function addCardToDeck(deckName,new_card) {
  AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then((results) => {
      let res = JSON.parse(results)
      let thisDeck = Object.keys(res)
        .filter((title)=>(title === deckName))
      let title = thisDeck[0]
      let thisCard = res[title]
      let questions = []
      if (thisCard.questions !== undefined) {
        thisCard.questions.push(new_card)
        let deck = {}
        deck[title] = thisCard
        return AsyncStorage.mergeItem(DECKS_STORAGE_KEY,JSON.stringify(deck))
      } else {
        questions.push(new_card)
        let newCard = {title: deckName, questions: questions}
        let newDeck = {}
        newDeck[title] = newCard
        return AsyncStorage.mergeItem(DECKS_STORAGE_KEY,JSON.stringify(newDeck))
      }
      //alert(JSON.stringify(thisCard))
    })
  //return AsyncStorage.mergeItem(DECKS_STORAGE_KEY,JSON.stringify(card))
}

