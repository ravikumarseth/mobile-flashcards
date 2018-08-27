import React, { Component } from "react"
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Keyboard
} from "react-native"
import { connect } from "react-redux"
import { blue, lightPink, darkPink, darkBlue, white } from "../utils/colors"
import QuizView from "./QuizView"
import Button from "./Button"
import { StackNavigator } from "react-navigation"

class IndividualDeckView extends Component {
  componentDidMount() {
    Keyboard.dismiss()
  }
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params.title
    }
  }
  toAddCard = title => {
    this.props.navigation.navigate("NewQuestionView", {
      title
    })
  }
  startQuiz = title => {
    this.props.navigation.navigate("QuizView", {
      title
    })
  }
  render() {
    const { title, length } = this.props
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.numCards}>
            {length === 1 ? length + " card" : length + " cards"}
          </Text>
        </View>
        <View>
          <Button
            onPress={() => this.toAddCard(title)}
            style={{ backgroundColor: lightPink }}
            text={"Add Card"}
          />
          {length > 0 && (
            <Button
              onPress={() => this.startQuiz(title)}
              style={{ backgroundColor: darkPink, color: white }}
              text={"Start Quiz"}
            />
          )}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: blue,
    justifyContent: "space-around",
    alignItems: "center"
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
    padding: 10
  },
  numCards: {
    color: darkPink,
    textAlign: "center",
    padding: 10
  }
})

const mapStateToProps = (state, { navigation }) => {
  const { title } = navigation.state.params
  return {
    title,
    length: state[title].questions.length
  }
}

export default connect(mapStateToProps)(IndividualDeckView)
