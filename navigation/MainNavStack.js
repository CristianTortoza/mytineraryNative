import {createNativeStackNavigator} from "@react-navigation/native-stack"
import React from "react"
import Home from "../screens/Home"
import Cities from "../screens/Cities"
import Login from "../screens/Login"
import SingUp from "../screens/SignUp"
import ItinerariesCity from "../screens/ItinerariesCity"
import { Ionicons } from '@expo/vector-icons';
const Stack = createNativeStackNavigator()

const Navigator = () => {
	return(
		<Stack.Navigator options={{headerShown: false}}>
			<Stack.Screen name="homeStack" component={Home} options={{headerShown: false}} />
			<Stack.Screen name="citiesStack" component={Cities}/>
			<Stack.Screen name="itineraries" component={ItinerariesCity} options={{headerShown: false}}/>
			<Stack.Screen name="loginStack" component={Login}/>
			<Stack.Screen name="signupStack" component={SingUp}/>
		</Stack.Navigator>
	)
}

export default Navigator