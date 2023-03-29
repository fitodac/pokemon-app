const { DataTypes } = require('sequelize')
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			allowNull: false,
			primaryKey: true
		},
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
		life: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: 5
		},
		attack: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: 5
		},
		defense: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: 5
		},
		speed: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: 5
		},
		height: {
			type: DataTypes.FLOAT,
			allowNull: false,
			defaultValue: 1
		},
		weight: {
			type: DataTypes.FLOAT,
			allowNull: false,
			defaultValue: 1
		},
		createdInDb: {
			type: DataTypes.BOOLEAN,
			allowNull: true,
			defaultValue: true
		}
  })
}
