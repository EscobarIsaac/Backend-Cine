const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');

const Notificacion = sequelize.define('Notificacion', {
  usuarioId: { type: DataTypes.INTEGER, allowNull: false },
  mensaje:   { type: DataTypes.STRING,  allowNull: false },
  leido:     { type: DataTypes.BOOLEAN, defaultValue: false },
});

module.exports = Notificacion;
