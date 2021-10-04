import axios from 'axios'


const ciudadesActions = {
	obtenerTodasLasCiudades: ()=>{
		return async (dispatch) =>{
			try {
				let response = await axios.get('https://my-tinerarytortoza.herokuapp.com/api/cities')
				let data = response.data.response
				dispatch({type:"OBTENER_TODAS_LAS_CIUDADES", payload: data}) 

			}catch(e){
				return {success: false, error: e}
			}
		}
	},

	filtrarCiudades:(eValue) => {
		return (dispatch) =>{
			dispatch({type: "FILTRAR_CIUDADES", payload: eValue})
		}
	},

	obtenerUnaCiudad: (_id)=> {
		return (dispatch) =>{
			dispatch({type: "OBTENER_UNA_CIUDAD", payload: _id})
		}
	}
}

export default ciudadesActions