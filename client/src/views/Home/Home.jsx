import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { 
		pageLoading, 
		getPokemons,
		searchPokemon,
		setType,
		setPage
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

	const dispatch = useDispatch(),
				data = useSelector(state => state.pokemons),
				page = useSelector(state => state.page),
				type = useSelector(state => state.type),
				sort = useSelector(state => state.sort),
				order = useSelector(state => state.order),
				filters = useSelector(state => state.filters),
				[pokemons, setPokemons] = useState(data)
	useEffect(() => setPokemons(data), [data])
	const history = useHistory(),
				params = new URLSearchParams(history.location.search),
				[loadingData, setLoadingData] = useState(false),
				[init, setInit] = useState(false)



	const loadData = async (cb) => {
		setLoadingData(true)
		dispatch(pageLoading(true))
		const args = {}
		if( history.location.search ) args.search = history.location.search
		const data = await dispatch(cb(args))
		
		if( data ){
			setLoadingData(false)
			dispatch(pageLoading(false))
		}
		
		setInit(true)
	}




	useEffect(() => {
		if( !history.location.search.length || params.has('p') ){
			(async () => {
				await loadData(getPokemons)
			})()
		}
	}, []) // eslint-disable-line react-hooks/exhaustive-deps





	useEffect(() => {

		// Search
		if( params.has('name') ){
			dispatch(setType(''))
			loadData(searchPokemon)
		}

	}, [history.location.search]) // eslint-disable-line react-hooks/exhaustive-deps



	useEffect(() => {
		const g = async () => {
			setPage(1)
			dispatch(setType(params.get('type')))
			await loadData(getPokemons)
		}
		if( !loadingData && filters ) g()
	}, [type]) // eslint-disable-line react-hooks/exhaustive-deps


	useEffect(() => {
		switch(sort){
			case 'name':
				setPokemons( sortByName(pokemons, order) )
				break;
			case 'attack':
				setPokemons( sortByAttack(pokemons, order) )
				break;
			default:
				return
		}
	}, [sort, order]) // eslint-disable-line react-hooks/exhaustive-deps


	useEffect(() => {
		if( params.has('p')){
			setPage(params.get('p'))
			loadData(getPokemons)
		}
	}, [page]) // eslint-disable-line react-hooks/exhaustive-deps


	useEffect(() => {
		if( init && !filters ){
			const g = async () => await loadData(getPokemons)
			setTimeout(() => g(), 200)
		}
	}, [filters]) // eslint-disable-line react-hooks/exhaustive-deps




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

						<Pager />
					</>
				) :
				null }


			{ !pokemons.length && init ? 
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