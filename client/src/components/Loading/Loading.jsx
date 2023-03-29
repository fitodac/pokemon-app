import { useState, useEffect } from 'react'
import src from '../../assets/img/loading.gif'
import style from './Loading.module.css'

const messages = [
	'...atrapando nuevos Pokémons',
	'...entrenando a Ivysaur',
	'...lustrando las Pokeballs',
	'...dame unos segundos más por favor',
	'Se está demorando un poquito, pero valdrá la pena',
	'...buscando la gorra de Ash'
]

const rand = () => Math.floor(Math.random() * messages.length)


const Loading = () => {

	const [msj, setMsj] = useState(messages[rand()])

	useEffect(() => {
		setTimeout(() => {
			let r = rand()
			let new_msj = messages[r]
			if( new_msj !== msj ){
				setMsj(messages[r])
				return
			}
			r++
			r = r > messages.length ? 0 : r
			setMsj(messages[r])
		}, 3000)
	}, [msj])

	return (
		<div className={ style.loading }>
			<div className={ style['loading-container'] }>
				<img src={ src } alt="Page loading" />
				<div className="">{ msj }</div>
			</div>
		</div>
	)
}

export default Loading