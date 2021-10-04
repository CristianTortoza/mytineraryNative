import axios from 'axios'

const actividadesActions = {
	obtenerActividadesPorItinerarios: (id) =>{
		return async (dispatch) =>{
			try{
				let response = await axios.get(`https://my-tinerarytortoza.herokuapp.com/api/activities/${id}`)
				return response
			}catch(e){
				return({success: false, response: e})
			}
		}
	}
}

export default actividadesActions