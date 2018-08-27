export const SET_DECKS = "SET_DECKS"
export const ADD_CARD = "ADD_CARD"
export const ADD_DECK = "ADD_DECK"
export const GET_DECK = "GET_DECK"

export const setDecks = decks => ({
  type: SET_DECKS,
  decks
})

export const getDeck = id => ({
  type: GET_DECK,
  id
})

export const addCard = (title, card) => ({
  type: ADD_CARD,
  title,
  card
})

export const saveDeck = title => ({
  type: ADD_DECK,
  title
})
