import React, { Component } from "react"
import {
  KeyboardAvoidingView,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Platform,
  ToastAndroid,
  AlertIOS
} from "react-native"
import { blue, darkPink, white } from "../utils/colors"
import Button from "./Button"
import { saveDeck } from "../actions"
import { connect } from "react-redux"
import { saveDeckTitle } from "../utils/helpers"

class NewDeckView extends Component {
  state = {
    title: ""
  }
  addDeckTitle = () => {
    const { title } = this.state

    if (title.trim()) {
      // update redux
      this.props.dispatch(saveDeck(title))

      // update async storage
      saveDeckTitle(title)

      if (Platform.OS !== "ios") {
        ToastAndroid.show(`New Deck added: ${title}`, ToastAndroid.SHORT)
      } else {
        AlertIOS.alert(`New Deck added: ${title}`)
      }

      this.props.navigation.navigate("IndividualDeckView", { title })
    } else {
      this.refs.deckTitle.focus()
    }
  }
  changeTitle = title => {
    this.setState({ title })
  }
  render() {
    const { title } = this.state
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <Text style={styles.text}>What is the title of your new deck?</Text>
        <TextInput
          ref="deckTitle"
          value={title}
          onChangeText={this.changeTitle}
          placeholder="Deck Title"
          style={styles.textInput}
        />
        <Button
          onPress={this.addDeckTitle}
          style={{ backgroundColor: darkPink, color: white }}
          text={"Submit"}
        />
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: blue
  },
  text: {
    fontSize: 40,
    textAlign: "center",
    margin: 20,
    marginTop: 0
  },
  textInput: {
    width: 325,
    padding: 5,
    textAlign: "center",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    margin: 10,
    alignItems: "center"
  }
})

export default connect()(NewDeckView)
