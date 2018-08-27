import { AsyncStorage } from "react-native"
import { Notifications, Permissions } from "expo"

const FLASHCARDS_STORAGE_KEY = "MobileFlashcards:Storage"
const FLASHCARDS_NOTIFICATION_KEY = "MobileFlashcards:Notifications"

// default decks (can be removed after development)
const deckList = {
  React: {
    title: "React",
    questions: [
      {
        question: "What is React?",
        answer: "A library for managing user interfaces"
      },
      {
        question: "Where do you make Ajax requests in React?",
        answer: "The componentDidMount lifecycle event"
      }
    ]
  },
  JavaScript: {
    title: "JavaScript",
    questions: [
      {
        question: "What is a closure?",
        answer:
          "The combination of a function and the lexical environment within which that function was declared."
      }
    ]
  }
}


// get all decks
export const getDecks = () =>
  AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY).then(results => {
    if (results === null) {
      return AsyncStorage.setItem(
        FLASHCARDS_STORAGE_KEY,
        JSON.stringify(deckList)
      ).then(() => {
        return deckList
      })
    } else {
      return JSON.parse(results)
    }
  })


// get single deck
const getDeck = id => {
  return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY).then(results => {
    const data = JSON.parse(results)
    return data[id]
  })
}


// add a new deck
export const saveDeckTitle = title => {
  AsyncStorage.mergeItem(
    FLASHCARDS_STORAGE_KEY,
    JSON.stringify({
      [title]: {
        title,
        questions: []
      }
    })
  )
}


// add a new card to deck
export const addCardToDeck = (title, card) => {
  return getDeck(title).then(result => {
    AsyncStorage.mergeItem(
      FLASHCARDS_STORAGE_KEY,
      JSON.stringify({
        [title]: {
          title,
          questions: result.questions.concat(card)
        }
      })
    )
  })
}

// The below three functions are very similiar to the ones built during lessons
// clear set notifications
export const clearLocalNotification = () =>
  AsyncStorage.removeItem(FLASHCARDS_NOTIFICATION_KEY).then(
    Notifications.cancelAllScheduledNotificationsAsync
  )

// notification body
const createNotification = () => ({
  title: "Take any quiz!",
  body: "Don't forget to take any quiz today!",
  ios: {
    sound: true
  },
  android: {
    sound: true,
    priority: "high",
    sticky: false,
    vibrate: true
  }
})

// set a new notifications
export const setLocalNotification = () => {
  AsyncStorage.getItem(FLASHCARDS_NOTIFICATION_KEY)
    .then(JSON.parse)
    .then(data => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
          if (status === "granted") {
            Notifications.cancelAllScheduledNotificationsAsync()

            let tomorrow = new Date()
            tomorrow.setDate(tomorrow.getDate() + 1)
            tomorrow.setHours(20)
            tomorrow.setMinutes(0)

            Notifications.scheduleLocalNotificationAsync(createNotification(), {
              time: tomorrow,
              repeat: "day"
            })

            AsyncStorage.setItem(
              FLASHCARDS_NOTIFICATION_KEY,
              JSON.stringify(true)
            )
          }
        })
      }
    })
}
