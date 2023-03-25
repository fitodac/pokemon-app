import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPokemons } from '../../store/actions'
import { Link } from 'react-router-dom'

import Sidebar from '../../components/Sidebar/Sidebar'
import Card from '../../components/Card/Card'
import Footer from '../../components/Footer/Footer'
const HomePage = () => {

	const dispatch = useDispatch()
	const pokemons = useSelector(state => state.pokemons)

	useEffect(() => {
		dispatch(getPokemons())
	}, [])

	return (
		<div className="main-wrapper">
			<Sidebar />

			<div className="main-content">
				{
					pokemons.length > 0 ?
					(<div className="cards-board">
						{
							pokemons.map(e => (
								<div>
									<Card key={ `item-${e.id}` } props={ e }/> 
								</div>
							))
						}
						</div>
					):
					null
				}
				<Footer />
			</div>
		</div>
	)
}




export default HomePage