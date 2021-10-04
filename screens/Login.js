import React, { useState } from "react"
import { Text, View, StyleSheet, ImageBackground, TextInput, TouchableOpacity, Pressable } from "react-native"
import { connect } from "react-redux"
import usuarioActions from "../redux/actions/usuarioActions"
import { showMessage, hideMessage } from "react-native-flash-message"
import Footer from "../components/Footer"

const Login = (props) => {
  const [logIn, setLogIn] =useState({
    email: "",
    contrasena: ""
  })

  const handlerInput = (e, campo, value) => {
    setLogIn({
      ...logIn,
      [campo]: e || value
  })
  }

  const submit = async () => { 
    let inputs = Object.values(logIn).some((input) => input === "")
    if(!inputs){
      try{  
        let response = await props.ingresarUsuario(logIn)
        if(response.data.success){
          showMessage({
            message: "welcome to MYtinerary! 🤩",
            type: "success",
            color: "white",
            backgroundColor: "mediumseagreen", 
          })
        }else{
          showMessage({
            message: response.data.response,
            type: "danger",
            color: "white",
            backgroundColor: "purple", 
          })
        }
      }catch(e){
        console.log(e)
      }
    }else{
      showMessage({
        message: "All the fields are required! ☹️",
        type: "danger",
        color: "white",
        backgroundColor: "purple", 
      })
    }
  }

  return(
    <View style={styles.contenedor} >
    <ImageBackground resizeMode="cover" source={{ uri: 'https://w.wallpaperkiss.com/wimg/s/136-1366382_small.jpg' }} style={styles.image}>
      <Text style={{ color: 'white', fontSize: 40, textAlign: 'center', fontWeight: 'bold', marginBottom: 35}}>Welcome back!</Text>
        <TextInput
          placeholder="Email"
          placeholderTextColor='#333333'
          color='black'
          style={styles.inputSignUp}
          onChangeText={(e) => handlerInput(e, 'email')}
        />
        <TextInput
          placeholder="Password"
          placeholderTextColor='#333333'
          color='black'
          secureTextEntry={true}
          password = {true}
          style={styles.inputSignUp}
          onChangeText={(e) => handlerInput(e, 'contrasena')}
        />
        <TouchableOpacity style={styles.button}>
         <Text style={{ textAlign: 'center', color: 'white', fontSize: 18 }} onPress={submit}>Log In</Text>
        </TouchableOpacity>
          <Text style={{ color: 'white', fontSize: 14, textAlign: 'center' }}>Don't have an account?</Text>
        <Pressable onPress={() => props.navigation.navigate('signup')}>
          <Text style={{ color: 'white', fontSize: 17, textAlign: 'center', textDecorationLine: 'underline' }}>Sign Up</Text>
        </Pressable>
      </ImageBackground>
  </View>   
  )
}

const mapDispatchToprops = {
	ingresarUsuario: usuarioActions.ingresarUsuario,
}

export default connect(null, mapDispatchToprops)(Login)

const styles = StyleSheet.create({
  contenedor: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  image: {
    width: "100%",
    alignItems: 'center',
    justifyContent: "center",
    flex: 1
  },
  inputSignUp:{
    backgroundColor: 'rgba(255, 255, 255, 0.50)',
    width: '65%',
    borderRadius: 30,
    paddingBottom: 5,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 6,
    marginBottom: 20,
    fontSize: 20
  },
  button: {
    marginTop: 25,
    marginBottom: 25,
    backgroundColor: "purple",
    width: "30%",
    borderRadius: 30,
    padding: 10
  }
})
