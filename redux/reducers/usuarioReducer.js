const usuarioReducers = (state = {token: null, nombre: null, imagen: null, _id: null},
action) =>{
	switch(action.type){
		case 'INGRESAR_CREAR_USUARIO':
			return{	
				token: action.payload.token,
				nombre: action.payload.nombre,
				imagen: action.payload.imagen,
				_id: action.payload._id
			}
		case "SALIR":
			return{
				token: null,
				nombre:null,
				imagen:null,
				_id:null,
			}		
		default:
			return state	
	}
	
}

export default usuarioReducers
