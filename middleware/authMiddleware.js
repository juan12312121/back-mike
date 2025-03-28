const jwt = require("jsonwebtoken");

// Middleware para verificar el token JWT
exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "No se proporcionó token." });
  }

  // Se espera el formato: 'Bearer TOKEN'
  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Formato de token inválido." });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Token inválido." });
    }
    // Almacena la información del usuario en la petición (ej: id y role)
    req.user = decoded;
    next();
  });
};

// Middleware para autorizar según rol
// Recibe uno o varios roles permitidos y verifica si el rol del usuario está incluido
exports.authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "Usuario no autenticado." });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: "Acceso denegado: rol no permitido." });
    }

    next();
  };
};
