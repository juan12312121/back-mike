const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Facultad = require("./facultades"); // Importamos el modelo Facultad
const User = require("./usuarios"); // Importamos el modelo User para la relación con el jefe de carrera

const Carrera = sequelize.define("Carrera", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  facultad_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Facultad,
      key: "id",
    },
  },
  jefe_de_carrera_id: {
    type: DataTypes.INTEGER,  // Cambiar a INTEGER
    references: {
      model: User,
      key: "id",
    },
  },
  
}, {
  timestamps: false, // Desactivar timestamps
});

module.exports = Carrera;
