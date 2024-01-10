const {
  getPeluqueriaById,
  createServicio,
  updateServicio,
  destroyServicio,
  serviciosPeluqueria,
  servicioById,
} = require('../models/queries');

const postServicio = async (req, res) => {
  try {
    const servicio = req.body;
    const { peluqueriaId } = req.params;
    const peluqueriaBd = await getPeluqueriaById(peluqueriaId);

    if (!peluqueriaId) {
      throw new Error('Id de peluquería no definido');
    }

    if (peluqueriaBd === undefined) {
      throw new Error('Peluquería no encontrada');
    }

    if (!peluqueriaBd || peluqueriaBd.usuario_id !== req.user.id) {
      return res
        .status(403)
        .send('No tienes permisos para crear este servicio');
    }

    if (!servicio.nombre || !servicio.precio || !servicio.descripcion) {
      return res.status(400).send('Faltan datos');
    }

    await createServicio(servicio, peluqueriaId);
    res.status(201).json(servicio);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error al crear el servicio');
  }
};

const putServicio = async (req, res) => {
  try {
    const { servicioId } = req.params;
    const servicioUpdates = req.body;

    await updateServicio(servicioId, servicioUpdates);
    res.status(200).send('Servicio actualizado');
  } catch (error) {
    console.log(error);
    res.status(500).send('Error al actualizar el servicio');
  }
};

const deleteServicio = async (req, res) => {
  try {
    const { peluqueriaId, servicioId } = req.params;

    await destroyServicio(servicioId, peluqueriaId);
    res.status(200).send('Servicio eliminado');
  } catch (error) {
    console.log(error);
    res.status(500).send('Error al eliminar el servicio');
  }
};

const getServicios = async (req, res) => {
  try {
    const { peluqueriaId } = req.params;

    const peluqueriaBd = await getPeluqueriaById(peluqueriaId);

    if (!peluqueriaBd) {
      return res.status(404).send('Peluquería no encontrada');
    }

    const servicios = await serviciosPeluqueria(peluqueriaId);
    res.status(200).json(servicios);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error al obtener los servicios');
  }
};

const getServicioById = async (req, res) => {
  try {
    const { servicioId } = req.params;

    const servicio = await servicioById(servicioId);

    if (!servicio) {
      return res.status(404).send('Servicio no encontrado');
    }

    res.status(200).json(servicio);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error al obtener el servicio');
  }
};

module.exports = {
  postServicio,
  putServicio,
  deleteServicio,
  getServicios,
  getServicioById,
};
