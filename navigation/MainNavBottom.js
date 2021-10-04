import {createBottomTabNavigator} from "@react-navigation/bottom-tabs"
import React, { useEffect } from "react"
import Cities from "../screens/Cities"
import Login from "../screens/Login"
import SingUp from "../screens/SignUp"
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import ItinerariesCity from "../screens/ItinerariesCity"
import MainStack from "./MainNavStack"
import { connect } from "react-redux"
import AsyncStorage from "@react-native-async-storage/async-storage"
import usuarioActions from "../redux/actions/usuarioActions"
import LogOut from "../components/LogOut"

const Bottom = createBottomTabNavigator()
const Navigator = (props) => {
	useEffect(() => {
			const verificate = async () => {
				const token = await AsyncStorage.getItem("token")
				if(!token) return false
				props.verificate(token)	
			}
			verificate()
	},[])
	return(
			<Bottom.Navigator screenOptions={({ route }) => ({
				tabBarIcon: ({ focused, color, size }) => {
				  let iconName;
				  if (route.name === 'home') {
					iconName = focused
					  ? 'home'
					  : 'home';
				  } else if (route.name === 'cities') {
					iconName = focused ? 'globe' : 'globe';
				  }else if (route.name === 'login') {
					iconName = focused ? 'enter' : 'enter';
				  }else if (route.name === 'signup') {
					iconName = focused ? 'person-add' : 'person-add';
				  }else if (route.name === 'logout') {
					iconName = focused ? 'exit' : 'exit';
				  }else if(route.name === "itineraries"){
					iconName = focused ? 'exit' : 'exit'
				  } 
	  
				  // You can return any component that you like here!
				  return <Ionicons name={iconName} size={size} color={color} />;
				},
				tabBarActiveTintColor: 'purple',
				tabBarInactiveTintColor: 'gray',
			  })}>
				<Bottom.Screen name="home" component={MainStack} options={{headerShown: false}}/>
				<Bottom.Screen name="cities" component={Cities} options={{headerShown: false}}/>
				{!props.token ? 
				<>
					<Bottom.Screen name="signup" component={SingUp} options={{headerShown: false}}/>
					<Bottom.Screen name="login" component={Login} options={{headerShown: false}}/>
				</>
				: <Bottom.Screen name="logout" component={LogOut} options={{headerShown: false}}/>
				}	
			</Bottom.Navigator>
	)
}
const mapStateToProps = (state) =>{
	return{ 
		token: state.usuario.token,
	}
}
const mapDispatchToProps = {
	verificate: usuarioActions.verificar,
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigator)