import React from "react"
import { Text, View, StyleSheet, ImageBackground, Image,TouchableOpacity,ScrollView} from "react-native"
import Footer from "../components/Footer"
import MyCarousel from "../components/Carousel"
const Home = (props) => {

  return(
    <>
		<ScrollView style={styles.contenedor} >
			<ImageBackground   resizeMode="cover" source={{uri: 'https://c.wallhere.com/photos/1b/c1/1920x1200_px_cities_city_Lights_neon_New_night_rain-1781477.jpg!d'}} style={styles.image}> 
				<View style={styles.hero}>
					<Image source={{uri: 'https://i.postimg.cc/zBxVPPfx/logo-Cris3.png'}} style={styles.logo}/>
					<Text style={styles.title}>MyTinerary</Text>
					<Text style={styles.subTitle}>Find your perfect trip, designed by insiders who know and love their cities!</Text>
				</View>
			</ImageBackground>
			<View style={styles.containButton}>
				<Text style={styles.choose}>Choose your destination !</Text>
				<TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate('cities')}>
          			<Text style={{ color: 'white', fontSize: 15, textAlign: 'center',}}>CLICK HERE !</Text>
        		</TouchableOpacity>
			</View>
			<View>
				<Text style={styles.titlePopular}>Popular My Tineraries !</Text>
				<MyCarousel/>
			</View>
			<Footer/>
		</ScrollView>
    </>  
  )
}

export default Home

const styles = StyleSheet.create({
	hero: {
		height: 450,
		alignItems: "center",
		justifyContent: "center"
	},
	logo:{
		height: 115,
		width: 115	
	},
	title: {
		fontSize: 35,
		color: "white",
		fontFamily: "MerriweatherSans_700Bold",
	},
	subTitle:{
		fontSize: 17,
		textAlign: "center",
		color: "white",
		fontFamily: "MerriweatherSans_700Bold"
	},
	image: {	
	},
	button: {
		marginTop: 25,
		marginBottom: 25,
		backgroundColor: "purple",
		width: "35%",
		borderRadius: 15,
		padding: 15
	},
	containButton:{
		width: "100%",
		alignItems: "center",
		paddingTop: 20
	},
	choose:{
		fontSize: 25,
		fontFamily: "MerriweatherSans_700Bold"
	},
	titlePopular:{
		width: "100%",
		color: "black",
		textAlign: "center",
		fontSize: 30,
		padding: 5,
		marginBottom: 15,
		marginTop: 15,
		fontFamily: "MerriweatherSans_700Bold"
	}
})
