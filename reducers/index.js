import { SET_DECKS, ADD_CARD, ADD_DECK } from "../actions"

export default (deck = (state = {}, action) => {
  switch (action.type) {
    case SET_DECKS:
    // add all decks to redux
      return {
        ...state,
        ...action.decks
      }
    case ADD_CARD:
    // add a new card
      const questions = state[action.title].questions.concat(action.card)
      return {
        ...state,
        [action.title]: {
          title: [action.title],
          questions
        }
      }
    case ADD_DECK:
    // add a new deck
      return {
        ...state,
        [action.title]: {
          title: action.title,
          questions: []
        }
      }
    default:
      return state
  }
})
