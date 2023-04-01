import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { pageLoading } from '../../store/actions'


import { Link } from 'react-router-dom'

import logo from '../../assets/img/brand.svg'
import video from '../../assets/video/video.mp4'
import style from './Landing.module.css'

const LandingPage = () => {

	const dispatch = useDispatch()
	const [video_loaded, setVideoLoaded] = useState(false)

	useEffect(() => {
		if( !video_loaded ){
			dispatch(pageLoading(true))
		}else{
			dispatch(pageLoading(false))
		}
	}, [video_loaded, dispatch])


	return (
		<section className={ style['landing-wrapper']}>
			
			<div className={ style.container }>
				<div>
					<div>
						<img 
							src={ logo } 
							alt="Pokémon"
							className={ style.logo } />
					</div>
					
					<div className={ style.cta }>
						<Link 
							className={ style.btn } 
							to="/home">
							Ingresar
						</Link>
					</div>

					<div className={ style.copy }>
						<p>Pokémon API es un proyecto desarrollado 
						para el bootcamp de Henry por @fitodac 
						en Marzo de 2023.</p>
						
						<p>Para su realización se ha usado Express.js, 
							React y librerías básicas de Node.
						</p>
					</div>
				</div>
			</div>

			<video 
				className={ style.video }
				autoPlay
				muted
				loop
				onLoadedData={ () => setVideoLoaded(true) }>
					<source src={ video } type="video/mp4" />
			</video>
		</section>
	)
}


export default LandingPage