const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const {
	getPokemons,
	getPokemonById,
	getPokemonsBy,
	createPokemon
} = require('../controllers/pokemons')

const {
	getTypes
} = require('../controllers/types')

const {
	success,
	error
} = require('./responses')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/', (req, res) => {
	res.send('Pokemon APP')
})


router.get('/pokemons', async (req, res) => {
	// Get Pokémon by name
	if( req.query.name ){
		try {
			const pokemon = await getPokemonsBy(req.query.name)
			success(req, res, pokemon, 200, "La búsqueda se realizó con éxito")
		} catch (err) {
			error(req, res, {message: "Tu búsqueda no produjo ningún resultado"}, 404, err)
		}

		return
	}

	// Paginate
	else if( req.query ){
		try {
			const pokemons = await getPokemons(req.query)
			success(req, res, pokemons, 200, "Se obtuvieron todos los Pokémons")
		} catch (err) {
			error(req, res, {error: err.message}, 404)
		}
		return
	}



	// if( req.query.name ){
	// 	try {
	// 		const pokemon = await getPokemonsBy(req.query.name)
	// 		success(req, res, pokemon, 200, "La búsqueda se realizó con éxito")
	// 	} catch (err) {
	// 		error(req, res, {message: "Tu búsqueda no produjo ningún resultado"}, 404, err)
	// 	}

	// 	return
	// }
	

	// Get a list of Pokémons 
	try {
		const pokemons = await getPokemons()
		success(req, res, pokemons, 200, "Se obtuvieron todos los Pokémons")
	} catch (err) {
		error(req, res, {error: err.message}, 404)
	}
})



// Get Pokémon by ID
router.get('/pokemons/:id', async (req, res) => {
	try {
		const pokemon = await getPokemonById(req.params.id)
		res.status(200).json(pokemon)
	} catch (err) {
		error(req, res, {error: err}, 404)
	}
})


router.post('/pokemons', async (req, res) => {
	try	{
		const pokemon = await createPokemon(req.body)
		res.status(201).json(pokemon)
	} catch (err) {
		error(req, res, {error: err.message}, 401)
	}
	
})


router.get('/types', async (req, res) => {
	try {
		const types = await getTypes()
		res.status(200).json(types)
	} catch (err) {
		error(req, res, {error: err.message}, 404)
	}
})



module.exports = router