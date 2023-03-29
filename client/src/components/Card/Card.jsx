import { Link } from 'react-router-dom'

import style from './Card.module.css'



const Card = props => {
	
	const {
		id,
		name,
		image,
		attack,
		types,
		createdInDb
	} = props.props

	return (
		<Link 
			to={ `/details/${id}` }
			className={ style.card } 
			style={{backgroundImage:`url(${image})`}}
			id={ `pokemon-${id}` }>

			<img 
				src={ image } 
				alt={ name } 
				className={ style['card-img'] } />

			{createdInDb ?
				(<div className={ `${style['card-label']} ${style['custom']}` }>Custom</div>): 
				(<div className={ `${style['card-label']} ${style['original']}` }>Original</div>)
			}

			<div className={ style.attack }>
				<svg 
					className={ style['attack-icon']}
					width="100px" height="95px" viewBox="0 0 100 95">
					<g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
						<g fillRule="nonzero">
							<path d="M100,39.4700037 L83.7898252,35.271482 L75.1578574,32.9620888 L76.5265061,24.4595104 L79.0530136,9.34329493 L64.7364507,15.0114305 L51.8943262,20.0499191 L41.3679945,11.441806 L27.4736127,1.77144781e-15 L27.052879,17.9506582 L26.8421456,29.3924642 L16.4208894,30.8620406 L0,33.1714338 L11.1577235,45.3484216 L19.6838642,54.6909667 L12.31562,68.5477007 L2.20996573,87.4427358 L22.6310491,80.9338836 L36.4203555,76.525042 L41.8942359,84.187841 L49.57827,95 L56.4200097,83.662979 L60.209489,77.364259 L69.5779242,78.9385454 L82.525876,81.0385561 L79.6835785,68.4420534 L77.4726729,58.6799936 L87.2617854,50.3875475 L100,39.4700037 Z M67.7894252,55.3206513 L71.1582273,70.2267345 L55.8952344,67.707209 L48.9476676,79.0442301 L39.7899471,66.1328102 L19.9985639,72.6409126 L30.3141809,53.4309603 L17.5776956,39.4701912 L35.367384,36.9506657 L35.7881177,18.0556306 L50.3146433,29.9177012 L67.8936171,23.0941192 L65.1569589,39.4696288 L81.5778482,43.6689004 L67.7894252,55.3206513 Z" id="Shape"></path>
							<polygon id="Path" points="58.7367801 34.4313277 48.9469157 38.3158695 42.736568 33.0672486 42.4208345 43.2495731 32.1052175 44.7191495 38.9469571 52.2771635 34.7368004 60.3594773 42.6315491 57.8405141 48.5261068 66.0283627 52.3155862 59.8344277 61.7889087 61.4094451 59.7887177 52.6967345 66.4204946 47.1331964 57.0520595 44.7190182"></polygon>
						</g>
					</g>
				</svg>
				<span>{ attack }</span>
			</div>

			<div className={ style['card-title'] }>
				{ name }
			</div>

			{ types.length > 0 ?
				(<div className={ style['card-types'] }>
					{
						types.map((e, idx) => (
							<span 
								key={ idx }
								className={ style['card-types--item']}>
								{ e }
							</span>
						))
					}
				</div>) :
				null}
			
		</Link>
	)
}


export default Card