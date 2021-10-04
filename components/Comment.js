import React, { useEffect, useState } from "react"
import { Text, StyleSheet, Pressable, View, Image, TextInput, ScrollView} from 'react-native'
import { connect } from "react-redux"

const Comment = (props) => {
	const {usuarioId, updateComment, deleteComments, comment, itineraryId, token, stateRender} = props
	const [changeInput, setChangeInput] =useState(false)
	const [commentRender, setCommentRender] = useState(comment.comment)
	const [newComment, setNewComment] = useState({
		"comment": comment.comment
	})

	useEffect(() => {
		setChangeInput(false)
	},[stateRender]) 

	const changeState = () => {
		setChangeInput(!changeInput)
	}
	const showButton = usuarioId === comment.userId._id && 
	<View style={styles.functionBox}>
		<Pressable onPress={() => changeState()}><Text style={styles.edit}>✏️</Text></Pressable>
		<Pressable onPress={() => deleteComments(itineraryId, comment._id, token)}><Text>🗑</Text></Pressable>
	</View>

	const inputHandler = (e, campo, value) => {
		setNewComment({
			...newComment,
			[campo] : e || value
		})
	}
  return(
    <>	
		<View style={styles.containComment}>	
			<View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 15 }}>
				<Image style={styles.userImage} source={{ uri: comment.userId.imagen }}/>
				<View style={styles.nameComment}>
					<Text>{comment.userId.apellido} {comment.userId.nombre}</Text>
				</View>
			</View>
			<View style={styles.textContain}>
				{changeInput 
				?
				<ScrollView style={styles.commentBox}>
					<TextInput 
						defaultValue={commentRender}
						color='black'
						style={styles.inputSignUp}
						onChangeText={(e) => inputHandler(e, 'comment')}
					
					/>
					<View style={styles.containFun}>
						<Pressable onPress={() => {
							updateComment(comment._id, newComment.comment ,token)
							setCommentRender(newComment.comment)
						}}><Text style={styles.icon}>✔️</Text></Pressable>
						<Pressable onPress={() => changeState()}><Text>❌</Text></Pressable>
					</View>
				</ScrollView>
				: 
				<Text>{commentRender}</Text>}
				{showButton && showButton }
			</View>
		</View>	
    </>  
  )
}

const mapStateToProps = (state) => {
	return{
		usuarioId : state.usuario._id,
		token: state.usuario.token
	}
}

export default connect(mapStateToProps)(Comment) 

const styles = StyleSheet.create({
	userImage: {
        width: 45,
        height: 45,
        borderRadius: 50,
		marginTop: 10
    },
	containComment: {
		height: 150,
		width: "100%",
		marginBottom: 15,
		padding: 6,
		borderWidth: 0.8,
        borderColor: "grey",
	},
	nameComment:{
		marginLeft: 10
	},
	textContain: {
		width: "80%",
		minHeight: 30,
		paddingLeft: 30,
		paddingTop: 10,
		paddingBottom: 15,
		paddingRight: 15,
		justifyContent: "center",
		flexDirection: "row",
		justifyContent: "space-between"
		
	},
	inputSignUp:{
		backgroundColor: 'grey',
		color: "white",
		width: '100%',
		borderRadius: 30,
		paddingBottom: 5,
		paddingLeft: 15,
		paddingRight: 15,
		paddingTop: 6,
		marginBottom: 20,
		fontSize: 20
	},
	functionBox:{
		flexDirection: "row",
		height: 100
	},
	containFun: {
		flexDirection: "row",
		width: "100%",

	},
	icon:{
		marginRight: 20
	},
	edit:{
		marginRight: 15
	}
})