const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const {
	getPokemons,
	getPokemon,
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
	// Get Pokèmon by name
	if( req.query.name ){
		try {
			const pokemon = await getPokemon(req.query.name)
			success(req, res, pokemon, 200, 'Se obtuvieron todos los pokemones')
		} catch (err) {
			error(req, res, {error: err.message}, 404)
		}

		return
	}
	

	// Get a list of Pokèmons 
	try {
		const pokemons = await getPokemons()
		res.status(200).json(pokemons)
	} catch (err) {
		error(req, res, {error: err.message}, 404)
	}
})


// Get Pokèmon by ID
router.get('/pokemons/:s', async (req, res) => {
	try {
		const pokemon = await getPokemon(req.params.s)
		res.status(200).json(pokemon)
	} catch (err) {
		error(req, res, {error: err.message}, 404)
	}
})


router.post('/pokemons', async (req, res) => {
	try	{
		const pokemon = await createPokemon(req.body)
		console.log('pokemon', pokemon)
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