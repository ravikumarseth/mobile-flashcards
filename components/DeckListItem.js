import React from "react"
import {
  View,
  Text,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
  StyleSheet,
  Animated
} from "react-native"
import { connect } from "react-redux"
import { darkBlue, lightPink, darkPink } from "../utils/colors"

class DeckListItem extends React.Component {
  state = {
    fontSize: new Animated.Value(25)
  }
  listItemPress = () => {
    Animated.sequence([
      Animated.spring(this.state.fontSize, {
        toValue: 45,
        speed: 10
      }),
      Animated.spring(this.state.fontSize, {
        toValue: 25,
        speed: 10
      })
    ]).start(() => {
      this.props.navigate("IndividualDeckView", {
        title: this.props.title
      })
    })
  }
  render() {
    const { title, length } = this.props
    const { fontSize } = this.state
    return (
      <TouchableOpacity
        style={styles.container}
        activeOpacity={0.8}
        onPress={this.listItemPress}
      >
        <View style={{ flex: 1 }}>
          <Animated.Text style={[styles.title, { fontSize }]}>
            {title}
          </Animated.Text>
          <Text style={styles.numCards}>
            {length === 1 ? length + " card" : length + " cards"}
          </Text>
        </View>
      </TouchableOpacity>
    )
  }
}

const mapStateToProps = (state, { title }) => {
  return {
    title: state[title].title,
    length: state[title].questions.length
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 5,
    padding: 40,
    margin: 10,
    backgroundColor: lightPink
  },
  title: {
    flex: 1,
    fontWeight: "bold",
    textAlign: "center"
  },
  numCards: {
    flex: 1,
    color: darkBlue,
    textAlign: "center"
  }
})

export default connect(mapStateToProps)(DeckListItem)
