// import React, { useEffect, useState }  from "react"
// import { Text, StyleSheet, Pressable, View, Image, TextInput } from 'react-native'
// import { connect } from "react-redux"


// const Comment = (props) => {
//     const {user_id,updatedComment,deleteComment,comment,token,stateRender}=props
//     const [changeInput, setChangeInput] =useState(false)
//     const [commentRender,setCommentRender]=useState(comment.comment)
//     const [newComment, setNewComment] = useState({
// 		"comment": comment.comment
//     })
//     useEffect(() => {
//         setChangeInput(false)
        
//     },[stateRender]) 
//     const changeState = () => {
//         setChangeInput(!changeInput)
        
// 	}
   
//    const buttons_edit_delete=user_id===comment.userId._id&&
//    <View>
//        <Pressable style={styles.boton} onPress={()=>deleteComment(comment._id,token)}><Text>borrar</Text></Pressable>
// 		<Pressable style={styles.boton} onPress={() => changeState()}><Text>editar</Text></Pressable>

//     </View> 
//     const inputHandler = (e, campo, value) => {
// 		setNewComment({
// 			...newComment,
// 			[campo] : e || value
// 		})
// 	}

//   return(
//     <>    
//          <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 15 }}>
//             <Image style={styles.userImage} source={{ uri: comment.userId.src }}/>
//             <View>
//                 <Text>{comment.userId.firstName}</Text>
//             </View>
//         </View>
//         <View style={styles.commentBox}>
//         {changeInput 
// 				?
// 				<View style={styles.commentBox}>
// 					<TextInput 
// 						defaultValue={commentRender}
// 						color='black'
// 						onChangeText={(e) => inputHandler(e, 'comment')}
//                         style={styles.inputComment}
// 					/>
// 					<Pressable onPress={() =>{
//                         console.log("aprete sendcito")
//                          updatedComment(comment._id, newComment.comment ,token)
//                          setCommentRender(newComment.comment)

//                          }}><Text>Send</Text></Pressable>
//                          <Pressable onPress={() =>{
//                         console.log("aprete cancel")
//                         changeState()}}>
//                             <Text>CANCEL</Text>
//                         </Pressable>
// 				</View>
// 				: 
//                 <Text>{commentRender}</Text>}
//                   {buttons_edit_delete && buttons_edit_delete} 
//         </View> 
      
//     </>  
//   )
// }