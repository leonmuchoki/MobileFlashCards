import * as DeckAPI from '../utils/api'

export const ADD_DECK = 'ADD_DECK'
export const ADD_CARD_TO_DECK = 'ADD_CARD_TO_DECK' 
export const RECIEVE_DECKS = 'RECIEVE_DECKS'
export const GET_DECK = 'GET_DECK'
export const IS_LOADING = 'IS_LOADING'
export const HAS_ERROR = 'HAS_ERROR'

export function addDeckSuccess(deck) {
  return {
    type: ADD_DECK,
    deck
  }
}

export function addCardToDeckSuccess(newCard, deckTitle) {
  return {
    type: ADD_CARD_TO_DECK,
    newCard,
    deckTitle
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
                  console.log('fetchAllDecks ==== ' + JSON.stringify(data))
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

// save new deck
export function saveDeck(deck) {
  return (dispatch) => {
    dispatch(isLoading(true));
    DeckAPI.setNewDeck(deck)
                .then((response)=> {
                  dispatch(isLoading(false));
                  return response
                })
                .then((data)=> {
                  //console.log('postGetDataSuccess ' + JSON.stringify(data))
                  dispatch(addDeckSuccess(data))
                })
                .catch(()=> dispatch(hasErrored(true)))  
  }
}

// add card to deck
export function addNewCardDeck(deckName,new_card) {
  return (dispatch) => {
    dispatch(isLoading(true));
    DeckAPI.addCardToDeck(deckName,new_card)
                .then((response)=> {
                  dispatch(isLoading(false));
                  return response
                })
                .then((data)=> {
                  //console.log('postGetDataSuccess ' + JSON.stringify(data))
                  dispatch(addCardToDeckSuccess(data,deckName))
                })
                .catch(()=> dispatch(hasErrored(true)))  
  }
}