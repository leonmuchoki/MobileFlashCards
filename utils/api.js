import { AsyncStorage } from 'react-native'
import { DECKS_STORAGE_KEY, setDummyDataDecks } from './_decks'

export function getDecks() {
  let decksData = {}
  //AsyncStorage.removeItem(DECKS_STORAGE_KEY)
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then((results) => {
      //console.log('api results::getDecks' + JSON.stringify(results))
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

export function setNewDeck(title) {
  return AsyncStorage.setItem(DECKS_STORAGE_KEY,JSON.stringify(title), () => {
    AsyncStorage.getItem(DECKS_STORAGE_KEY).then((result)=>{
      return JSON.parse(result)
    })
  })
}

export function addCardToDeck(deckName,new_card) {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then((results) => {
      let res = JSON.parse(results)
      let thisDeck = Object.keys(res)
        .filter((title)=>(title === deckName))
      
      let title = thisDeck[0]
      let thisCard = res[title]
      
      let questions = []
      if (thisCard.questions !== undefined) {
        //thisCard.questions.push(new_card)
        
        let newQstns = {}
        let mergeCards = thisCard.questions
        mergeCards.push(new_card)
        newQstns["questions"] = mergeCards//[...new_card]
        //alert(JSON.stringify(mergeCards))
        thisCard.questions = [...thisCard.questions,...new_card]
        //alert(JSON.stringify(newQstns))
        let deck = {}
        deck[title] = newQstns
        AsyncStorage.setItem(DECKS_STORAGE_KEY,JSON.stringify(deck))
                           
      } else {
        questions.push(new_card)
        let newCard = {title: deckName, questions: questions}
        let newDeck = {}
        newDeck[title] = newCard
        AsyncStorage.setItem(DECKS_STORAGE_KEY,JSON.stringify(newDeck))
                          
      }
      //alert(JSON.stringify(thisCard))
    })
  //return AsyncStorage.mergeItem(DECKS_STORAGE_KEY,JSON.stringify(card))
}

