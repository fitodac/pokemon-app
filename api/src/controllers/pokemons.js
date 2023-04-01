const axios = require('axios')
const { Op, Sequelize } = require('sequelize')
const { 
	parsePokemon, 
	parseLocalPokemon,
	sortByName,
	sortByAttack 
} = require('../utils/helpers')
const { Pokemon, Type } = require("../db")

const per_page = 12
const total_pokemons = 200
const cache = []


const getPokemons = q => {

	return new Promise(async (resolve, reject) => {

		let page = q.p
		if( !page ) page = 1

		const q_type = q.type
		const q_sort = q.sort
		const q_order = q.order

		let min = 0
		let max = per_page
		let pokemons = []


		/******************************************/
		// LOCAL POKEMONS
		/******************************************/
		const tot_db_pokemons = await Pokemon.count()
		min = page > 1 ? (page - 1) + (page - 1) * per_page : min
		max = (min + per_page)

		const base_min = min
		const base_max = max

		const local_pokemons = await Pokemon.findAll({
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
		
		for(let idx in local_pokemons.reverse()) pokemons.push(parseLocalPokemon(local_pokemons[idx].dataValues))

		// Filter by type
		if( q_type )
			pokemons = pokemons.filter(e => e.types.some(t => t.toLowerCase() === q_type.toLowerCase()))



		/******************************************/
		// API POKEMONS
		/******************************************/
		if( min === 0 ) min = 1
		if( max === per_page ) max++
		if( pokemons.length) max = max - pokemons.length
		
		let pok_id = min
		let limit = tot_db_pokemons

		const getPokemon = async () => {
			if( pokemons.length === per_page ) return
			if( limit === total_pokemons ) return
			limit++

			const cached = cache.find(e => e.id === pok_id)
			let pok = null

			if( cached ){
				pok = cached
			}else{
				const getpok = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pok_id}`).then(r => r.data)
				pok = parsePokemon(getpok)
				cache.push(pok)
			}


			if( q_type ){
				if( pok.types.some(e => e.toLowerCase() === q_type.toLowerCase()) ){
					pokemons.push(pok)
				}
				pok_id++
				await getPokemon()
			}else{
				pokemons.push(pok)
				pok_id++
				await getPokemon()
			}

		}

		await getPokemon()

		if( q_sort && (q_order === 'asc' || q_order === 'desc') ){
			if( 'name' === q_sort ) pokemons = sortByName(pokemons, q_order)
			if( 'attack' === q_sort ) pokemons = sortByAttack(pokemons, q_order)
		}


		resolve({
			total: pokemons.length,
			pages: q_type ?
							Math.round(pokemons.length / per_page) : 
							Math.round((total_pokemons - tot_db_pokemons) / per_page),
			pokemons,
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
												
												return r.data
											})
											.catch(err => {
												reject(new Error(err))
											})
			
			resolve(parsePokemon(pokemon))

		}
	})
}




const getPokemonsBy = name => {
	return new Promise(async (resolve, reject) => {
		const pokemons = []

		// Busca en la DB
		let local_pokemons = await Pokemon.findAll({
			where: {
				name: { [Op.iLike]: `%${name.toLowerCase()}%` }
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


		await axios.get(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`)
			.then(r => {
				pokemons.push(parsePokemon(r.data))
			})
			.catch(err => {
				console.log('err:', err)
			})

		if( pokemons.length ) resolve({ pokemons: pokemons, pages: null })
		else reject()
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



const deletePokemon = id => {
	return new Promise(async (resolve, reject) => {
		if( !id ) throw new Error('Debes proporcionar el Id del Pokémon que quieres eliminar')

		await Pokemon.destroy({
			where: { id }
		})
		.then(() => resolve(`Pokémon eliminado con éxito`))
	})
}





module.exports = {
	getPokemons,
	getPokemonById,
	getPokemonsBy,
	createPokemon,
	deletePokemon
}