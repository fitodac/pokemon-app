import { useState, useEffect } from 'react'
import { 
	useDispatch, 
	useSelector 
} from 'react-redux'
import { useHistory } from 'react-router-dom'
import { 
	getTypes, 
	pageLoading,
	setType,
	setSort,
	setPage,
	resetFilters
} from '../../store/actions'

import {
	setUrlSearch,
	setUrlType,
	setUrlSort
} from '../../utils/url'

import { Link, useLocation } from 'react-router-dom'
import logo from '../../assets/img/brand.svg'
import style from './Sidebar.module.css'

const setFilterBtnClassName = (filter, order, value) => {
	const active = `${style['filter-btn']} ${style['filter-btn-active']}`
	if( filter && value === order) return active
	return style['filter-btn']
}


const Sidebar = () => {

	const dispatch = useDispatch()
	const location = useLocation()
	const types = useSelector(state => state.types)
	const pokemons = useSelector(state => state.pokemons)
	const type = useSelector(state => state.type)
	const sort = useSelector(state => state.sort)
	const order = useSelector(state => state.order)
	const history = useHistory()
	const params = new URLSearchParams(history.location.search)
	const [ search, setSearch ] = useState(params.get('name') ?? '')
	const [is_mounted, setIsMounted] = useState(false)


	useEffect(() => {
		const params = new URLSearchParams(history.location.search)
		if( !params.has('name') ) setSearch('')
	}, [history.location.search])

	// Search
	const inputSearch = e => setSearch(e.target.value)

	const handleSearch = async e => {
		e.preventDefault()
		dispatch(setType(''))
		dispatch(setSort('', ''))
		dispatch(resetFilters(true))
		
		history.push(setUrlSearch(search))
	}


	useEffect(() => {
		if( !is_mounted){
			dispatch(pageLoading(true))

			const getdata = async () => {
				if( !types.length ) await dispatch(getTypes())
				dispatch(pageLoading(false))
			}

			getdata()
			setIsMounted(true)
		}
	}, [dispatch, types, is_mounted])



	// Filter by type
	const filterType = e => {
		setSearch('')
		dispatch(setSort('', ''))
		dispatch(setType(e.target.value))
		dispatch(resetFilters(true))
		history.push(setUrlType(e.target.value))
	}


	// Filter by name
	const filterName = e => {
		dispatch(setSort('name', e))
		dispatch(resetFilters(true))
		history.push(setUrlSort('name', e))
	}


	// Filter by attack
	const filterAttack = e => {
		dispatch(setSort('attack', e))
		dispatch(resetFilters(true))
		history.push(setUrlSort('attack', e))
	}


	// Reset filters
	const filterReset = async () => {
		dispatch(resetFilters(false))
		setSearch('')
		dispatch(setType(''))
		dispatch(setSort('', ''))
		dispatch(setPage(1))
		setTimeout(() => history.push(`/home`), 200)
	}


	const filterNameAsc_ClassName = () => setFilterBtnClassName('name' === sort, order, 'asc')
	const filterNameDesc_ClassName = () => setFilterBtnClassName('name' === sort, order, 'desc')
	const filterAttackAsc_ClassName = () => setFilterBtnClassName('attack' === sort, order, 'asc')
	const filterAttackDesc_ClassName = () => setFilterBtnClassName('attack' === sort, order, 'desc')



	if( '/' === location.pathname ) return(<></>)

	return (
		<div className={ style.sidebar }>
			<div onClick={ () => filterReset() }>
				<img src={ logo } alt="Pokémon" className={ style.logo }/>
			</div>

			{ '/home' === location.pathname ?
				(<>
					<div className={ style['search-bar'] }>
						<form 
							method="get" 
							className={ style['search-form']}
							onSubmit={ handleSearch }>
							
							<input 
								type="text" 
								name="s"
								autoComplete="off"
								placeholder="Encuentralo yá!"
								className={ style['search-input']}
								value={ search }
								onChange={ inputSearch} />
							
							<button
								className={ style['search-button']}>
								<svg width="100px" height="100px" viewBox="0 0 100 100">
									<g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
										<g id="noun-loupe-4448783" fill="#000000" fillRule="nonzero">
											<path d="M56.292898,37.5514936 C56.292898,47.5416319 48.1611348,55.6406654 38.1306246,55.6406654 C28.1001144,55.6406654 19.9683512,47.5416319 19.9683512,37.5514936 C19.9683512,27.5598493 28.1001144,19.4608158 38.1306246,19.4608158 C48.1611348,19.4608158 56.292898,27.5598493 56.292898,37.5514936" id="Path"></path>
											<path d="M98.565819,91.6077988 L67.9352453,60.9533032 C79.5148428,46.1320567 78.4352446,24.669166 64.8018779,11.0684972 C49.9619393,-3.68949907 25.9348321,-3.68949907 11.0979176,11.0684972 C-3.69930585,25.8264935 -3.69930585,49.7339279 11.0979176,64.4923007 C24.7093218,78.0692507 46.0253374,79.1460095 60.8856885,67.8865759 L91.5593555,98.5425774 C93.4641885,100.482362 96.5974803,100.482362 98.5449907,98.5631669 C100.492614,96.6454067 100.470501,93.5246132 98.5656629,91.6056483 L98.565819,91.6077988 Z M57.7935999,57.5163341 C56.5650656,58.7605177 55.1903546,59.8355823 53.7919801,60.8047406 L53.7506334,60.7635639 C49.8125193,63.3769254 45.218935,65.0638225 40.1808102,65.4226166 C24.7281165,66.5608937 11.285305,54.9867152 10.1645036,39.5743808 C9.59306507,31.9843605 12.1963104,24.8574218 16.7898947,19.4600741 C16.9597046,19.249771 17.1708538,19.0600544 17.3185047,18.8909355 C17.6581245,18.4909158 18.0184291,18.1114901 18.3993881,17.7526584 C29.3424158,7.12700646 46.8919341,7.19025663 57.7918687,18.0056139 C68.7144838,28.9268097 68.7144838,46.6379865 57.7918687,57.5181451 L57.7935999,57.5163341 Z" id="Shape"></path>
										</g>
									</g>
								</svg>
							</button>

						</form>
					</div>



					<div className={ style['filter-box'] }>
						<div className={ style['filter-box--head']}>Filtros:</div>
						
						<div className={ style['filter-box--body']}>
							<div>
								{ types.length > 0 ? 
								(<>
									<div className={ style['filter-box--label']}>Por tipo</div>
									
									<select  
										value={ type }
										onChange={ filterType }
										className={ style['filter-select'] }>
											<option value="">Selecciona un tipo</option>
											{ types.length > 0  && types.map(e => (
												<option 
													key={ e.id } 
													value={ e.name }>
													{ e.name }
												</option>
											))}
									</select>
								</>) : 
								null}
							</div>

							<div>
								<div className={ style['filter-box--label']}>Por nombre</div>
								
								<div className={ style['filter-btn-group']}>
									<button 
										onClick={ () => filterName('asc') }
										className={ filterNameAsc_ClassName() }
										disabled={ pokemons.length < 2}>
										&uarr;
									</button>
									<button
										onClick={ () => filterName('desc') }
										className={ filterNameDesc_ClassName() }
										disabled={ pokemons.length < 2}>
										&darr;
									</button>
								</div>
							</div>

							<div>
								<div className={ style['filter-box--label']}>Por ataque</div>
								
								<div className={ style['filter-btn-group']}>
									<button
										onClick={ () => filterAttack('asc') }
										className={ filterAttackAsc_ClassName() }
										disabled={ pokemons.length < 2}>
										&uarr;
									</button>
									<button
										onClick={ () => filterAttack('desc') }
										className={ filterAttackDesc_ClassName() }
										disabled={ pokemons.length < 2}>
										&darr;
									</button>
								</div>
							</div>
						</div>
					</div>

					<br/>
					<div className={ style['filter-box--reset'] }>
						<button 
							onClick={ filterReset }
							className={ style['filter-box--btn'] }>
							Borrar filtros
						</button>
					</div>
				</>):
				null }


			<br/>
			<br/>
			<br/>
			{ '/create' !== location.pathname && !location.pathname.includes('/details') ? 
				(<Link 
					to="/create"
					className={ style['nav-link'] }>Nuevo pokemon</Link>) : 
				null}


			{ ('/create' === location.pathname || location.pathname.includes('/details')) ? 
				(<Link 
					to="/home"
					className={ style['nav-link'] }>Volver</Link>) : 
				null}
			
		</div>
	)
}



export default Sidebar