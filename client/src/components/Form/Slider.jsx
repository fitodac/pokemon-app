import style from './Slider.module.css'



const Slider = props => {

	const {
		value,
		label,
		name
	} = props

	const min = props.range[0]
	const max = props.range[1]

	const handleChange = e => {
		// setData(e.target.value)
		props.handleChange(e)
	}

	return (
		<>
			<label>{ label }</label>
			<div className={ style.slidecontainer }>
				<input 
					type="range" 
					min={ min } 
					max={ max } 
					name={ name }
					value={ value }
					className={ style.slider } 
					onChange={ handleChange } 
				/>

				<div>{ value }</div>
			</div>

			{/* { !errors?.life?.valid ? (<div className={ style.error }>{ errors?.life?.msj }</div>) : null } */}
		</>
	)
}


export default Slider