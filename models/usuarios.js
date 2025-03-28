const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("checador", "jefe de grupo", "jefe de carrera"),
      allowNull: false,
    },
    carrera: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    grupo: {
      type: DataTypes.STRING,
      allowNull: false,  // Si lo deseas opcional, cambia a true
    },
  },
  {
    timestamps: false, // Desactivar los timestamps
  }
);

module.exports = User;
