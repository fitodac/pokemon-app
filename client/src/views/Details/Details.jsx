import { useState, useEffect } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { pageLoading } from '../../store/actions'
import { useParams } from 'react-router-dom'


const DetailsPage = () => {

	const [ data, setData ] = useState({})
	const dispatch = useDispatch()
	const { id } = useParams()

	const {
		name,
		image,
		life,
		attack,
		deffense,
		speed,
		height,
		weight,
		types
	} = data


	useEffect(() => {
		dispatch(pageLoading(true))

		const getdata = async () => {
			if( !data.length ) 
				await axios.get(`http://localhost:3001/pokemons/${id}`)
					.then(resp => setData(resp.data))
			dispatch(pageLoading(false))
		}

		getdata()
	}, [])


	return (
		<div className="page-content">
			<img src={ image } alt={ name } />
			<div>{ name }</div>
			<div>{ life }</div>
			<div>{ attack }</div>
			<div>{ deffense }</div>
			<div>{ speed }</div>
			<div>{ height }</div>
			<div>{ weight }</div>

			<div>
				{ types && types.map(e => (
					<div key={ e }>{ e }</div>
				)) }
			</div>
			
		</div>
	)
}


export default DetailsPage