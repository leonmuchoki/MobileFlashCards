import { combineReducers } from 'redux'

import { ADD_DECK, RECIEVE_DECKS, IS_LOADING, 
         HAS_ERROR, GET_DECK, ADD_CARD_TO_DECK } from '../actions'

const initialDeckState = {
  decks: [],
  deck: {}
}

export function decks(state=initialDeckState, action) {
  switch(action.type) {
    case ADD_DECK:
      //console.log('ADD_DECK::' + JSON.stringify(action.deck))
      let newDeck = []
      newDeck.push(action.deck)
      return {
        ...state,
        decks: [
          ...state.decks,
          ...newDeck
        ]
      }

    case ADD_CARD_TO_DECK:
     console.log('!!!!ADD_CARD_TO_DECK...!!...' + JSON.stringify(action.newCard))
      let decksAvailable = state.decks

      // some kitchen time...:-)
      let cardToUpdate = decksAvailable.filter((deck)=>(deck.title === action.deckTitle))
      
      cardToUpdate[0]["questions"].push(action.newCard)
      console.log('!!!!ADD_CARD_TO_DECK...!!...--cardToUpdate---' + JSON.stringify(cardToUpdate))
      let decksRemoveUpdatedDeck = decksAvailable.filter((deck)=>(deck.title !== action.deckTitle))

      //re-insert updated deck
      let new_decks = [...decksRemoveUpdatedDeck,...cardToUpdate]
      //decksRemoveUpdatedDeck.push(cardToUpdate)

      console.log('!!!!ADD_CARD_TO_DECK...!!...new_decks----' + JSON.stringify(new_decks))
      return Object.assign({}, state, {decks: new_decks, deck: cardToUpdate[0]})

    case RECIEVE_DECKS:
      console.log('!!!!RECIEVE_DECKS...' + JSON.stringify(action.decks))

      return {
        state,
        decks: [...state.decks,...action.decks]
        }

    case GET_DECK:
      //console.log('----GET_DECK----' + JSON.stringify(action.deck[0]))
      return {
        ...state,
        deck: action.deck[0]
      }

    default:
      return state
  }
}

// loading status
export function isLoading(state = false, action) {
  switch (action.type) {
    case IS_LOADING:
      return action.isLoading; 
    
    default:
      return state;
  }
}

// error status
export function hasError(state = false, action) {
  switch (action.type) {
    case HAS_ERROR:
      return action.hasErrored; 
    
    default:
      return state;
  }
}

export default combineReducers({
  decks,
  isLoading,
  hasError,
})