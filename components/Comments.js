import React, { useState } from "react"
import { Text, StyleSheet, Pressable, ImageBackground, View, ScrollView } from 'react-native'
import { connect } from "react-redux"
import itinerarioActions from "../redux/actions/itinerariosActions"
import Comment from "./Comment"
const Comments = (props) => {
	const {borrarComentario, editarComentario, itinerary, setComments, comments} = props
	const [render, setRender] =useState(false)

	const confirmDeleteComment = async (idItinerary, idComment, token) => {
		try{
			let response = await borrarComentario(idItinerary, idComment, token)
			console.log(response)
			if(response.success) setComments(comments.filter((comment) => comment._id !== idComment))
			else throw new Error
		}catch(e){
			console.log(e)
		}
	}

	const editComment= (commentId, comment, token) =>{
		editarComentario(commentId, comment, token)
		.then((res) => {
			if(res.success){
				comments.forEach((comment) =>{
					if(comment._id === commentId){
						comment.comment=comment
					}
				})
				setComments(comments)
				setRender(!render)
			}
		})
		.catch((error) => console.log(error))
	} 

  return(
    <>
		<View>
			<ScrollView style={styles.containComments} vertical={true}>
				{comments.map(comment =>{
					return(
						<Comment 
							key={comment._id} 
							itineraryId={itinerary} 
							updateComment={editComment} 
							deleteComments={confirmDeleteComment} 
							stateRender={render}
							comment={comment}/>
					)
				})}
			</ScrollView>
		</View>
    </>  
  )
}

const mapDispatchToProps = {
	borrarComentario: itinerarioActions.borrarComentario,
	editarComentario: itinerarioActions.editarComentario
}	

export default connect(null, mapDispatchToProps)(Comments)

const styles = StyleSheet.create({
	containComments:{
		height: 600,
		padding: 18,
	}
})
