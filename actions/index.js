import * as DeckAPI from '../utils/api'

export const ADD_DECK = 'ADD_DECK'
export const RECIEVE_DECKS = 'RECIEVE_DECKS'
export const GET_DECK = 'GET_DECK'
export const IS_LOADING = 'IS_LOADING'
export const HAS_ERROR = 'HAS_ERROR'

export function addDeck(deck) {
  return {
    type: ADD_DECK,
    deck
  }
}

export function recieveDecks(decks) {
  return {
    type: RECIEVE_DECKS,
    decks
  }
}

export function isLoading(bool) {
  return {
    type: IS_LOADING,
    isLoading: bool
  }
}

export function hasErrored(bool) {
  return {
    type: HAS_ERROR,
    hasErrored: bool
  }
}

// GET ALL DECKS
export function fetchAllDecks() {
  return (dispatch) => {
    dispatch(isLoading(true));

    DeckAPI.getDecks()
                .then((response)=> {
                  dispatch(isLoading(false));
                  return response
                })
                .then((data)=> {
                  //console.log('postGetDataSuccess ' + JSON.stringify(data))
                  dispatch(recieveDecks(data))
                })
                .catch(()=> dispatch(hasErrored(true)))  
  }
}

// GET SPECIFIC DECK
export function receivedDeck(deck) {
  return {
    type: GET_DECK,
    deck
  }
}

export function fetchDeck(deckName) {
  return (dispatch) => {
    dispatch(isLoading(true));
    DeckAPI.getDeck(deckName)
                .then((response)=> {
                  dispatch(isLoading(false));
                  return response
                })
                .then((data)=> {
                  //console.log('postGetDataSuccess ' + JSON.stringify(data))
                  dispatch(receivedDeck(data))
                })
                .catch(()=> dispatch(hasErrored(true)))  
  }
}