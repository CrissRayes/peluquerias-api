const {
  allPeluquerias,
  peluqueriasUsuario,
  getPeluqueriaById,
  createPeluqueria,
  updatePeluqueria,
  destroyPeluqueria,
} = require('../models/queries');

const getPeluquerias = async (req, res) => {
  try {
    const peluquerias = await allPeluquerias();
    res.json(peluquerias);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error al obtener las peluquerias');
  }
};

const getPeluqueriasUsuario = async (req, res) => {
  try {
    const usuarioId = req.user.id;
    const peluquerias = await peluqueriasUsuario(usuarioId);
    res.json(peluquerias);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error al obtener las peluquerias');
  }
};

const getPeluqueria = async (req, res) => {
  try {
    const { peluqueriaId } = req.params;
    const peluqueria = await getPeluqueriaById(peluqueriaId);

    if (!peluqueria) {
      return res.status(404).send('Peluqueria no encontrada');
    }

    res.json(peluqueria);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error al obtener la peluqueria');
  }
};

const postPeluqueria = async (req, res) => {
  try {
    const peluqueria = req.body;
    const usuarioId = req.user.id;

    const nuevaPeluqueria = await createPeluqueria(peluqueria, usuarioId);
    // Esperar a que la peluqueria este disponible antes de devolverla
    const peluqueriaCreada = await getPeluqueriaById(nuevaPeluqueria.id);
    res.status(201).json(peluqueriaCreada);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error al crear la peluqueria');
  }
};

const putPeluqueria = async (req, res) => {
  try {
    const { peluqueriaId } = req.params;
    const peluqueriaUpdates = req.body;
    const usuarioId = req.user.id;

    const peluqueriaBd = await getPeluqueriaById(peluqueriaId);

    if (!peluqueriaBd) {
      return res.status(404).send('Peluqueria no encontrada');
    }

    await updatePeluqueria(peluqueriaId, peluqueriaUpdates, usuarioId);

    res.status(200).send('Peluqueria actualizada');
  } catch (error) {
    console.log(error);
    res.status(500).send('Error al actualizar la peluqueria');
  }
};

const deletePeluqueria = async (req, res) => {
  try {
    const { peluqueriaId } = req.params;
    const usuarioId = req.user.id;

    const peluqueriaBd = await getPeluqueriaById(peluqueriaId);

    if (!peluqueriaBd) {
      return res.status(404).send('Peluqueria no encontrada');
    }

    await destroyPeluqueria(peluqueriaId, usuarioId);

    res.status(200).send('Peluqueria eliminada');
  } catch (error) {
    console.log(error);
    res.status(500).send('Error al eliminar la peluqueria');
  }
};

module.exports = {
  getPeluquerias,
  getPeluqueria,
  getPeluqueriasUsuario,
  postPeluqueria,
  putPeluqueria,
  deletePeluqueria,
};
