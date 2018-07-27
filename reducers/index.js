import { combineReducers } from 'redux'

import { ADD_DECK, RECIEVE_DECKS, IS_LOADING, HAS_ERROR } from '../actions'

const initialDeckState = {
  decks: []
}

export function decks(state=initialDeckState, action) {
  switch(action.type) {
    case ADD_DECK:
      return {
        ...state,
        ...action.deck
      }

    case RECIEVE_DECKS:
      console.log('RECIEVE_DECKS...' + JSON.stringify(action.decks))
      return {
        ...state,
        decks: [
          ...state.decks, 
          ...action.decks]
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