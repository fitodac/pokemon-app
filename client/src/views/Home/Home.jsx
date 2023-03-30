import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { 
		pageLoading, 
		getPokemons,
		searchPokemon,
		sortPokemons
} from '../../store/actions'
import {
	sortByName,
	sortByAttack
} from '../../utils/sort'
import { useHistory } from 'react-router-dom'

import empty from '../../assets/img/empty-list.gif'
import Card from '../../components/Card/Card'
import Pager from '../../components/Pager/Pager'



const HomePage = () => {

	const dispatch = useDispatch()
	const data = useSelector(state => state.pokemons)
	const pages = useSelector(state => state.pages)
	const [pokemons, setPokemons] = useState(data)
	useEffect(() => setPokemons(data), [data])
	const history = useHistory()
	const params = new URLSearchParams(history.location.search)
	

	if( params.get('p') > pages ){
		params.set('p', pages)
		const srch = params.toString()
		window.history.pushState(null, null, srch)
	}
	const page = params.get('p') ?? 1
	const [init, setInit] = useState(false)



	const loadData = async (cb) => {
		dispatch(pageLoading(true))
		const args = { }
		if( history.location.search ) args.search = history.location.search
		await dispatch(cb(args))
		dispatch(pageLoading(false))
	}


	useEffect(() => {
		if( !history.location.search.length || params.toString() === `p=${params.get('p')}` ){
			console.log('home init')
			loadData(getPokemons)
			setInit(true)
		}
	}, [])





	useEffect(() => {

		// Search
		if( params.has('name') ){
			console.log('Busca por nombre')
			loadData(searchPokemon)
		}

		else{
			
			// Filter by type
			if( params.has('type') && !params.has('sort') && !params.has('order') )
			{
				console.log('Busca por tipo')
				loadData(getPokemons)
			}

			else if( params.has('type') && params.has('sort') && params.has('order') )
			{
				console.log('Busca por tipo y lo ordena (tiene type)')
				loadData(getPokemons)
			}

			else if( !params.has('type') && params.has('sort') && params.has('order') )
			{
				console.log('Busca por tipo y lo ordena (no tiene type)')
				
				if( !pokemons.length ){
					loadData(getPokemons)
				}else{
					if( 'name' === params.get('sort') ){
						setPokemons( sortByName(pokemons, params.get('order')) )
					}
					if( 'attack' === params.get('sort') ){
						setPokemons( sortByAttack(pokemons, params.get('order')) )
					}
				}
			}

			else if( params.has('p') && !params.has('type') && !params.has('sort') && !params.has('order') ){
				console.log('paginado')
				loadData(getPokemons)
			}

			else if( !params.has('type') && !params.has('sort') && !params.has('order') ){
				console.log('home inicio')
				if( init ) loadData(getPokemons)
			}

		}

	}, [history.location.search])




	return (
		<>
			{ pokemons.length > 0 ? 
				(
					<>
						<div className="cards-board">
						{pokemons.map((e, i) => (
							<div key={ e.id }>
								<Card props={ e }/>
							</div>
						))}
						</div>

						<Pager page={ page } total_pages={ pages } />
					</>
				) :
				null }

			{ pokemons.length > 0 && init ? 
				(
					<div className="page-content">
						<div className="empty-data">
							<img src={ empty } alt="Empty list" />
							<div>Ups! Parece que no hay pokémons disponibles</div>
						</div>
					</div>
				): 
				null }
		</>
	)
}




export default HomePage