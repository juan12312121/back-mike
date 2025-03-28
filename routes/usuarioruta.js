const express = require("express");
const { login, register, jefeGrupo, checador, jefeCarrera, getJefesGrupo } = require("../controllers/controladorusuario");
const { verifyToken, authorizeRoles } = require("../middleware/authMiddleware");

const router = express.Router();

// Rutas públicas
router.post("/login", login);
router.post("/register", register);

// Rutas protegidas según rol
router.get("/jefe-grupo", verifyToken, authorizeRoles("jefe de grupo"), jefeGrupo);
router.get("/checador", verifyToken, authorizeRoles("checador"), checador);
router.get("/jefe-carrera", verifyToken, authorizeRoles("jefe de carrera"), jefeCarrera);

// Ruta para obtener todos los jefes de grupo
router.get("/jefes-grupo", verifyToken, authorizeRoles("jefe de carrera"), getJefesGrupo);


module.exports = router;
