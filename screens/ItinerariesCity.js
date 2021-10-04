import React, { useEffect, useState } from "react"
import { Text, View, StyleSheet, ImageBackground, Image,TextInput, ScrollView} from "react-native"
import { connect } from 'react-redux'
import ciudadesActions from '../redux/actions/ciudadesActions'
import itinerarioActions from "../redux/actions/itinerariosActions"
import Itinerary from "../components/Itinerary"
import Footer from "../components/Footer"
import Preloader from "../components/Preloader"
const ItinerariesCity = (props) => {
	const [loader, setLoader] = useState(false)
	useEffect(() =>{	
		async function obtenerCiudadYItinerario(){
			try{
				let response2 =await props.obtenerUnaCiudad(props.route.params.id)
				let response = await props.obtenerItinerarios(props.route.params.id)
				if(response.success || response2.success) setLoader(true)
		
			}catch(e){
				console.log(e)
			}
			
			
		}  
		obtenerCiudadYItinerario()
		
	},[props.route.params.id])

	if(!loader){
		return(
			<Preloader />
		)
	}
  return(
		<ScrollView style={styles.contenedor} >
			<ImageBackground resizeMode="cover" source={{ uri: `https://my-tinerarytortoza.herokuapp.com${props.ciudad.fotoHeader}`}} style={styles.image}> 
				<View style={styles.hero}>
					<View style={styles.containNameImage}>
						<Text>{props.ciudad.nombre}</Text>
						<Image source={{ uri: `https://my-tinerarytortoza.herokuapp.com${props.ciudad.banderaPais}`}} style={styles.imageLogo}/>
					</View>
					<View>
						
					</View>
				</View>
			</ImageBackground>
			{props.itinerarios.length === 0
            ? 
			<View style={{marginTop: 90}}>
                <Text style={{color: 'purple', fontSize: 30, textAlign: 'center', padding: 30, fontWeight: 'bold', marginBottom: 100}}>Oh! It seems that there are not itineraries for this city yet!</Text>
            </View> 
			: 
			<View style={{marginTop: '10%', marginBottom: '15%'}}>
                {props.itinerarios.map(itinerary => <Itinerary key={itinerary._id} itinerary={itinerary} navigation={props.navigation}/>)}
            </View> 
			}
			<Footer/>
		</ScrollView>
  )
}

const mapStateToProps = (state) =>{
	return{ 
		ciudad: state.ciudades.unaCiudad,
		itinerarios: state.itinerarios.itinerarios
	}
}

const mapDispatchToProps = { 
	obtenerUnaCiudad: ciudadesActions.obtenerUnaCiudad,
	obtenerItinerarios: itinerarioActions.obtenerLosItinerariosDeLaCiudad
}

export default connect(mapStateToProps, mapDispatchToProps)(ItinerariesCity)

const styles = StyleSheet.create({
	hero: {
		height: 200,
		width: "50%",
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: 'rgba(255, 255, 255, 0.5)',
		borderRadius: 40
	},
	title: {
		fontSize: 35,
		color: "white",
	},
	subTitle:{
		textAlign: "center",
		color: "white"
	},
	image: {
		height: 400,
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
	},
  	contenedor:{
		backgroundColor: 'rgba(255, 255, 255, 0.1)'
  	},
	imageLogo:{
		height: 50,
		width: 50
	},
	containNameImage:{
		alignItems: "center"
	}
})
