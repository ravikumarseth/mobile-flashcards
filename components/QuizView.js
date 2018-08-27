import React, { Component } from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { connect } from "react-redux"
import Button from "./Button"
import { lightPink, darkPink, white, blue, lightBlue } from "../utils/colors"
import { clearLocalNotification, setLocalNotification } from "../utils/helpers"

class QuizView extends Component {
  componentDidMount() {
    this.resetQuiz()
  }
  state = {
    currentCard: 0,
    correct: 0,
    incorrect: 0,
    showQuestion: true,
    completed: false
  }
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params.title + " Quiz"
    }
  }

  correctIncorrectBtn = type => {
    if (this.state.currentCard < this.props.length) {
      this.setState(state => ({
        currentCard: state.currentCard + 1
      }))
      if (type === "Correct") {
        this.setState(state => ({
          correct: state.correct + 1
        }))
      } else {
        this.setState(state => ({
          incorrect: state.incorrect + 1
        }))
      }
    } else {
      this.setState({
        completed: true
      })
    }
  }
  answerBtn = () => {
    this.setState(state => ({
      showQuestion: !state.showQuestion
    }))
  }
  resetQuiz = () => {
    this.setState({
      currentCard: 0,
      correct: 0,
      incorrect: 0,
      showQuestion: true,
      completed: false
    })
    this.clearNotification()
  }
  goBack = title => {
    this.clearNotification()
    this.props.navigation.navigate("IndividualDeckView", { title })
  }
  clearNotification = () => {
    clearLocalNotification().then(setLocalNotification())
  }
  render() {
    const { title } = this.props.navigation.state.params
    const { length, questions } = this.props
    const {
      currentCard,
      showQuestion,
      completed,
      correct,
      incorrect
    } = this.state
    return (
      <View style={{ flex: 1 }}>
        {!completed &&
          currentCard < length && (
            <View style={styles.container}>
              <Text style={styles.score}>{currentCard + 1 + "/" + length}</Text>
              <View>
                {showQuestion && (
                  <Text style={styles.questionAnswer}>
                    {questions[currentCard].question}
                  </Text>
                )}
                {!showQuestion && (
                  <Text style={styles.questionAnswer}>
                    {questions[currentCard].answer}
                  </Text>
                )}
                <TouchableOpacity onPress={this.answerBtn}>
                  <View>
                    {showQuestion && (
                      <Text style={styles.questionAnswerBtn}>Answer</Text>
                    )}
                    {!showQuestion && (
                      <Text style={styles.questionAnswerBtn}>Question</Text>
                    )}
                  </View>
                </TouchableOpacity>
              </View>
              <View>
                <Button
                  text="Correct"
                  style={{ backgroundColor: lightPink }}
                  onPress={() => this.correctIncorrectBtn("Correct")}
                />
                <Button
                  text="Incorrect"
                  style={{ backgroundColor: darkPink, color: white }}
                  onPress={() => this.correctIncorrectBtn("Incorrect")}
                />
              </View>
            </View>
          )}
        {(completed || currentCard >= length) && (
          <View style={[styles.container, { justifyContent: "space-between" }]}>
            <View style={{ marginTop: 40 }}>
              <Text style={styles.detailText}>{title} Quiz Complete</Text>
              <Text style={styles.percentText}>
                {(correct * 100 / length).toFixed(2) + "%"}
              </Text>
            </View>
            <View>
              <Text style={styles.scoreText}>{"Correct: " + correct}</Text>
              <Text style={styles.scoreText}>{"Incorrect: " + incorrect}</Text>
              <Text style={styles.scoreText}>{"Total: " + length}</Text>
            </View>
            <View>
              <Button
                text="Restart"
                style={{ backgroundColor: lightPink }}
                onPress={this.resetQuiz}
              />
              <Button
                text="Back"
                style={{ backgroundColor: darkPink, color: white }}
                onPress={() => this.goBack(title)}
              />
            </View>
          </View>
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: blue,
    justifyContent: "space-between",
    alignItems: "center"
  },
  score: {
    flexDirection: "row",
    alignSelf: "flex-start",
    margin: 10,
    fontWeight: "bold"
  },
  questionAnswerBtn: {
    color: darkPink,
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 15
  },
  questionAnswer: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 25,
    margin: 10,
    padding: 10
  },
  scoreText: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20
  },
  detailText: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20
  },
  percentText: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 60,
    color: darkPink,
    marginTop: 20
  }
})

const mapStateToProps = (state, { navigation }) => {
  const { title } = navigation.state.params
  return {
    length: state[title].questions.length,
    questions: state[title].questions
  }
}

export default connect(mapStateToProps)(QuizView)
