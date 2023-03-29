import { Link, useLocation } from 'react-router-dom'

import style from './Pager.module.css'

const Pager = props => {

	const location = useLocation()
	const { 
		page,
		total_pages
	} = props
	

	const items = []
	for(let i = 1; i < total_pages + 1; i++){
		items.push(
			<Link 
				to={`${location.pathname}?p=${i}`}
				key={ `page-${i}` }
				className={ i === Number(page) ? `${style.item} ${style.active}`: style.item }>
				{i}
			</Link>)
	}

	return (
		<div className={ style.pager }>
			{ 
				total_pages ? 
				(<div className={ style.list }>
					{ items }
				</div>):
				null
			}
		</div>
	)
}


export default Pager