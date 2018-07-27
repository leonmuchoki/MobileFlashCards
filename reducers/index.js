import { ADD_DECK, RECIEVE_DECKS } from '../actions'

export function decks(state={}, action) {
  switch(action.type) {
    case ADD_DECK:
      return {
        ...state,
        ...action.deck
      }

    case RECIEVE_DECKS:
      return {
        ...state,
        ...action.decks
      }

    default:
      return state
  }
}

export default decks