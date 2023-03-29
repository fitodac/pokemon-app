import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { 
		pageLoading, 
		getPokemons,
		searchPokemon
} from '../../store/actions'
import { useHistory } from 'react-router-dom'

import Card from '../../components/Card/Card'
import Pager from '../../components/Pager/Pager'



const HomePage = () => {

	const dispatch = useDispatch()
	const data = useSelector(state => state.pokemons)
	const history = useHistory()
	const params = new URLSearchParams(history.location.search)
	const page = params.get('p') ?? 1


	useEffect(() => {
		dispatch(pageLoading(true))

		const getdata = async () => {
			const args = { page }
			if( params.get('type') ) args.type = params.get('type')

			if( 
				!data.length && 
				!params.get('name')
			){
				await dispatch(getPokemons(args))
			}
			dispatch(pageLoading(false))
		}

		getdata()
	}, [])



	useEffect(() => {
		
		// Search
		if( params.get('name') ){
			dispatch(pageLoading(true))

			const getdata = async () => {
				await dispatch(searchPokemon(params.get('name')))
				dispatch(pageLoading(false))
			}

			getdata()
		}

		// Filter by type
		else if( params.get('type') ){
			dispatch(pageLoading(true))

			const getdata = async () => {
				const args = { page }
				args.type = params.get('type')

				if( 
					!data.length && 
					!params.get('name')
				){
					await dispatch(getPokemons(args))
				}
				dispatch(pageLoading(false))
			}

			getdata()
		}

		// Paginated navigation
		else if( params.get('p') ){
			dispatch(pageLoading(true))

			const getdata = async () => {
				if( !data.length ) await dispatch(getPokemons(page))
				dispatch(pageLoading(false))
			}

			getdata()
		}

		/**
		// Filter by type
		else if( params.get('type') ){
			if( params.get('name') ){
				console.log('filtra por tipo y nombre')
			}else if( params.get('attack') ){
				console.log('filtra por tipo y ataque')
			}else{
				console.log('filtra por tipo')
			}
		}

		// Filter by name
		else if( params.get('name') ){
			console.log('filtra por nombre')
		}

		// Filter by attack
		else if( params.get('attack') ){
			console.log('filtra por ataque')
		}

		console.log( params.get('type') )
		console.log( params.get('name') )
		 */
		
	}, [history.location.search])


	return (
		<>
			{ data.body?.pokemons ? 
				(
					<div className="cards-board">
					{
						data.body.pokemons.map((e, i) => (
							<div key={ e.id }>
								<Card props={ e }/>
							</div>
						))
					}
					</div>
				) :
				null }
			
			{ data.body?.pokemons ? 
				(<Pager 
					page={ page } 
					total_pages={ data.body?.pages } />) : 
					null }
		</>
	)
}




export default HomePage