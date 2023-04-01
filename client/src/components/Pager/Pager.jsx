import { useHistory } from 'react-router-dom'
import { setUrlPager } from '../../utils/url'
import { 
	useDispatch, 
	useSelector 
} from 'react-redux'
import { setPage } from '../../store/actions'

import style from './Pager.module.css'




const Pager = props => {
	
	const dispatch = useDispatch()
	const page = useSelector(state => state.page),
				pages = useSelector(state => state.pages)
	const history = useHistory()

	const navigate = i => {
		dispatch(setPage(i))
		history.push( setUrlPager(i) )
	}
	

	const items = []
	for(let i = 1; i < pages + 1; i++){
		items.push(
			<button
				onClick={ () => i === Number(page) ? null : navigate(i) } 
				key={ `page-${i}` }
				className={ i === Number(page) ? `${style.item} ${style.active}`: style.item }>
				{i}
			</button>)
	}



	return (
		<div className={ style.pager }>
			{ 
				pages ? 
				(<div className={ style.list }>
					{ items }
				</div>):
				null
			}
		</div>
	)
}


export default Pager