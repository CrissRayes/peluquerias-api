const {
  createDisponibilidad,
  updateDisponibilidad,
  destroyDisponibilidad,
  disponibilidadPeluqueria,
} = require('../models/queries');

const postDisponibilidad = async (req, res) => {
  const { peluqueriaId } = req.params;
  const disponibilidad = req.body;

  try {
    await createDisponibilidad(disponibilidad, peluqueriaId);
    res.status(201).send('Disponibilidad creada');
  } catch (error) {
    console.log(error);
    res.status(500).send('Error al crear la disponibilidad');
  }
};

const putDisponibilidad = async (req, res) => {
  const { peluqueriaId, disponibilidadId } = req.params;
  const disponibilidadUpdates = req.body;

  try {
    await updateDisponibilidad(disponibilidadUpdates, disponibilidadId);
    res.status(200).send('Disponibilidad actualizada');
  } catch (error) {
    console.log(error);
    res.status(500).send('Error al actualizar la disponibilidad');
  }
};

const deleteDisponibilidad = async (req, res) => {
  const { disponibilidadId } = req.params;

  try {
    await destroyDisponibilidad(disponibilidadId);
    res.status(200).send('Disponibilidad eliminada');
  } catch (error) {
    console.log(error);
    res.status(500).send('Error al eliminar la disponibilidad');
  }
};

const getDisponibilidadPeluqueria = async (req, res) => {
  const { peluqueriaId } = req.params;

  try {
    const disponibilidad = await disponibilidadPeluqueria(peluqueriaId);
    res.status(200).json(disponibilidad);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error al obtener la disponibilidad');
  }
};

module.exports = {
  postDisponibilidad,
  putDisponibilidad,
  deleteDisponibilidad,
  getDisponibilidadPeluqueria,
};
