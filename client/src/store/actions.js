import axios from 'axios'


const api = 'http://localhost:3001/'

const pageLoading = val => {
	return dispatch => {
		dispatch({
			type: 'PAGE_LOAD',
			payload: val
		})
	}
}




const getPokemons = params => {
	
	const { search } = params
	let url = `${api}pokemons`

	return async function(dispatch){
		if( search ) url += `${search}`
		
		return await axios.get(url)
			.then(resp => {
				console.log(`El servidor respondió con:`, resp)

				dispatch({
					type: 'GET_POKEMONS',
					payload: resp.data
				})

				dispatch({ type: 'SERVER_ERROR', payload: false })
			})
			.catch(err => {
				console.log('error', err)
				dispatch({
					type: 'SERVER_ERROR',
					payload: true
				})
			})
	}
}



const getTypes = () => {
	return async function(dispatch){
		return await axios.get(`${api}types`)
			.then(resp => {
				dispatch({
					type: 'GET_TYPES',
					payload: resp.data
				})

				dispatch({ type: 'SERVER_ERROR', payload: false })
			})
			.catch(err => {
				console.log('error', err)
				dispatch({
					type: 'SERVER_ERROR',
					payload: true
				})
			})
	}
}



const sortPokemons = (sort, order) => {
	return dispatch => dispatch({
												type: 'SORT',
												payload: {sort, order}
											})
}



const searchPokemon = params => {
	
	const { search } = params
	
	return async function(dispatch){
		if( !search ){
			dispatch({
				type: 'SHOW_POPUP',
				payload: 'No he sabido que Pokémon tengo que buscar'
			})
			return
		}

		return await axios.get(`${api}pokemons/${search}`)
			.then(resp => {
				dispatch({
					type: 'GET_POKEMONS',
					payload: resp.data
				})
				
				dispatch({ type: 'SERVER_ERROR', payload: false })
			})
			.catch(err => {
				dispatch({
					type: 'SHOW_POPUP',
					payload: err.response.data.error.message
				})

				setTimeout(() => {
					dispatch({
						type: 'HIDE_POPUP',
						payload: err.response.data.error.message
					})
				}, 3000)
				
				console.log('error:', err)
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


export {
	pageLoading,
	getPokemons,
	getTypes,
	sortPokemons,
	searchPokemon,
	errorPopup
}