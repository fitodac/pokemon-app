const parsePokemon = pokemon => {

	if( !pokemon ) return
	
	return {
		id: pokemon.id,
		name: pokemon.forms[0].name,
		image: pokemon.sprites.other.home.front_default,
		life: pokemon.stats[0].base_stat,
		attack: pokemon.stats[1].base_stat,
		defense: pokemon.stats[2].base_stat,
		speed: pokemon.stats[5].base_stat,
		height: pokemon.height,
		weight: pokemon.weight,
		types: pokemon.types.map((type) => type.type.name),
		createdInDb: pokemon.createdInDb || false
	}

}



const parseLocalPokemon = pokemon => {
	const data = {
		id: pokemon.id,
		name: pokemon.name,
		image: pokemon.image,
		life: pokemon.life,
		attack: pokemon.attack,
		defense: pokemon.defense,
		speed: pokemon.speed,
		height: pokemon.height,
		weight: pokemon.weight,
		types: pokemon.types.map(e => e.name),
		createdInDb: pokemon.createdInDb
	}

	return data
}



const sortByName = (pokemons, order) => {
	pokemons.sort((a,b) => {
		const a_name = a.name.toLowerCase()
		const b_name = b.name.toLowerCase()

		if(a_name > b_name) 
			return 'asc' === order ? 1 : -1
		else if(a_name < b_name) 
			return 'asc' === order ? -1 : 1
		else return 0
	})

	return pokemons
}


const sortByAttack = (pokemons, order) => {
	pokemons.sort((a,b) => {
		if(a.attack > b.attack) 
			return 'asc' === order ? 1 : -1
		else if(a.attack < b.attack) 
			return 'asc' === order ? -1 : 1
		else return 0
	})

	// pokemons.forEach(e => console.log( e.attack ) )
	return pokemons
}



module.exports = {
	parsePokemon,
	parseLocalPokemon,
	sortByName,
	sortByAttack,
}