const axios = require('axios')
const { Op, Sequelize } = require('sequelize')
const { parsePokemon } = require('../utils/helpers')
const { Pokemon, Type } = require("../db")


const getPokemons = () => {
	return new Promise(async (resolve, reject) => {
		const total = 5,
					pokemons = []

		for(let i = 1; i < total; i++){
			const pok = await axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`).then(r => r.data)
			pokemons.push(parsePokemon(pok))
		}

		resolve(pokemons)

	})
}



const getPokemon = by => {
	return new Promise(async (resolve, reject) => {
		if( !isNaN(by) ){
			// Busca por ID
			const pokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon/${by}`)
											.then(r => r.data)
											.catch(err => new Error(err))
			resolve(parsePokemon(pokemon))
		
		}else{
			// Busca por nombre
			const pokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon/${by.toLowerCase()}`)
											.then(r => r.data)
											.catch(err => new Error(err))
			resolve(parsePokemon(pokemon))
		}

	})
}



const createPokemon = async data => {
	return new Promise(async (resolve, reject) => {
		const { 
			name, 
			image, 
			hp, 
			attack, 
			defense, 
			speed, 
			height, 
			weight, 
			types 
		} = data


		let db_types = await Type.findAll({ 
			where: {name: types},
			attributes: ['id']
		})

		db_types = db_types.map(e => e.dataValues.id)

		if( !db_types.length )
			reject(new Error(`Debes agregar tipos de Pokèmons antes de crear nuevos Pokèmons`))


		const [pokemon, created] = await Pokemon.findOrCreate({
			where: {
				name: { [Op.iLike]: name.toLowerCase() }
			},
			defaults: {
				name,
				image,
				hp,
				attack,
				defense,
				speed,
				height,
				weight
			}
		})
		

		if( !created )
			reject(new Error('El Pokèmon que intentas crear ya existe!'))

		await pokemon.addTypes(db_types)
		resolve(pokemon.dataValues)
	})
}


module.exports = {
	getPokemons,
	getPokemon,
	createPokemon
}