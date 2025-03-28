const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Escuela = sequelize.define("Escuela", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  codigo: {
    type: DataTypes.STRING(20),
    unique: true,
  },
}, {
  timestamps: false, // Desactivar timestamps
});

module.exports = Escuela;
