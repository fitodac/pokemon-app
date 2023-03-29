const validate = form => {

	/*
	const errors = {
		name: 		{valid: false, msj: '', type: 'string', name: 'El nombre', article: 'o'},
		image: 		{valid: false, msj: '', type: 'string', name: 'La imagen', article: 'a'},
		type: 		{valid: false, msj: '', type: 'string', name: 'El tipo', article: 'o'},
	}

	for(let key in errors){
		let err = errors[key]

		if( ['string', 'number'].includes(err.type) && !form[key].toString().length ){
			err.valid = false
			err.msj = `${err.name} no puede estar vaci${err.article}`
		}
		else{
			err.valid = true
		}
	}
	*/

	const errors = {
		name: { valid: true, msj: '' },
		image: { valid: true, msj: '' },
		types: { valid: true, msj: '' },
	}

	const { name, image, types } = errors


	if( !form.name.length ){
		name.valid = false
		name.msj = "El nombre no puede estar vacío"
	}
	
	if( /\d/.test(form.name) ){
		name.valid = false
		name.msj = "El nombre no puede contener números"
	}


	if( !form.image.length ){
		image.valid = false
		image.msj = "Debes agregar una imagen para tu Pokémon"
	}

	if( !form.types.length ){
		types.valid = false
		types.msj = "Debes incluír al menos un tipo para este Pokémon"
	}

	return errors
}



export {
	validate
}