import { combineReducers } from 'redux'
import ciudadesReducer from './ciudadesReducers'
import itinirariosReducers from './itinirariesReducers'
import usuarioReducers from './usuarioReducer'

const rootReducer = combineReducers({
	ciudades: ciudadesReducer,
	itinerarios: itinirariosReducers,
	usuario: usuarioReducers,
})

export default rootReducer