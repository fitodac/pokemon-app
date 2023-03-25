import axios from 'axios'

const api = 'http://localhost:3001/'

const getPokemons = () => {
	return async function(dispatch){
		return await axios.get(`${api}pokemons`)
									.then(resp => dispatch({
																	type: 'GET_POKEMONS',
																	payload: resp.data
																}))
									.catch(err => {
										console.log('error', err)
									})
	}
}


export {
	getPokemons
}