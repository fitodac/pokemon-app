const { DataTypes } = require('sequelize')
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
		name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		image: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				isUrl: true,
			},
		},
		hp: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: 100
		},
		attack: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: 10
		},
		defense: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: 10
		},
		speed: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: 10
		},
		height: {
			type: DataTypes.FLOAT,
			allowNull: false,
			defaultValue: 0.5
		},
		weight: {
			type: DataTypes.FLOAT,
			allowNull: false,
			defaultValue: 5
		},
		createdInDb: {
			type: DataTypes.BOOLEAN,
			allowNull: true,
			defaultValue: true
		}
  })
}
