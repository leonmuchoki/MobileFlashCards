export const ADD_DECK = 'ADD_DECK'
export const RECIEVE_DECKS = 'RECIEVE_DECKS'

export function addDeck(deck) {
  type: ADD_DECK,
  deck
}

export function recieveDecks(decks) {
  type: RECIEVE_DECKS,
  decks
}