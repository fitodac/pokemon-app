const parsePokemon = pokemon => {

	if( !pokemon ) return
	
	return {
		id: pokemon.id,
		name: pokemon.forms[0].name,
		image: pokemon.sprites.other["official-artwork"].front_default,
		hp: pokemon.stats[0].base_stat,
		attack: pokemon.stats[1].base_stat,
		defense: pokemon.stats[2].base_stat,
		speed: pokemon.stats[5].base_stat,
		height: pokemon.height,
		weight: pokemon.weight,
		types: pokemon.types.map((type) => type.type.name),
	}

}


module.exports = {
	parsePokemon
}