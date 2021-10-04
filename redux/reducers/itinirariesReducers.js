const itinirariosReducers = (state = {
	itinerarios: [],
}, 
action) =>{
	switch(action.type){
		case "OBTENER_LOS_ITINERARIOS_DE_LA_CIUDAD":
			return{
				...state,
				itinerarios: action.payload
			}
		default:
			return state	
	}
	
}

export default itinirariosReducers