const {
  getPeluqueriaById,
  createPeluquero,
  updatePeluquero,
  destroyPeluquero,
  peluquerosPeluqueria,
  getPeluqueroById,
} = require('../models/queries');

const postPeluquero = async (req, res) => {
  const peluquero = req.body;
  const { peluqueriaId } = req.params;
  const peluqueriaBd = await getPeluqueriaById(peluqueriaId);

  try {
    if (!peluqueriaBd || peluqueriaBd.usuario_id !== req.user.id) {
      return res
        .status(403)
        .send('No tienes permisos para crear este peluquero');
    }

    await createPeluquero(peluquero, peluqueriaId);
    res.status(201).send('Peluquero creado');
  } catch (error) {
    console.log(error);
    res.status(500).send('Error al crear el peluquero');
  }
};

const putPeluquero = async (req, res) => {
  const { peluqueriaId, peluqueroId } = req.params;
  const peluqueroUpdates = req.body;

  try {
    await updatePeluquero(peluqueroId, peluqueroUpdates, peluqueriaId);
    res.status(200).send('Peluquero actualizado');
  } catch (error) {
    console.log(error);
    res.status(500).send('Error al actualizar el peluquero');
  }
};

const deletePeluquero = async (req, res) => {
  const { peluqueriaId, peluqueroId } = req.params;
  const usuarioId = req.user.id;
  const peluqueriaBd = await getPeluqueriaById(peluqueriaId);
  const peluqueroBd = await getPeluqueroById(peluqueroId);

  try {
    if (!peluqueriaBd || peluqueriaBd.usuario_id !== usuarioId) {
      return res
        .status(403)
        .send('No tienes permisos para eliminar este peluquero');
    }

    if (!peluqueroBd || peluqueroBd.peluqueria_id !== peluqueriaId) {
      return res.status(404).send('No existe el peluquero');
    }

    await destroyPeluquero(peluqueroId, peluqueriaId);
    res.status(200).send('Peluquero eliminado');
  } catch (error) {
    console.log(error);
    res.status(500).send('Error al eliminar el peluquero');
  }
};

const getPeluqueros = async (req, res) => {
  const { peluqueriaId } = req.params;

  try {
    const peluqueriaBd = await getPeluqueriaById(peluqueriaId);

    if (!peluqueriaBd) {
      return res.status(404).send('No existe la peluquería');
    }

    const peluqueros = await peluquerosPeluqueria(peluqueriaId);
    res.status(200).json(peluqueros);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error al obtener los peluqueros');
  }
};

module.exports = {
  postPeluquero,
  putPeluquero,
  deletePeluquero,
  getPeluqueros,
};
