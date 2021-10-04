import React, { useEffect } from "react"
import { Text, View, StyleSheet } from "react-native"
import usuarioActions from "../redux/actions/usuarioActions"
import { connect } from "react-redux"
import { showMessage, hideMessage } from "react-native-flash-message"
const LogOut = (props) => {
	useEffect(() => {
    showMessage({
      message: "See you soon                                                     👋",
      type: "warning",
      color: "white",
      backgroundColor: "purple", 
    })
		props.LogOut()
		props.navigation.navigate("home")
	},[])
  return(
    <View style={styles.contenedor}>
      <Text>Hola!</Text>
    </View>  
  )
}

const mapDispatchToProps = {
	LogOut : usuarioActions.desconectarUsuario
}

export default connect(null, mapDispatchToProps)(LogOut)

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: "red",
    justifyContent: "center",
    height: 150
  }
})
