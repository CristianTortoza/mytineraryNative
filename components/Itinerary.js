import React, { useEffect, useState } from "react"
import { Text, StyleSheet, Pressable, ImageBackground, View, TextInput, Image,ScrollView,TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import actividadesActions from "../redux/actions/actividadesActions"
import itinerarioActions from "../redux/actions/itinerariosActions"
import { showMessage, hideMessage } from "react-native-flash-message"
import Comments from "./Comments"

const Itinerary = (props) => {
  const { itinerary, obtenerActividadesPorItinerarios } = props
  const [comments, setComments] = useState(itinerary.comments)
  const [activities, setActivities] = useState([])
  const [numberLike, setNumberLike] = useState(itinerary.corazones)	
  const [view, setView] = useState(false)
  const imagePrice = []

  const [comment, setComment] = useState({
	  "comment": ""
  })
  useEffect(() => {
	  obtenerActividadesPorItinerarios(itinerary._id)
	  .then((res) => setActivities(res.data.response))
	  .catch((error) => (console.log(error)))
  },[props.itinerary._id, props.token])

  const likeItinerary = async () => {
	if(props.token){
		let response = await props.darMeGustaYSacarMeGusta(itinerary._id, props.token)
		if(response.data.success){
			setNumberLike(response.data.response.corazones)
		}
	}else{
		showMessage({
			message: "You have to be logged to like ☹️",
			type: "warning",
			color: "white",
			backgroundColor: "purple", 
		  })
	}
  }
  const handlerInput = (e, campo, value) => {
	setComment({
		...comment,
		[campo]: e || value
 	 }
	)}

  const sendComment = () => {
	let com = Object.values(comment).some((com) => com === "")
	if(com){
		showMessage({
			message: "You must write something ☹️",
			type: "warning",
			color: "white",
			backgroundColor: "purple", 
		})
	}else{
		if(props.token){
			props.agregarComentarios(itinerary._id, comment.comment, props.token)
			.then((res) => {
				setComments(res.response)
				setComment({comment: ""})
			})
			.catch((error) => console.log(error))
		}else{
			showMessage({
				message: "You have to be logged to comment ☹️",
				type: "warning",
				color: "white",
				backgroundColor: "purple", 
			})
		}
	}
  }

  for(let i = 0; i < itinerary.precio; i++) imagePrice.push("💲")

  const likeHeart = numberLike.includes(props.id) ? "🖤" : "🤍"
  const change = () => {
	setView(!view)
  }
    return(
    <>
		<View style={styles.containAll}>
			<View style={styles.containItinerary}>
				<ImageBackground resizeMode="cover" source={{uri: itinerary.imagen }} style={styles.imageHeader}>
					<View style={styles.containHastags}>
						{itinerary.hashtags.map((hast) => <Text >#{hast}</Text>)}
					</View>
				</ImageBackground>
				<View>
					<View style={styles.profileAndLike}>
						<View style={styles.profile}>
							<Image resizeMode="cover" source={{uri: itinerary.autor.imagen}} style={styles.imageProfile}/>
							<Text style={styles.autorName}>{itinerary.autor.nombre}</Text>
						</View>
						<View style={styles.likes}>
							<Text onPress={() => likeItinerary()}>{likeHeart}</Text>
							<Text>{numberLike.length}</Text>
						</View>
					</View>
					<View style={styles.containTitle}>
						<Text style={styles.title}>{itinerary.titulo.titulo}</Text>
						<Text style={styles.subtitle}>{itinerary.titulo.subtitulo}</Text>
					</View>
					<View style={styles.price}>
						<View>
							<Text>{itinerary.duracion} Hours 🕐</Text>
						</View>
						<View>
							<Text>Price :{imagePrice}</Text>
						</View>
					</View>
				</View>
				{view && 		
				<View>
					<View>
						<ScrollView style={styles.carouselActivity} horizontal={true}>
							{activities.map((activity) => activity.actividades.map((act) =>{
									return(
										<ImageBackground key={act._id} source={{uri: act.imagen }} style={styles.imageActivity} >
											<Text style={styles.containHastags}>{act.titulo}</Text>
										</ImageBackground>
									)
							}))}
						</ScrollView>
						<ScrollView style={styles.containComments}>
							<View style={styles.comments}>
								<Comments 
								itinerary={itinerary._id} 
								comments={comments} 
								setComments={setComments}
								/>
							</View>
							<View style={styles.containInput}>	
								<TextInput
								placeholder="Leave a comment..."
								placeholderTextColor='white'
								color='white'
								style={styles.inputComment}
								value={comment.comment}
								onChangeText={(e) => handlerInput(e, 'comment')}
								/>
								<Pressable onPress={() => sendComment()} >
									<Image resizeMode="cover" source={{uri: "https://i.postimg.cc/RZ5VJMn1/send.png"}} style={styles.imageSend}/>
								</Pressable>
							</View>	
						</ScrollView>
					</View>	
				
				</View>
				}
				<View style={styles.button}>
					<Pressable
						style={styles.buttons}>
						<Text style={{ textAlign: 'center', color: 'white', fontSize: 18 }} onPress={change}>{view ? "View less" : "View more"}</Text>
					</Pressable>
				</View>
			</View>
		</View>
    </>  
  )
}


const mapStateToProps = (state) => {
	return{
		token: state.usuario.token,
		id: state.usuario._id
	}
}

const mapDispatchToProps = {
	agregarComentarios: itinerarioActions.agregarComentarios,
	darMeGustaYSacarMeGusta: itinerarioActions.darMeGustaYSacarMeGusta,
	obtenerActividadesPorItinerarios: actividadesActions.obtenerActividadesPorItinerarios,
}

export default connect(mapStateToProps, mapDispatchToProps)(Itinerary)

const styles = StyleSheet.create({
	containAll:{
		width: "100%",
		alignItems: "center",
		padding: 5,
		paddingBottom: 25,
	
	},
	imageHeader:{
		height: 300,
		width: "100%",
		alignItems: "center",
		overflow: "hidden",
		borderBottomLeftRadius:  20,
		borderBottomRightRadius:  20,
		borderTopRightRadius: 10,
		borderTopLeftRadius: 10,
		shadowColor: "#000",
		shadowOffset: {
		width: 5,
		height: 5,
		},
		shadowOpacity: 1,
		shadowRadius: 15,
		elevation: 5,
	
		
	},
	containItinerary:{
		width: "95%",
		justifyContent: "center",
		padding: 20,
		backgroundColor: 'rgba(255, 255, 255, 1)',
		borderBottomLeftRadius:  20,
		borderBottomRightRadius:  20,
		borderTopRightRadius: 5,
		borderTopLeftRadius: 5,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.23,
		shadowRadius: 2.62,
		elevation: 4,
	},
	containHastags:{
		backgroundColor: 'rgba(255, 255, 255, 0.4)',
		flexDirection: "row",
		padding: 15,
		width: "100%",
		justifyContent: "space-between",
		textAlign: "center",
		color: "black",
		fontSize: 25,
		fontFamily: "MerriweatherSans_700Bold"
	},
	carouselActivity:{
		height: 350,
		width: "100%",
		padding: 5,
	},
	imageActivity:{
		height: 350,
		width: 420,
		marginLeft: 10,
		marginRight: 10,
		overflow: "hidden",
		borderRadius: 30
	},
	profileAndLike:{
		width: "100%",
		flexDirection: "row",
		justifyContent: "space-between",
		padding: 4,
		alignItems: "center"
	},
	imageProfile:{
		height: 60,
		width: 60,
		borderRadius: 50
	},
	imageSend:{
		height: 35,
		width: 35,
		marginLeft: 10
	},
	profile:{
		flexDirection: "row",
		alignItems: "center",
	},
	autorName:{
		marginLeft: 10
	},
	containTitle:{
		width: "100%",
		alignItems: "center",
		marginTop: 10,
		marginBottom: 5,
		paddingBottom: 5,
		borderBottomColor: 'grey',
        borderBottomWidth: 0.5
	},
	title:{
		fontSize: 19,
		textAlign: "center",
		textShadowColor: 'grey',
		textShadowOffset: { width: 1, height: 1 },
		textShadowRadius: 1
	},
	subtitle: {
		fontSize: 12,
		textAlign: "center"	
	},
	inputComment: {
		backgroundColor: 'grey',
		width: '80%',
		borderRadius: 30,
		paddingBottom: 5,
		paddingLeft: 15,
		paddingRight: 15,
		paddingTop: 6,
		fontSize: 20
	},
	containInput: {
		flexDirection: "row",
		width: "100%",
		alignItems: "center",
		justifyContent: "center",
		marginBottom: 10,
		marginTop: 15,
	},
	containComments:{
		padding: 5,
		paddingTop: 15,
		paddingBottom: 15,
		shadowColor: "#000",
		shadowOffset: {
		width: 1,
		height: 5,
		},
		shadowOpacity: 1,
		shadowRadius: 1.41,
		elevation: 1.5,
		borderBottomLeftRadius:  20,
		borderBottomRightRadius:  20,
	},
	likes: {
		flexDirection: "row"
	},
	button:{
		width: "100%",
		alignItems: "center",
		padding: 10

	},
	buttons: {
		marginTop: 25,
		marginBottom: 25,
		backgroundColor: "purple",
		width: "50%",
		borderRadius: 30,
		padding: 10,

		
	},
	price: {
		width: "100%",
		flexDirection: "row",
		padding: 10,
		justifyContent: "space-between"
	},
	precio: {
		alignItems: "center",
		width: "50%"
	},
	duracion: {
		width:"50%"
	},
	comments: {
		height: 500
	}
})
