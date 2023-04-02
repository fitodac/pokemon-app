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
			const get_types = await axios.get('https://pokeapi.co/api/v2/type').then(resp => resp.data.results)
			if('unknow' !== e.name){
				get_types.forEach(e => Type.findOrCreate({ where: { name: e.name }}))
				types = await Type.findAll({ attributes: ['id', 'name', 'createdInDb']})
			}
		}
		
		resolve(types)
	})
}



module.exports = {
	getTypes
}