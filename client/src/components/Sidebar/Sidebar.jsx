import { useState } from 'react'

import logo from '../../assets/img/brand.svg'
import style from './Sidebar.module.css'


const Sidebar = () => {

	const [search, setSearch] = useState()

	const handleSearch = () => {
		console.log('search')
	}


	return (
		<div className={ style.sidebar }>
			<img src={ logo } alt="Pokèmon" className={ style.logo }/>

			<div className={ style['search-bar'] }>
				<form method="get" onSubmit={ handleSearch }>
					<input type="text" name="s" />
					<button>buscar</button>
				</form>
			</div>
		</div>
	)
}



export default Sidebar