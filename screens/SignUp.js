import React, { useState } from "react"
import SelectDropdown from 'react-native-select-dropdown'
import { Text, View, StyleSheet, ImageBackground, TextInput, TouchableOpacity, Pressable } from "react-native"
import { connect } from "react-redux"
import usuarioActions from "../redux/actions/usuarioActions"
import { showMessage, hideMessage } from "react-native-flash-message"
import FontAwesome from "react-native-vector-icons/FontAwesome"


const SignUp = (props) => {
  const countries = ["Argentina","Egypt", "Canada", "Australia", "Ireland", "Chile"]
  const [createAcc, setCreateAcc] = useState({
    nombre: '', 
    apellido: '',
    email: '',
    contrasena: '',
    imagen: '',
    pais: '' 
  })

  const inputHandler = (e, campo, value) => {
    setCreateAcc({
      ...createAcc,
      [campo]: e || value
  })
  }

  const submit = async () => { 
    let inputs = Object.values(createAcc).some((input) => input === "")
    if(!inputs){
      try{
        let response = await props.crearUsuario(createAcc)
        if(response.data.success){
          showMessage({
            message: "Account Created  😊",
            type: "success",
            color: "white",
            backgroundColor: "mediumseagreen", 
          })
        }else if(!response.data.success){
          if(response.data.errors){
            response.data.errors.map((error) =>{
              return(
                showMessage({
                  message: error.message,
                  type: "danger",
                  color: "white",
                  backgroundColor: "purple", 
                })
              )
            })
          }else{
            throw new Error(response.data.response)
          }
        }else{
          throw new Error(response.data.response)
        }
      }catch(e){
          showMessage({
          message: "Something went wrong ☹️",
          type: "danger",
          color: "white",
          backgroundColor: "red", 
        })
        console.log(e.message)
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
      <Text style={{ color: 'white', fontSize: 40, textAlign: 'center', fontWeight: 'bold', marginTop: 65, marginBottom: 65}}>Create Account!</Text>
        <TextInput
          placeholder="Firstname"
          placeholderTextColor='#333333'
          color='black'
          style={styles.inputSignUp}
          onChangeText={(e) => inputHandler(e, 'nombre')}
        />
        <TextInput
          placeholder="Lastname"
          placeholderTextColor='#333333'
          color='black'
          style={styles.inputSignUp}
          onChangeText={(e) => inputHandler(e, 'apellido')}
        />
        <TextInput
          placeholder="Email"
          placeholderTextColor='#333333'
          color='black'
          style={styles.inputSignUp}
          onChangeText={(e) => inputHandler(e, 'email')}
        />
        <TextInput
          placeholder="Password"
          placeholderTextColor='#333333'
          color='black'
          secureTextEntry={true}
          password = {true}
          style={styles.inputSignUp}
          onChangeText={(e) => inputHandler(e, 'contrasena')}
        />
        <TextInput
          placeholder="URL Image"
          placeholderTextColor='#333333'
          color='black'
          style={styles.inputSignUp}
          onChangeText={(e) => inputHandler(e, 'imagen')}
        />
       <SelectDropdown
                    data={countries}
                    onSelect={(selectedItem, index) => {
                        inputHandler(selectedItem, "pais")
                    }}
                    defaultButtonText={"Select Country"}
                    buttonTextAfterSelection={(selectedItem, index) => {
                        return selectedItem
                    }}
                    rowTextForSelection={(item, index) => {
                        return item
                    }}
                    buttonStyle={styles.dropdown1BtnStyle}
                    buttonTextStyle={styles.dropdown1BtnTxtStyle}
                    renderDropdownIcon={() => {
                      return (
                        <FontAwesome name="chevron-down" color={"#444"} size={18} />
                      )
                    }}
                    dropdownIconPosition={"right"}
                    dropdownStyle={styles.dropdown1DropdownStyle}
                    rowStyle={styles.dropdown1RowStyle}
                    rowTextStyle={styles.dropdown1RowTxtStyle}
                />
        <TouchableOpacity
            style={styles.button}>
            <Text style={{ textAlign: 'center', color: 'white', fontSize: 18 }} onPress={submit}>Sign Up</Text>
        </TouchableOpacity>
          <Text style={{ color: 'white', fontSize: 14, textAlign: 'center' }}>Already have an account?</Text>
        <Pressable onPress={() => props.navigation.navigate('login')}>
          <Text style={{ color: 'white', fontSize: 17, textAlign: 'center', textDecorationLine: 'underline' }}>Log In</Text>
        </Pressable>
      </ImageBackground>
    </View>  
  )
}


const mapDispatchToprops = {
	crearUsuario: usuarioActions.crearUsuario,
}

export default connect(null, mapDispatchToprops)(SignUp)


const styles = StyleSheet.create({
  contenedor: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  image: {
    width: "100%",
    alignItems: 'center',
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
  },
  dropdown1BtnStyle: {
    width: "65%",
    height: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.50)',
    borderRadius: 30,
    paddingBottom: 5,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 6,
    marginBottom: 20,
    fontSize: 20,
    borderColor: "#444",
  },
  dropdown1BtnTxtStyle: { color: "black", textAlign: "left" },
  dropdown1DropdownStyle: { backgroundColor: "#EFEFEF" },
  dropdown1RowStyle: {
    backgroundColor: "#EFEFEF",
    borderBottomColor: "#C5C5C5",
  },
  dropdown1RowTxtStyle: { color: "black", textAlign: "left" }
})
