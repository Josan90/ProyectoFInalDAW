// usuarioModel.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Usuario = sequelize.define('Usuario', {
  nombreUsuario: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  emailUsuario: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  claveUsuario: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Usuario;
