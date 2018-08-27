import React, { Component } from "react"
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  AsyncStorage
} from "react-native"
import { connect } from "react-redux"
import DeckListItem from "./DeckListItem"
import Button from "./Button"
import { blue, darkPink, white } from "../utils/colors"
import {
  saveDeckTitle,
  getDecks,
  FLASHCARDS_STORAGE_KEY
} from "../utils/helpers"
import { setDecks } from "../actions"

class DeckListView extends Component {
  componentDidMount() {
    getDecks().then(results => this.props.dispatch(setDecks(results)))
  }
  toAddCard = () => {
    this.props.navigation.navigate("NewDeckView")
  }
  render() {
    const { decks, navigation } = this.props
    return (
      <View style={styles.container}>
        {decks.length !== 0 && (
          <FlatList
            data={decks}
            renderItem={({ item }) => (
              <DeckListItem navigate={navigation.navigate} title={item.key} />
            )}
          />
        )}
        {decks.length === 0 && (
          <View style={styles.emptyContainer}>
            <Text style={styles.text}>No Decks Found!</Text>
            <Button
              onPress={this.toAddCard}
              style={{ backgroundColor: darkPink, color: white }}
              text={"Add Deck"}
            />
          </View>
        )}
      </View>
    )
  }
}

const mapStateToProps = state => {
  const decks = []

  const keys = Object.keys(state)

  for (let i = 0; i < keys.length; i++) {
    const deckDetail = {
      key: state[keys[i]].title
    }
    decks.push(deckDetail)
  }
  return {
    decks
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: blue
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    padding: 10,
    fontSize: 30,
    margin: 10
  }
})

export default connect(mapStateToProps)(DeckListView)
