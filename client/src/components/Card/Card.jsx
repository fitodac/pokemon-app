import { Link } from 'react-router-dom'
import style from './Card.module.css'

const Card = props => {
	
	const {
		id,
		name,
		image
	} = props.props

	return (
		<Link to={ `/character/${id}` }>
			<div className={ style.card } id={ `pokemon-${id}` }>
				<img src={ image } alt={ name } className={ style['card-img'] }/>
				<h3>{ name }</h3>
			</div>
		</Link>
	)
}


export default Card