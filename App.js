import React from "react"
import { Text, View, StatusBar, Platform } from "react-native"
import { TabNavigator, StackNavigator } from "react-navigation"
import DeckListView from "./components/DeckListView"
import NewDeckView from "./components/NewDeckView"
import IndividualDeckView from "./components/IndividualDeckView"
import { createStore } from "redux"
import reducer from "./reducers"
import { Provider } from "react-redux"
import { blue, lightBlue, black, darkPink, darkBlue } from "./utils/colors"
import QuizView from "./components/QuizView"
import NewQuestionView from "./components/NewQuestionView"
import { setLocalNotification } from "./utils/helpers"
import { Constants } from "expo"
import { MaterialCommunityIcons } from "@expo/vector-icons"

export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification()
  }
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{ flex: 1 }}>
          <View
            style={{
              height: Constants.statusBarHeight,
              backgroundColor: darkBlue
            }}
          >
            <StatusBar translucent backgroundColor={darkBlue} />
          </View>
          <MainNavigator />
        </View>
      </Provider>
    )
  }
}

const Tabs = TabNavigator(
  {
    DeckListView: {
      screen: DeckListView,
      navigationOptions: {
        tabBarLabel: "Deck",
        tabBarIcon: ({ tintColor }) => (
          <MaterialCommunityIcons name="cards" size={30} color={tintColor} />
        )
      }
    },
    NewDeckView: {
      screen: NewDeckView,
      navigationOptions: {
        tabBarLabel: "New Deck",
        tabBarIcon: ({ tintColor }) => (
          <MaterialCommunityIcons
            name="credit-card-plus"
            size={30}
            color={tintColor}
          />
        )
      }
    }
  },
  {
    tabBarOptions: {
      activeTintColor: Platform.OS === "ios" ? darkBlue : black,
      pressColor: lightBlue,
      indicatorStyle: {
        backgroundColor: darkPink,
        height: 3
      },
      style: {
        height: 56,
        backgroundColor: Platform.OS === "ios" ? black : darkBlue,
        shadowColor: "rgba(0, 0, 0, 0.24)",
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowRadius: 6,
        shadowOpacity: 1
      }
    }
  }
)

const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs,
    navigationOptions: {
      header: null
    }
  },
  IndividualDeckView: {
    screen: IndividualDeckView,
    navigationOptions: {
      headerTintColor: black,
      headerStyle: {
        backgroundColor: darkBlue
      }
    }
  },
  QuizView: {
    screen: QuizView,
    navigationOptions: {
      headerTintColor: black,
      headerStyle: {
        backgroundColor: darkBlue
      }
    }
  },
  NewQuestionView: {
    screen: NewQuestionView,
    navigationOptions: {
      headerTintColor: black,
      headerStyle: {
        backgroundColor: darkBlue
      }
    }
  }
})
