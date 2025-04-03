const express = require("express");
const {
  login,
  register,
  jefeGrupo,
  checador,
  jefeCarrera,
  getJefesGrupo,
  getChecadores,
  updateUser,
  deleteUser
} = require("../controllers/controladorusuario");
const { verifyToken, authorizeRoles } = require("../middleware/authMiddleware");

const router = express.Router();

// Rutas públicas
router.post("/login", login);
router.post("/register", register);

// Rutas protegidas según rol
router.get("/jefe-grupo", verifyToken, authorizeRoles("jefe de grupo"), jefeGrupo);
router.get("/checador", verifyToken, authorizeRoles("checador"), checador);
router.get("/jefe-carrera", verifyToken, authorizeRoles("jefe de carrera"), jefeCarrera);

// Rutas para obtener todos los jefes de grupo y checadores
router.get("/jefes-grupo", verifyToken, authorizeRoles("jefe de carrera"), getJefesGrupo);
router.get("/checadores", verifyToken, authorizeRoles("jefe de carrera"), getChecadores);

// Rutas para actualizar y eliminar usuarios - solo accesibles por "jefe de carrera"
router.put("/usuarios/:id", verifyToken, authorizeRoles("jefe de carrera"), updateUser);
router.delete("/usuarios/:id", verifyToken, authorizeRoles("jefe de carrera"), deleteUser);

module.exports = router;

