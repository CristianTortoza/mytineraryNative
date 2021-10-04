const ciudadesReducer = (state = { 
	listaCiudades: [],
	filtrarCiudades:[],
	unaCiudad: {}
}, 
action) =>{
	switch(action.type){
		case "OBTENER_TODAS_LAS_CIUDADES":
			return{ 
				...state,
				listaCiudades: action.payload,
				filtrarCiudades: action.payload
			}
		case "FILTRAR_CIUDADES":
			let CiudadesFiltradas = state.listaCiudades.filter(ciudad =>ciudad.nombre.toLowerCase().replace(/\s+/g, '').startsWith(action.payload.replace(/\s+/g, '').toLowerCase()))
			return{
				...state, 	
				filtrarCiudades: CiudadesFiltradas
			}
		case "OBTENER_UNA_CIUDAD":
			let ciudad = state.listaCiudades.find((ciudad) =>ciudad._id === action.payload)
			return{
				...state,
				unaCiudad: ciudad
			}	
			
		default:
			return state	
	}
}

export default ciudadesReducer