import axios from 'axios'

const pageLoading = val => {
	return dispatch => dispatch({ type: 'PAGE_LOAD', payload: val })
}



const getPokemons = params => {
	
	const { search } = params
	let url = `/pokemons`

	return async function(dispatch){
		if( search ) url += `${search}`
		
		return await axios.get(url)
			.then(resp => {
				console.log(`El servidor respondió con:`, resp)

				dispatch({ type: 'GET_POKEMONS', payload: resp.data })
				dispatch({ type: 'SERVER_ERROR', payload: false })

				return true
			})
			.catch(err => {
				console.log('error', err)
				dispatch({
					type: 'SERVER_ERROR',
					payload: true
				})

				return true
			})
	}
}



const getTypes = () => {
	return async function(dispatch){
		return await axios.get(`/types`)
			.then(resp => {
				dispatch({ type: 'GET_TYPES', payload: resp.data })
				dispatch({ type: 'SERVER_ERROR', payload: false })
			})
			.catch(err => {
				console.log('error', err)
				dispatch({ type: 'SERVER_ERROR', payload: true })
			})
	}
}



const searchPokemon = params => {
	
	const { search } = params
	
	return async function(dispatch){
		if( !search ){
			dispatch({ type: 'SHOW_POPUP', payload: 'No he sabido que Pokémon tengo que buscar' })
			return
		}

		return await axios.get(`/pokemons/${search}`)
			.then(resp => {
				// params = new URLSearchParams(search)
				// dispatch({ type: 'SET_SEARCH', payload: params.get('name') })
				dispatch({ type: 'GET_POKEMONS', payload: resp.data })
				dispatch({ type: 'SERVER_ERROR', payload: false })

				return true
			})
			.catch(err => {
				console.log('error:', err)
				
				dispatch({ type: 'SHOW_POPUP', payload: err.response.data.error.message })

				setTimeout(() => {
					dispatch({ type: 'HIDE_POPUP', payload: err.response.data.error.message })
				}, 3000)
				
				return true
			})
	}
}



const errorPopup = (status, message) => {
	return dispatch => {
		if( !status )
			dispatch({
				type: 'HIDE_POPUP',
				payload: message
			})
		else
			dispatch({
				type: 'SHOW_POPUP',
				payload: message
			})
	}
}



const setType = val => {
	return dispatch => dispatch({ type: 'SET_TYPE', payload: val || '' })
}

const setSort = (sort, order) => {
	return dispatch => dispatch({ type: 'SET_SORT', payload: {sort, order}})
}

const setPage = p => {
	return dispatch => dispatch({ type: 'SET_PAGE', payload: p})
}

const resetFilters = val => {
	return dispatch => dispatch({ type: 'FILTERS', payload: val})
}





export {
	pageLoading,
	getPokemons,
	getTypes,
	searchPokemon,
	setType,
	setSort,
	setPage,
	resetFilters,
	errorPopup
}