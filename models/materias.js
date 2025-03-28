const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Carrera = require("./carrera"); // Importamos el modelo Carrera para la relación

const Materia = sequelize.define("Materia", {
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
  carrera_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Carrera,
      key: "id",
    },
  },
}, {
  timestamps: false, // Desactivar timestamps
});

module.exports = Materia;
