const sortByName = (pokemons, order) => {
	const resp = [...pokemons]
	resp.sort((a,b) => {
		const a_name = a.name.toLowerCase()
		const b_name = b.name.toLowerCase()

		if(a_name > b_name) 
			return 'asc' === order ? 1 : -1
		else if(a_name < b_name) 
			return 'asc' === order ? -1 : 1
		else return 0
	})

	return resp
}


const sortByAttack = (pokemons, order) => {
	const resp = [...pokemons]
	resp.sort((a,b) => {
		if(a.attack > b.attack) 
			return 'asc' === order ? 1 : -1
		else if(a.attack < b.attack) 
			return 'asc' === order ? -1 : 1
		else return 0
	})

	// pokemons.forEach(e => console.log( e.attack ) )
	return resp
}


export {
	sortByName,
	sortByAttack
}