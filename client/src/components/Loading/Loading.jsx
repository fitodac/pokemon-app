import { useState, useEffect, useRef } from 'react'
import src from '../../assets/img/loading.gif'
import style from './Loading.module.css'

const messages = [
	'...atrapando nuevos Pokémons',
	'Reparando la bicicleta de Misty',
	'...entrenando a Ivysaur',
	'Estamos atrapando un Pidgeoto',
	'...entrenando a Arbok',
	'Corroborando la flama de Charmander',
	'...entrenando a Spearow',
	'...pika, pika, pika, pero no se rasca',
	'...Squirtle, squirtle, squirtle',
	'...dame unos segundos más por favor',
	'...lustrando las Pokeballs',
	'Se está demorando un poquito, pero valdrá la pena',
	'...buscando la gorra de Ash',
	'pika, pika... chiuuu',
	'El equipo Rocket nos está demorando...'
]

const rand = () => Math.floor(Math.random() * messages.length)


const Loading = () => {

	const [msj, setMsj] = useState(messages[rand()])
	const loader = useRef(null)

	useEffect(() => {
		setTimeout(() => {
			if( !loader.current ) return
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
		<div 
			className={ style.loading }
			ref={ loader }>
			<div className={ style['loading-container'] }>
				<img src={ src } alt="Page loading" />
				<div className="">{ msj }</div>
			</div>
		</div>
	)
}

export default Loading