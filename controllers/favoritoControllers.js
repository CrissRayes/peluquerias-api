const {
  createFavorito,
  destroyFavorito,
  getFavoritosByUsuarioId,
} = require('../models/favoritoQueries');

const postFavorito = async (req, res) => {
  const { peluqueriaId } = req.params;
  const usuarioId = req.user.id;

  try {
    await createFavorito(peluqueriaId, usuarioId);
    res.status(201).send('Favorito creado');
  } catch (error) {
    console.log(error);
    res.status(500).send('Error al crear el favorito');
  }
};

const deleteFavorito = async (req, res) => {
  const usuarioId = req.user.id;
  const { peluqueriaId } = req.params;

  try {
    await destroyFavorito(peluqueriaId, usuarioId);
    res.status(200).send('Favorito eliminado');
  } catch (error) {
    console.log(error);
    res.status(500).send('Error al eliminar el favorito');
  }
};

const getFavoritosUsuario = async (req, res) => {
  const usuarioId = req.user.id;

  try {
    const favoritos = await getFavoritosByUsuarioId(usuarioId);
    res.status(200).json(favoritos);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error al obtener los favoritos');
  }
};

module.exports = {
  postFavorito,
  deleteFavorito,
  getFavoritosUsuario,
};
