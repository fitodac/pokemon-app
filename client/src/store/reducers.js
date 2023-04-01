const initial_state = {
	pokemons: [],
	page: 1,
	pages: 1,
	type: '',
	sort: '',
	order: '',
	filters: false,
	// search: '',
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
				pages: action.payload.body.pages || 1
			}
		
		case 'SET_TYPE':
			return {...state, type: action.payload}
		
		case 'SET_SORT':
			const { sort, order } = action.payload
			return {...state, sort: sort, order: order}
		
		case 'SET_PAGE':
			return {...state, page: action.payload}

		case 'GET_TYPES':
			return {...state, types: action.payload}
		
		case 'FILTERS':
			return {...state, filters: action.payload}

		// case 'SET_SEARCH':
		// 	return {...state, search: action.payload}
		
		case 'PAGE_LOAD':
			return {...state, loading: action.payload }

		case 'SHOW_POPUP':
			return {...state, popup: { active: true, message: action.payload }}

		case 'HIDE_POPUP':
			return {...state, popup: { active: false, message: '' } }

		case 'SERVER_ERROR':
			return {...state, server_error: action.payload}

		default:
			return state
	}
}


export default rootReducer