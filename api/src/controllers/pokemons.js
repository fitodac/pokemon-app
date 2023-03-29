const axios = require('axios')
const { Op, Sequelize } = require('sequelize')
const { parsePokemon, parseLocalPokemon } = require('../utils/helpers')
const { Pokemon, Type } = require("../db")

const per_page = 12
const total_pokemons = 200


const getPokemons = q => {

	return new Promise(async (resolve, reject) => {

		let page = q.p
		const q_type = q.type
		const q_sort = q.sort
		const q_order = q.order


		if( !page ) page = 1
		const tot_db_pokemons = await Pokemon.count()
		let min = (page - 1) * per_page
		let max = (min + per_page) - tot_db_pokemons
		const pokemons = []


		let local_pokemons = await Pokemon.findAll({
			offset: min,
			limit: max,
			include: { 
				model: Type,
				attributes: ['name'],
				through: {
					attributes: []
				}
			}
		})
		
		for(let idx in local_pokemons.reverse()){
			const char = parseLocalPokemon(local_pokemons[idx].dataValues)
			if( q_type && char.types.includes(q_type.toLowerCase()) ) 
				pokemons.push(char)
			else
				pokemons.push(char)
		}


		if( min === 0 ) min = 1
		if( page > 1 ) min = ( min - tot_db_pokemons ) + 1

		for(let i = min; i <= max; i++){
			const pok = await axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`).then(r => r.data)
			pokemons.push(parsePokemon(pok))
		}

		resolve({
			pokemons: pokemons,
			pages: Math.round((total_pokemons - tot_db_pokemons) / per_page)
		})

	})

}



const getPokemonById = id => {
	return new Promise(async (resolve, reject) => {
		if( !id ) reject("No se ha encontrado el ID")

		const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[8|9|aA|bB][0-9a-f]{3}-[0-9a-f]{12}$/i;
		
		// Busca en la DB
		if( uuidRegex.test(id) ){
			
			const pokemon = await Pokemon.findOne({
				where: { id: id },
				include: { 
					model: Type,
					attributes: ['name'],
					through: {
						attributes: []
					}
				}
			})

			resolve(parseLocalPokemon(pokemon.dataValues))

		// Busca en la api
		}else{
			const pokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
											.then(r => {
												console.log(r.data.sprites)
												return r.data
											})
											.catch(err => {
												reject(new Error(err))
											})
			
			resolve(parsePokemon(pokemon))

		}
	})
}




const getPokemonsBy = by => {
	return new Promise(async (resolve, reject) => {
		const pokemons = []

		if( !isNaN(by) ){
			// Busca por ID

			
		
		}else{
			// Busca por nombre

			// Busca en la DB
			let local_pokemons = await Pokemon.findAll({
				where: {
					name: { [Op.iLike]: `%${by.toLowerCase()}%` }
				},
				include: { 
					model: Type,
					attributes: ['name'],
					through: {
						attributes: []
					}
				}
			})

			for(let idx in local_pokemons.reverse()){
				pokemons.push(parseLocalPokemon(local_pokemons[idx].dataValues))
			}


			await axios.get(`https://pokeapi.co/api/v2/pokemon/${by.toLowerCase()}`)
				.then(r => {
					pokemons.push(parsePokemon(r.data))
				})
				.catch(err => {
					console.log('err:', err)
				})

			if( pokemons.length ) resolve({ pokemons: pokemons, pages: null })
			else reject()
		}

	})
}



const createPokemon = async data => {
	return new Promise(async (resolve, reject) => {
		const { 
			name, 
			image, 
			life, 
			attack, 
			defense, 
			speed, 
			height, 
			weight, 
			types 
		} = data


		let db_types = await Type.findAll({ 
			where: {id: types},
			attributes: ['id']
		})

		db_types = db_types.map(e => e.dataValues.id)

		if( !db_types.length )
			reject(new Error(`Debes agregar tipos de Pokémons antes de crear nuevos Pokémons`))


		const [pokemon, created] = await Pokemon.findOrCreate({
			where: {
				name: { [Op.iLike]: name.toLowerCase() }
			},
			defaults: {
				name,
				image,
				life,
				attack,
				defense,
				speed,
				height,
				weight
			}
		})
		

		if( !created )
			reject(new Error('El Poémon que intentas crear ya existe!'))

		await pokemon.addTypes(db_types)
		resolve(pokemon.dataValues)
	})
}


module.exports = {
	getPokemons,
	getPokemonById,
	getPokemonsBy,
	createPokemon
}