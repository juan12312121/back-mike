const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/usuarios");

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    const token = jwt.sign(
      { 
        id: user.id, 
        name: user.name, 
        role: user.role, 
        carrera: user.carrera, 
        grupo: user.grupo 
      },
      process.env.JWT_SECRET,
      { expiresIn: "8h" }
    );

    // Definir la URL de redirección dependiendo del rol del usuario
    let redirectUrl = "";
    switch (user.role) {
      case "jefe de grupo":
        redirectUrl = "/jefe-grupo";
        break;
      case "checador":
        redirectUrl = "/checador";
        break;
      case "jefe de carrera":
        redirectUrl = "/jefe-carrera";
        break;
      default:
        return res.status(403).json({ message: "Rol no reconocido" });
    }

    res.json({ token, role: user.role, carrera: user.carrera, grupo: user.grupo, redirectUrl });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

exports.register = async (req, res) => {
  try {
    // Se agrega 'grupo' al destructurar el body
    const { name, email, password, role, carrera, grupo } = req.body;

    // Verificar si ya existe un usuario con ese email
    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      return res.status(400).json({ message: "El usuario ya existe" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ 
      name, 
      email, 
      password: hashedPassword, 
      role, 
      carrera, 
      grupo 
    });

    res.status(201).json({ message: "Usuario creado", user: newUser });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear el usuario" });
  }
};

exports.getJefesGrupo = async (req, res) => {
  try {
    const jefesGrupo = await User.findAll({ where: { role: "jefe de grupo" } });

    if (jefesGrupo.length === 0) {
      return res.status(404).json({ message: "No hay jefes de grupo registrados" });
    }

    res.status(200).json(jefesGrupo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener los jefes de grupo" });
  }
};

exports.getChecadores = async (req, res) => {
  try {
    const checadores = await User.findAll({ where: { role: "checador" } });

    if (checadores.length === 0) {
      return res.status(404).json({ message: "No hay checadores registrados" });
    }

    res.status(200).json(checadores);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener los checadores" });
  }
};


// Actualizar un usuario
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, carrera, grupo, role } = req.body;

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Actualizar los campos permitidos
    user.name = name || user.name;
    user.email = email || user.email;
    user.carrera = carrera || user.carrera;
    user.grupo = grupo || user.grupo;
    user.role = role || user.role;

    await user.save();

    res.status(200).json({ message: "Usuario actualizado", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar el usuario" });
  }
};

// Eliminar un usuario
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    await user.destroy();

    res.status(200).json({ message: "Usuario eliminado" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al eliminar el usuario" });
  }
};


// Rutas específicas por rol
exports.jefeGrupo = (req, res) => {
  res.send("Vista Jefe de Grupo");
};

exports.checador = (req, res) => {
  res.send("Vista Checador");
};

exports.jefeCarrera = (req, res) => {
  res.send("Vista Jefe de Carrera");
};
