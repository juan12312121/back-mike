// app.js o server.js (el archivo principal de tu servidor)
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sequelize = require("./config/db"); // Conexión a la base de datos
const authRoutes = require("./routes/usuarioruta");
const materiaRoutes = require("./routes/materiasruta");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use("/api/auth", authRoutes);
app.use("/api", materiaRoutes);

// Sincronizar la base de datos y luego iniciar el servidor
sequelize.sync({ force: false }).then(() => {
  console.log("Tablas sincronizadas");
  app.listen(PORT, () => console.log(`Servidor conectado en el puerto: ${PORT}`));
}).catch(error => {
  console.error("Error al sincronizar:", error);
});
