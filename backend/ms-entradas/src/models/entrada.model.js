const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');

const Entrada = sequelize.define('Entrada', {
  usuarioId: { type: DataTypes.INTEGER, allowNull: false },
  eventoId:  { type: DataTypes.INTEGER, allowNull: false },
  asiento:   { type: DataTypes.STRING,  allowNull: false },
  precio:    { type: DataTypes.FLOAT,   allowNull: false },
  qrCode:    { type: DataTypes.STRING,  allowNull: false },
});

module.exports = Entrada;
// ms-entradas/src/models/Entrada.js