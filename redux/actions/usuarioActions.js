import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
const usuarioActions = {
	ingresarUsuario: (usuario)=>{
		return async (dispatch)=>{
			try{	
				let response = await axios.post('https://my-tinerarytortoza.herokuapp.com/api/login', usuario)
				let data = response.data.response
				if(response.data.success){
					await AsyncStorage.setItem('token',data.token)
                    await AsyncStorage.setItem('nombre',data.nombre)
                    await AsyncStorage.setItem('imagen',data.imagen)
                    await AsyncStorage.setItem('_id',data._id)
					dispatch({type: 'INGRESAR_CREAR_USUARIO', payload: data})
				}
				return response
			}catch(e){
				return {success: false, error: e.message}
			}
		}
	},
    crearUsuario: (usuarioNuevo)=> {
		return async (dispatch)=>{
			try{
				let response = await axios.post('https://my-tinerarytortoza.herokuapp.com/api/signup', usuarioNuevo)
				let data = response.data.response
				if(response.data.success){
					await AsyncStorage.setItem('token',data.token)
                    await AsyncStorage.setItem('nombre',data.nombre)
                    await AsyncStorage.setItem('imagen',data.imagen)
                    await AsyncStorage.setItem('_id',data._id)
					dispatch({type: 'INGRESAR_CREAR_USUARIO', payload: data})
				}
				return response
			}catch(e){
				return {success: false, error: e.message}
			}
		}
	},

	verificar: (token) =>{
		return async(dispatch) =>{
			try{
				let respuesta = await axios.get('https://my-tinerarytortoza.herokuapp.com/api/verifyToken', {
					headers: {
						Authorization: 'Bearer ' + token
					}
				})
				dispatch({type: 'INGRESAR_CREAR_USUARIO', payload: {
					token,
					nombre: respuesta.data.nombre,
					imagen: respuesta.data.imagen,
					_id: respuesta.data._id
				}
				})
			}catch(error){
			 	return dispatch({type:'SALIR' })
			}	
		}
	},

	desconectarUsuario: () =>{
		return async (dispatch) =>{
			await AsyncStorage.clear()
			dispatch({type:'SALIR'})
		}
	},
}

export default usuarioActions