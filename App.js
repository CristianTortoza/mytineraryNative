import React from "react"
import { StyleSheet } from "react-native"
import {NavigationContainer} from "@react-navigation/native"
import { LogBox } from "react-native"
import Navigator from "./navigation/MainNavBottom"
import { applyMiddleware, createStore } from 'redux'
import { Provider } from 'react-redux'
import AppLoading from 'expo-app-loading'
import rootReducer from "./redux/reducers/rootReducer"
import thunk from 'redux-thunk'
import {useFonts, 
  MerriweatherSans_300Light,
  MerriweatherSans_300Light_Italic,
  MerriweatherSans_400Regular,
  MerriweatherSans_400Regular_Italic,
  MerriweatherSans_700Bold,
  MerriweatherSans_700Bold_Italic,
  MerriweatherSans_800ExtraBold,
  MerriweatherSans_800ExtraBold_Italic 
} from '@expo-google-fonts/merriweather-sans'
import FlashMessage from "react-native-flash-message"
LogBox.ignoreAllLogs(true)

const globalStore = createStore(rootReducer, applyMiddleware(thunk))

const App = () => {
  let [fontsLoaded] = useFonts({
    MerriweatherSans_300Light,
    MerriweatherSans_300Light_Italic,
    MerriweatherSans_400Regular,
    MerriweatherSans_400Regular_Italic,
    MerriweatherSans_700Bold,
    MerriweatherSans_700Bold_Italic,
    MerriweatherSans_800ExtraBold,
    MerriweatherSans_800ExtraBold_Italic 
  })

  if(!fontsLoaded){
    return <AppLoading/>
  }else{
    return (
       <NavigationContainer>
         <Provider store={globalStore}>
            <Navigator/>
            <FlashMessage position="top" floating={true} icon="auto" statusBarHeight="60"/>
          </Provider>
       </NavigationContainer>
  )
  }
}
export default App

const styles = StyleSheet.create({
})
