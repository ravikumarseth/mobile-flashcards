import React, { Component } from "react"
import {
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
  Platform,
  ToastAndroid,
  AlertIOS
} from "react-native"
import Button from "./Button"
import { darkPink, white, blue } from "../utils/colors"
import { addCard } from "../actions"
import { NavigationActions } from "react-navigation"
import { connect } from "react-redux"
import { addCardToDeck } from "../utils/helpers"

class NewQuestionView extends Component {
  componentDidMount() {
    this.refs.question.focus()
  }
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Add Card"
    }
  }
  state = {
    question: "",
    answer: ""
  }

  changeQuestion = question => {
    this.setState({ question })
  }
  changeAnswer = answer => {
    this.setState({ answer })
  }
  saveCard = () => {
    const { question, answer } = this.state
    const { title } = this.props.navigation.state.params

    if (question.trim() && answer.trim()) {
      const card = {
        question: question.trim(),
        answer: answer.trim()
      }
      this.props.dispatch(addCard(title, card))

      addCardToDeck(title, card)

      if (Platform.OS !== "ios") {
        ToastAndroid.show(`A new card added to ${title}!`, ToastAndroid.SHORT)
      } else {
        AlertIOS.alert(`A new card added to ${title}!`)
      }

      this.props.navigation.navigate("IndividualDeckView", { title })
    }

    if (!answer.trim()) {
      this.refs.answer.focus()
    }
    if (!question.trim()) {
      this.refs.question.focus()
    }
  }
  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <TextInput
          ref="question"
          onChangeText={this.changeQuestion}
          placeholder="Question ?"
          style={styles.textInput}
        />
        <TextInput
          ref="answer"
          onChangeText={this.changeAnswer}
          placeholder="Answer"
          style={styles.textInput}
        />
        <Button
          onPress={this.saveCard}
          style={{ backgroundColor: darkPink, color: white }}
          text={"Add Card"}
        />
      </KeyboardAvoidingView>
    )
  }
}

export default connect()(NewQuestionView)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: blue
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
