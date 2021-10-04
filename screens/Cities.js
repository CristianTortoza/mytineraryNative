import React, { useEffect, useState } from "react"
import { Text, View, StyleSheet, ImageBackground, Image,TextInput, ScrollView} from "react-native"
import { connect } from 'react-redux'
import ciudadesActions from '../redux/actions/ciudadesActions'
import City from "../components/City"
import Footer from "../components/Footer"
import Preloader from "../components/Preloader"
const Cities = (props) => {
	const [loading, setLoading] = useState(true)
	const { ciudadesFiltradas } = props
	useEffect(() =>{	
		async function obtenerCiudades(){
			await props.obtenerCiudades()
			
		}
		obtenerCiudades()
		setLoading(false)
		//eslint-disable-next-line react-hooks/exhaustive-deps
	},[])

	if(props.ciudades.length === 0){
		return(
			<Preloader/>
		)
	}
	

  return(
		<ScrollView style={styles.contenedor} >
			<ImageBackground   resizeMode="cover" source={{uri: 'https://img.wattpad.com/e8dc240e97a43ed81fcd0f9b9b8ab456202d1bf1/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f58736949306d466f6435385731513d3d2d3330302e313539356636366136626330383463653239333736333037303734332e6a7067'}} style={styles.image}> 
				<View style={styles.hero}>
				</View>
			</ImageBackground>
			<View style={styles.containInput}>
				<TextInput
					placeholder="Search your destination"
					placeholderTextColor='#333333'
					color='black'
					style={styles.input}
					onChangeText={(e) => props.filtrarCiudad(e)}
					/>
			</View>	 
			{/* {props.token && <Text>HOLA LU, TU HIJO SE VA A LLAMAR JUAN CARLOS</Text>} */}
			<View style={styles.containImage}>
				{ciudadesFiltradas.length === 0
					? <View style={styles.titleAnother}>
						<Text style={{color:'purple', fontSize: 30, fontWeight: 'bold', textAlign: 'center'}}>Oops! There are not results for your search</Text>
						<Text style={{color:'purple', fontSize: 30, fontWeight: 'bold', textAlign: 'center'}}>Try another one!</Text>
					</View >
					: <View style={styles.imageCity}>
						{ciudadesFiltradas.map(city => {
						return <City key={city._id} city={city} route={props.route} navigation={props.navigation} />
					})}
					</View>
				}
			</View>
			<Footer/>
		</ScrollView>
  )
}

const mapStateToProps = (state) =>{
	return{ 
		ciudadesFiltradas: state.ciudades.filtrarCiudades,
		token: state.usuario.token,
		ciudades: state.ciudades.listaCiudades
	}
}

const mapDispatchToProps = { 
	obtenerCiudades: ciudadesActions.obtenerTodasLasCiudades,
	filtrarCiudad: ciudadesActions.filtrarCiudades,
}

export default connect(mapStateToProps, mapDispatchToProps)(Cities)

const styles = StyleSheet.create({
	hero: {
		height: 400,
		alignItems: "center",
		justifyContent: "center"
	},
	title: {
		fontSize: 35,
		color: "white",
		// shadowOffse sombra
	},
	subTitle:{
		textAlign: "center",
		color: "white"
	},
	image: {
	},
	containInput:{
		width: "100%",
		alignItems: "center",
		padding: 25

	},
  	input:{
		backgroundColor: 'rgba(205, 205, 205, 1)',
		width: '85%',
		borderRadius: 30,
		paddingBottom: 5,
		paddingLeft: 15,
		paddingRight: 15,
		paddingTop: 6,
		fontSize: 20,
		textAlign: "center",
		justifyContent: "center"
	},
 	contenedor:{
    	backgroundColor: 'rgba(255, 255, 255, 0.1)',
 	},
	containImage:{
		width: "100%",
		padding: 10
	},
	imageCity: {
		width: "100%",
		marginBottom: 15
	},
	titleCities:{
		textAlign: "center",
	},
	titleAnother: {
		alignItems: "center",
		marginBottom: 30
	}
})
