import React from "react"
import { Text, View, StyleSheet } from "react-native"

const Footer = () => {
  return(
    <View style={styles.contenedor}>
      <Text style={styles.text}>MyTineraryNative || Tortoza Cristian</Text>
    </View>  
  )
}

export default Footer

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: "purple",
    alignItems: "center",
    color: "white",
    justifyContent: "center",
    height: 80
  },
  text: {
    color: "white",
    textAlign: "center"
  }
})
