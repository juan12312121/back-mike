const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Escuela = require("./escuelas"); // Importamos el modelo Escuela para la relación con Facultad

const Facultad = sequelize.define("Facultad", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  escuela_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Escuela,
      key: "id",
    },
  },
}, {
  timestamps: false, // Desactivar timestamps
});

// Definir la relación
Facultad.belongsTo(Escuela, { foreignKey: 'escuela_id' });
Escuela.hasMany(Facultad, { foreignKey: 'escuela_id' });

module.exports = Facultad;
