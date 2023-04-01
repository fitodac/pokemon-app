import { useState, useEffect } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { 
	pageLoading,
	errorPopup,
	setType,
	resetFilters
} from '../../store/actions'
import { useHistory, useParams } from 'react-router-dom'

import style from './Details.module.css'


const DetailsPage = () => {

	const history = useHistory()
	const [ data, setData ] = useState({})
	const [is_mounted, setIsMounted] = useState(false)
	const dispatch = useDispatch()
	const { id } = useParams()

	const {
		name,
		image,
		life,
		attack,
		defense,
		speed,
		height,
		weight,
		types
	} = data


	useEffect(() => {
		if (!is_mounted) {
			dispatch(pageLoading(true))

			const getdata = async () => {
				if( !data.length ) 
					await axios.get(`http://localhost:3001/pokemons/${id}`)
						.then(resp => {
							setData(resp.data)
							dispatch(errorPopup(false, ''))
						})
						.catch(err => {
							dispatch(errorPopup(true, 'No se han podido cargar los datos para este Pokémon'))
						})
				dispatch(pageLoading(false))
			}

			getdata()
			setIsMounted(true)
		}
	}, [data, dispatch ,id, is_mounted])



	const seachType = type => {
		dispatch(setType(type))
		dispatch(resetFilters(true))
		history.push(`/home?type=${type}`)
	}


	return (
		<div className="page-content">
			<div className={ style.details }>
				<img src={ image } alt={ name } className={ style.image } />
				
				<h3 className={ style.name }>{ name }</h3>
				
				<div className={ style['details-content']}>
					<dl className={ style.list }>
						<dt>Vida</dt>
						<dd>{ life }</dd>

						<dt>Ataque</dt>
						<dd>{ attack }</dd>

						<dt>Defensa</dt>
						<dd>{ defense }</dd>

						<dt>Velocidad</dt>
						<dd>{ speed }</dd>

						<dt>Altura</dt>
						<dd>{ height }</dd>

						<dt>Peso</dt>
						<dd>{ weight }</dd>
					</dl>
				</div>
				


				<div className={ style['list-secondary'] }>
					<div className={ style['list-secondary--title']}>Tipos</div>
					
					<div className={ style['list-secondary--container']}>
						{ types && types.map(e => (
							<button 
								key={ e }
								onClick={ () => seachType(e)}
								className={ style['list-secondary--item'] }>
								{ e }
							</button>
						)) }
					</div>
				</div>

			</div>
		</div>
	)
}


export default DetailsPage