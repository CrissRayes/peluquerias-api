const {
  createComentario,
  updateComentario,
  getComentarioById,
  destroyComentario,
  comentariosPeluqueria,
  comentariosUsuario,
  getComentarios,
} = require('../models/queries');

const postComentario = async (req, res) => {
  const review = req.body;
  const { peluqueriaId } = req.params;
  const usuarioId = req.user.id;
  const fecha = new Date();

  try {
    await createComentario(fecha, review, usuarioId, peluqueriaId);
    res.status(201).send('Comentario creado');
  } catch (error) {
    console.log(error);
    res.status(500).send('Error al crear el comentario');
  }
};

const putComentario = async (req, res) => {
  const { comentarioId } = req.params;
  const comentarioUpdates = req.body;
  const usuarioId = req.user.id;

  try {
    const comentarioBd = await getComentarioById(comentarioId);

    if (!comentarioBd) {
      return res.status(404).send('Comentario no encontrado');
    }

    if (comentarioBd.usuario_id !== usuarioId) {
      return res
        .status(403)
        .send('No tienes permisos para actualizar este comentario');
    }

    await updateComentario(comentarioId, comentarioUpdates);

    res.status(200).send('Comentario actualizado');
  } catch (error) {
    console.log(error);
    res.status(500).send('Error al actualizar el comentario');
  }
};

const deleteComentario = async (req, res) => {
  const { comentarioId } = req.params;
  const usuarioId = req.user.id;

  try {
    const comentarioBd = await getComentarioById(comentarioId);

    if (!comentarioBd) {
      return res.status(404).send('Comentario no encontrado');
    }

    if (comentarioBd.usuario_id !== usuarioId) {
      return res
        .status(403)
        .send('No tienes permisos para eliminar este comentario');
    }

    await destroyComentario(comentarioId);

    res.status(200).send('Comentario eliminado');
  } catch (error) {
    console.log(error);
    res.status(500).send('Error al eliminar el comentario');
  }
};

const getComentariosPeluqueria = async (req, res) => {
  const { peluqueriaId } = req.params;

  try {
    const comentarios = await comentariosPeluqueria(peluqueriaId);

    res.status(200).json(comentarios);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error al obtener los comentarios');
  }
};

const getComentariosUsuario = async (req, res) => {
  const usuarioId = req.user.id;

  try {
    const comentarios = await comentariosUsuario(usuarioId);

    res.status(200).json(comentarios);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error al obtener los comentarios');
  }
};

const getAllComentarios = async (req, res) => {
  try {
    const comentarios = await getComentarios();

    res.status(200).json(comentarios);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error al obtener los comentarios');
  }
};

module.exports = {
  postComentario,
  putComentario,
  deleteComentario,
  getComentariosPeluqueria,
  getComentariosUsuario,
  getAllComentarios,
};
