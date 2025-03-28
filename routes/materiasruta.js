const express = require("express");
const { 
  createMateria, 
  updateMateria, 
  deleteMateria, 
  getAllMaterias, 
  getMateriaById 
} = require("../controllers/controladormateria");
const { verifyToken, authorizeRoles } = require("../middleware/authMiddleware");

const router = express.Router();

// Rutas protegidas para gestionar materias
router.post("/materias", verifyToken, authorizeRoles("jefe de carrera"), createMateria); // Crear materia
router.get("/materias", verifyToken, getAllMaterias); // Obtener todas las materias
router.get("/materias/:id", verifyToken, getMateriaById); // Obtener materia por ID
router.put("/materias/:id", verifyToken, authorizeRoles("jefe de carrera"), updateMateria); // Actualizar materia
router.delete("/materias/:id", verifyToken, authorizeRoles("jefe de carrera"), deleteMateria); // Eliminar materia

module.exports = router;