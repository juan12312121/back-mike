const Materia = require("../models/materias"); // Importamos el modelo Materia



const getAllMaterias = async (req, res) => {
  try {
    const materias = await Materia.findAll();
    
    return res.status(200).json(materias);
  } catch (error) {
    console.error("Error al obtener materias:", error);
    return res.status(500).json({ message: "Error al obtener materias", error });
  }
};

// Obtener una materia por ID
const getMateriaById = async (req, res) => {
  try {
    const { id } = req.params;

    // Buscar la materia por su ID
    const materia = await Materia.findByPk(id);

    // Verificar si la materia existe
    if (!materia) {
      return res.status(404).json({ message: "Materia no encontrada" });
    }

    return res.status(200).json(materia);
  } catch (error) {
    console.error("Error al obtener la materia:", error);
    return res.status(500).json({ message: "Error al obtener la materia", error });
  }
};


// Insertar una nueva materia
const createMateria = async (req, res) => {
  try {
    const { nombre, codigo, carrera_id } = req.body;

    if (!nombre || !codigo || !carrera_id) {
      return res.status(400).json({ message: "Faltan datos requeridos" });
    }

    // Crear la nueva materia
    const nuevaMateria = await Materia.create({
      nombre,
      codigo,
      carrera_id,
    });

    // Log para confirmar que la materia se está creando
    console.log("Materia creada:", nuevaMateria);

    return res.status(201).json({ message: "Materia creada", nuevaMateria });
  } catch (error) {
    console.error("Error al crear la materia:", error);
    return res.status(500).json({ message: "Error al crear la materia", error });
  }
};

// Actualizar la información de una materia
const updateMateria = async (req, res) => {
  try {
    const { id } = req.params; // Obtener ID de la materia desde los parámetros
    const { nombre, codigo, carrera_id } = req.body;

    // Verificar si la materia existe
    const materia = await Materia.findByPk(id);
    if (!materia) {
      return res.status(404).json({ message: "Materia no encontrada" });
    }

    // Actualizar los campos si son proporcionados
    materia.nombre = nombre || materia.nombre;
    materia.codigo = codigo || materia.codigo;
    materia.carrera_id = carrera_id || materia.carrera_id;

    await materia.save(); // Guardar los cambios

    return res.status(200).json({ message: "Materia actualizada", materia });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al actualizar la materia", error });
  }
};

// Eliminar una materia
const deleteMateria = async (req, res) => {
  try {
    const { id } = req.params; // Obtener ID de la materia desde los parámetros

    // Verificar si la materia existe
    const materia = await Materia.findByPk(id);
    if (!materia) {
      return res.status(404).json({ message: "Materia no encontrada" });
    }

    await materia.destroy(); // Eliminar la materia
    return res.status(200).json({ message: "Materia eliminada" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al eliminar la materia", error });
  }
};



module.exports = {
  createMateria,
  updateMateria,
  deleteMateria,
  getAllMaterias,
  getMateriaById
};
