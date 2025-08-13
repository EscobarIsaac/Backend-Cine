const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');

const Asistencia = sequelize.define('Asistencia', {
  entradaId: { type: DataTypes.INTEGER, allowNull: false },
  fecha:     { type: DataTypes.DATE,   defaultValue: DataTypes.NOW },
  puerta:    { type: DataTypes.STRING,  allowNull: false },
});

module.exports = Asistencia;
// ms-asistencia/src/models/Asistencia.js