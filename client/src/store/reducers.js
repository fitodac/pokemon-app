const initial_state = {
	pokemons: []
}

const rootReducer = (state = initial_state, action) => {
	switch( action.type ){
		case 'GET_POKEMONS':
			return {...state, pokemons: action.payload}
		default:
			return state
	}
}


export default rootReducer