import {
	sortByName,
	sortByAttack
} from '../utils/sort'

const initial_state = {
	pokemons: [],
	pages: 0,
	types: [],
	server_error: false,
	popup: {
		active: false,
		message: ''
	},
	loading: false
}

const rootReducer = (state = initial_state, action) => {
	switch( action.type ){
		case 'GET_POKEMONS':
			return {
				...state, 
				pokemons: action.payload.body.pokemons,
				pages: action.payload.body.pages ?? 1
			}
		
		case 'GET_TYPES':
			return {...state, types: action.payload}

		case 'PAGE_LOAD':
			return {...state, loading: action.payload }

		case 'SHOW_POPUP':
			return {...state, popup: { active: true, message: action.payload }}

		case 'HIDE_POPUP':
			return {...state, popup: { active: false, message: '' } }
		
		case 'SORT': 
			const { sort, order } = action.payload
			const pokemons = [...state.pokemons]
			
			if( 'name' === sort ) sortByName(pokemons, order)
			if( 'attack' === sort ) sortByAttack(pokemons, order)
			
			return {...state, filters: action.payload}

		case 'SERVER_ERROR':
			return {...state, server_error: action.payload}

		default:
			return state
	}
}


export default rootReducer