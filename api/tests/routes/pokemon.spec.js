/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai')
const session = require('supertest-session')
const app = require('../../src/app.js')
const { Pokemon, conn } = require('../../src/db.js')

const agent = session(app)


describe(`
**********************************
Pokémon: Test de rutas
**********************************
`, () => {
	before(() => conn.authenticate()
  .catch((err) => {
    console.error('No se ha podido conectar a la DB:', err)
  }))


	describe('GET /pokemons', () => {
		it('Debería traer 12 pokémons para la primar página', done => {
			agent.get('/pokemons')
				.set('Accept', 'application/json')
				.expect('Content-Type', /json/)
				.expect(200)
				.end((err, res) => {
					expect(res.body.body.pokemons.length).to.eql(12)
					done();
				});
		});
	})

	describe('GET /pokemons?name=pikachu', () => {
		it('Debe traer la información de un Pokémon por su nombre exacto', done => {
			agent.get('/pokemons?name=pikachu')
				.set('Accept', 'application/json')
				.expect('Content-Type', /json/)
				.expect(200)
				.end((err, res) => {
					expect(res.body.body.pokemons[0].id).to.eql(25)
					expect(res.body.body.pokemons[0].name).to.eql('pikachu')
					expect(res.body.body.pokemons[0].life).to.eql(35)
					expect(res.body.body.pokemons[0].createdInDb).to.eql(false)
					done();
				});
		});
	})


	describe('GET /pokemons/:id', () => {
		it('Debe traer la información de un pokemon por su ID', done => {
			agent.get('/pokemons/4')
				.set('Accept', 'application/json')
				.expect('Content-Type', /json/)
				.expect(200)
				.end((err, res) => {
					expect(res.body.name).to.eql('charmander')
					expect(res.body.life).to.eql(39)
					expect(res.body.types[0]).to.eql('fire')
					done();
				});
		});
	})
})
