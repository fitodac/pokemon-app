import { useState, useEffect } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { pageLoading, getTypes } from '../../store/actions'
import { validate } from '../../utils/validate'
import image_list from '../../utils/images-list'

import Slider from '../../components/Form/Slider'
import MultiSelect from '../../components/Form/MultiSelect'
import style from './Create.module.css'

/**
 * Sliders creados con el método
 * que provee w3schools en 
 * https://www.w3schools.com/howto/howto_js_rangeslider.asp
 */


const CreatePage = () => {

	const dispatch = useDispatch()
	const history = useHistory()
	const [ data, setData ] = useState({
		name: '',
		image: '',
		life: 5,
		attack: 5,
		defense: 5,
		speed: 5,
		height: 1,
		weight: 1,
		types: []
	})
	const { name, image, life, attack, defense, speed, height, weight, types } = data

	const types_list = useSelector(state => state.types)
	const [ errors, setErrors ] = useState({})
	const [ modal_open, setModalOpen ] = useState(false)
	const [ saving, setSaving ] = useState(false)
	const [ thumbnails, setThumbnails ] = useState(image_list)
	const [is_mounted, setIsMounted] = useState(false)


	useEffect(() => {
		if( !is_mounted ){
			dispatch(pageLoading(true))

			const getdata = async () => {
				if( !types_list.length ) await dispatch(getTypes())
				dispatch(pageLoading(false))

				setTimeout(() => dispatch(pageLoading(false)), 1000)
			}
			
			getdata()
			setIsMounted(true)
		}
	}, [dispatch, types_list, is_mounted])



	const handleChange = e => {
		const val = e.target.value
		const key = e.target.name
		const obj = {...data}
		
		obj[key] = val
		
		if( errors[key] ){
			const _errors = {...errors}
			_errors[key].valid = true
			setErrors(_errors)
		}
		
		setData(obj)
	}


	const handleChangeMultiselect = arr => {
		if( errors.types ) errors.types.valid = true
		setData({...data, types: [...arr]})
	}


	const setImage = src => {
		if( errors.image ) errors.image.valid = true

		const obj = {...data}
		obj.image = src
		setData(obj)
		setModalOpen(false)
	}


	const handleRandomValues = () => {
		if( errors.types ) errors.types.valid = true

		const min = Math.floor(Math.random() * 11)
		const max = Math.floor(Math.random() * 10) + 11
		const arr = []
		for( let i = min; i < max; i++ ) arr.push(types_list[i].id)

		const rand = {
			life: (Math.floor(Math.random() * 251) + 5),
			attack: Math.floor(Math.random() * 251) + 5,
			defense: Math.floor(Math.random() * 251) + 5,
			speed: Math.floor(Math.random() * 251) + 5,
			height: Math.floor(Math.random() * 100) + 1,
			weight: Math.floor(Math.random() * 100) + 1,
			types: [...arr]
		}

		setData({...data, ...rand})
	}


	const thumbnailLoaded = (e, idx) => {
		const tmbs = [...thumbnails]
		tmbs[idx].loading = false
		setThumbnails(tmbs)
	}



	const handleSubmit = async e => {
		e.preventDefault()
		setSaving(true)
		setErrors({})
		const _errors = {...validate(data)}
		let valid_form = true

		for( let key in _errors)if( !_errors[key].valid ) valid_form = false
		
		if( valid_form ){
			axios.post(`http://localhost:3001/pokemons`, data)
				.then(resp => {
					dispatch(pageLoading(true))
					history.push('/home')
				})
				.catch(err => {
					console.log(err)
					setSaving(false)
				})

			return
		}

		setErrors(_errors)
		setSaving(false)
	}



	return (
		<div className="page-content">
			<h2 className="page-title">Crea un nuevo Pokemon</h2>

			<form 
				method="post" 
				onSubmit={ handleSubmit }
				className={ saving ? style['form-saving'] : ''}>
				
				<div className={ style['form-wrapper'] }>
					<div className={ style['input-image'] }>
						{
							!image ?
							(<div>
								<button 
									type="button"
									className={ style['add-image'] }
									onClick={ () => setModalOpen(true) }>
									Inluye una imagen para tu Pokémon
								</button>
							</div>) :
							(<div 
								className={ style['img-preview']}
								onClick={ () => setModalOpen(true) }>
								<img src={ image } alt="Pokémon" />
								<span>Cambia la imagen</span>
							</div>)
						}

						<input type="hidden" name="image" value={ image } />
						<br/>
						{ !errors?.image?.valid ? (<div className={ style.error }>{ errors?.image?.msj }</div>) : null }
					</div>





					<div className={ style['form-body'] }>
						<div className={ style['fieldset']}>
							<label className={ style['label-required'] }>nombre</label>
							<input 
								type="text" 
								name="name" 
								autoComplete="off"
								value={ name }
								className={ style['input-lg'] }
								onChange={ handleChange } />
							{ !errors?.name?.valid ? (<div className={ style.error }>{ errors?.name?.msj }</div>) : null }
						</div>


						<div className={ style['fieldset']}>
							<Slider 
								label="Vida"
								name="life"
								range={ [5, 255] }
								value={ life }
								handleChange={ handleChange } />
						</div>

						<div className={ style['fieldset']}>
							<Slider 
								label="Ataque"
								name="attack"
								range={ [5, 255] }
								value={ attack }
								handleChange={ handleChange } />
						</div>

						<div className={ style['fieldset']}>
							<Slider 
								label="Defensa"
								name="defense"
								range={ [5, 255] }
								value={ defense }
								handleChange={ handleChange } />
						</div>
						
						<div className={ style['fieldset']}>
							<Slider 
								label="Velocidad"
								name="speed"
								range={ [5, 255] }
								value={ speed }
								handleChange={ handleChange } />
						</div>
						
						<div className={ style['fieldset']}>
							<Slider 
								label="Altura"
								name="height"
								range={ [1, 100] }
								value={ height }
								handleChange={ handleChange } />
						</div>
						
						<div className={ style['fieldset']}>
							<Slider 
								label="Peso"
								name="weight"
								range={ [1, 100] }
								value={ weight }
								handleChange={ handleChange } />
						</div>


						<div className={ style['fieldset']}>
							<MultiSelect 
								label="Tipo"
								options={ types_list }
								value={ types }
								onChange={ handleChangeMultiselect }
							/>
							
							{ !errors?.types?.valid ? (<div className={ style.error }>{ errors?.types?.msj }</div>) : null }
						</div>

						<div className={ style['btn-group']}>
							<div>
								<button 
									type="button" 
									onClick={ handleRandomValues }
									className={ style['btn-sm'] }>
									Define valores aleatorios
								</button>
							</div>
						
							<div>
								<button className={ style['btn-submit'] }>CREA TU POKÉMON ...y ¡atrapalo ya!</button>
							</div>
						</div>
					
					</div>
				</div>

			</form>


			{ 
				saving ? 
				(<div className={ style.saving }>
					<div>
						<div className={ style.pokeball } />
						<div>Guardando el Pokémon</div>
					</div>
				</div>) : 
				null
			}
			





			{
				modal_open ? 
				(<div className={ style['form-modal']}>
					<div className={ style['form-modal--wrapper'] }>
						<div className={ style['form-modal--header'] }>
							<div className={ style['form-modal--title'] }>Selecciona una imagen</div>
							
							<button 
								type="button"
								onClick={ () => setModalOpen(false) }
								className={ style['form-modal--close'] }>
								&times;
							</button>
						</div>
						
						<div className={ style['form-modal--grid'] }>
							{
								thumbnails.map((e, idx) => (
									<div 
										key={ e.id }
										className={ style['form-modal--cell'] }>
											<div 
												onClick={ () => setImage(e.img) }
												className={ style['form-modal--card'] }>
												

												<img 
													src={ e.thumb } 
													alt="Pokémon thumbnail"
													onLoad={ () => thumbnailLoaded(e, idx) } />

												{ e.loading ? 
													(<div className={ style.pokeball } />): 
													null}
											</div>
									</div>
								))
							}
						</div>
					</div>
				</div>) :
				null
			}
			
		</div>
	)
}


export default CreatePage