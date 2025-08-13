const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');

const Pelicula = sequelize.define(
  'Pelicula',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    titulo: { type: DataTypes.STRING, allowNull: false },
    genero: { type: DataTypes.STRING, allowNull: false },
    duracion: { type: DataTypes.INTEGER, allowNull: false },
    clasificacion: { type: DataTypes.STRING, allowNull: false }
  },
  {
    tableName: 'peliculas',
    timestamps: false
  }
);

module.exports = Pelicula;
