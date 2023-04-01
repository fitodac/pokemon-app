import { useLocation } from 'react-router-dom'

import style from './Hero.module.css'


const Hero = () => {
	const location = useLocation()

	return (
		<>
		{ '/' === location.pathname ? 
			null : 
			(<div className={ style.hero }></div>)}
		</>
	)
}


export default Hero