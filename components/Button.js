import React from "react"
import { Text, TouchableOpacity, StyleSheet } from "react-native"
import { purple } from "../utils/colors"

export default (TextButton = ({ text, onPress, style = {} }) => (
  <TouchableOpacity onPress={onPress} style={styles.button} activeOpacity={0.8}>
    <Text style={[styles.buttonText, style]}> {text} </Text>
  </TouchableOpacity>
))

const styles = StyleSheet.create({
  button: {
    paddingBottom: 20,
    width: 150
  },
  buttonText: {
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    padding: 20,
    borderRadius: 10,
    borderWidth: 1
  }
})
