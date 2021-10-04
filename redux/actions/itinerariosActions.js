import axios from "axios";

const itinerarioActions = {
	obtenerLosItinerariosDeLaCiudad: (id)=>{
		return async(dispatch) =>{
			try{	
				let response = await axios.get(`https://my-tinerarytortoza.herokuapp.com/api/itineraries/${id}`)
				let data = response.data.response
				dispatch({ type: "OBTENER_LOS_ITINERARIOS_DE_LA_CIUDAD", payload: data})
				if(response.data.success) return {success: true}		
			}catch(e){
				return {success: false, error: e}
			}
		}	 
	},
	darMeGustaYSacarMeGusta: (id,token) =>{
		return async() =>{
			try{
				let response = await axios.put(`https://my-tinerarytortoza.herokuapp.com/api/itinerary/like/${id}`, {}, {
					headers:{
						Authorization: 'Bearer ' + token
					}
				})
				return response
			}catch(e){
				return {success: false, error: e}
			}
		}
	},

	agregarComentarios: (id, comment, token) => {
		return async () =>{
			try{
				let response = await axios.put(`https://my-tinerarytortoza.herokuapp.com/api/itinerary/comments/${id}`, {comment, type:"crearComentario"},
				{
					headers:{
						Authorization: 'Bearer ' + token
					}
				})
				if(response.data.success) return {success: true, response: response.data.response}
				else throw new Error()
			}catch(e){
				return {success: false, error: e}
			}
		}
	},

	borrarComentario: (id, commentId, token) => {
		return async () =>{
			try{
				let response = await axios.put(`https://my-tinerarytortoza.herokuapp.com/api/itinerary/comments/${id}`, {commentId, type:"borrarComentario"},
				{
					headers:{
						Authorization: 'Bearer ' + token
					}
				})
				if(response.data.success) return {success: true}
			}catch(e){
				return {success: false, error: e}
			}
		}
	},
	editarComentario: (commentId, comment, token) => {
		return async () =>{
			try{
				let response = await axios.put(`https://my-tinerarytortoza.herokuapp.com/api/itinerary/comments/${commentId}`, {comment, type:"editarComentario"},
				{
					headers:{
						Authorization: 'Bearer ' + token
					}
				})
				if(response.data.success) return {success: true, response: response.data.response}
				else throw new Error()
			}catch(e){
				return {success: false, error: e}
			}
		}
	},
}

export default itinerarioActions