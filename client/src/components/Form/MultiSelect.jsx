import { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'

import style from './MultiSelect.module.css'



const MultiSelect = props => {

	const {
		label,
		options,
		value
	} = props


	const [ list, setList ] = useState([])
	const [ dropdownActive, setDropdownActive ] = useState(false)


	useEffect(() => {
		const arr = value.map(id => {
			const e = options.find(e => Number(e.id) === Number(id))
			return {id: e.id, name: e.name}
		})
		setList([...arr])
	}, [value, options])


	const addItem = item => {
		if( !value.includes(item.id) ){
			value.push(item.id)
		}else{
			const idx = value.findIndex(e => Number(e) === Number(item.id))
			value.splice(idx, 1)
		}
		props.onChange(value)
	}

	const removeItem = item => {
		const idx = value.findIndex(e => Number(e) === Number(item.id))
		value.splice(idx, 1)
		props.onChange(value)
	}


	const openDropdownOnClickWrapper = e => {
		if( e.target.className.includes('multiselect-container') )
			setDropdownActive(true)
	}



	return (
		<>
			<label>{ label }</label>

			<div 
				className={ style.multiselect }
				onClick={ e => openDropdownOnClickWrapper(e) }>
				<div className={ style['multiselect-container']}>

					<div className={ style['tags'] }>
						{ list.length > 0 && list.map(e => (
							<button 
								type="button" 
								key={ e.id }
								onClick={ () => removeItem(e) }
								className={ style.tag }>
								<span>{ e.name }</span>
								<span className={ style.remove }>&times;</span>
							</button>
						)) }

					</div>

					<div>
						<span 
							className={ style.angle }
							onClick={ () => setDropdownActive(true) }>
							&#9650;
						</span>
					</div>
				</div>

				{ dropdownActive ?
					(<div className={ style.dropdown }>
							<div className={ style['dropdown-list'] }>
								{ options.map(e => (
									<div 
										key={ e.id }
										onClick={ () => addItem(e) }
										className={ 
											[
												style['dropdown-option'],
												value.includes(e.id) ? style['active'] : ''
											].join(' ')
											
										}>
										{ e.name }
									</div>
								))}
							</div>
						</div>) : 
					null}
			</div>

			{ 
				dropdownActive ? 
				(<div 
					onClick={ () => setDropdownActive(false) }
					className={ style.overlap }></div>) :
				null 
			}
		</>
	)
}


export default MultiSelect