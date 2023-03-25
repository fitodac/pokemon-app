const axios = require('axios')
const { Type } = require("../db")

const getTypes = () => {
	return new Promise(async (resolve, reject) => {

		let types = await Type.findAndCountAll()

		if( types.count ){
			types = types.rows.map(e => {
								const { id, name, createdInDb } = e.dataValues
								return { id, name, createdInDb }
							})
		}else{
			types = await axios.get('https://pokeapi.co/api/v2/type').then(resp => resp.data)
			types.results.forEach(e => Type.findOrCreate({ where: { name: e.name }}))
		}
		
		resolve(types)
	})
}



module.exports = {
	getTypes
}