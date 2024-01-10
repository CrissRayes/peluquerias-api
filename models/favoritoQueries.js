const pool = require('./db');

const getFavoritoById = async (usuarioId, favoritoId) => {
  try {
    const sqlQuery =
      'SELECT * FROM favoritos WHERE id = $1 and usuario_id = $2';
    const values = [favoritoId, usuarioId];
    const { rows } = await pool.query(sqlQuery, values);
    return rows[0];
  } catch (error) {
    console.log(error);
  }
};

const getFavoritosByUsuarioId = async (usuarioId) => {
  try {
    const sqlQuery =
      'SELECT * FROM favoritos INNER JOIN peluquerias ON favoritos.peluqueria_id = peluquerias.id WHERE favoritos.usuario_id = $1';
    const values = [usuarioId];
    const { rows } = await pool.query(sqlQuery, values);
    return rows;
  } catch (error) {
    console.log(error);
  }
};

const createFavorito = async (peluqueriaId, usuarioId) => {
  console.log('peluqueria id: ', peluqueriaId);
  console.log('usuario id: ', usuarioId);
  try {
    const sqlQuery = 'INSERT INTO favoritos VALUES (DEFAULT, $1, $2)';
    const values = [peluqueriaId, usuarioId];
    await pool.query(sqlQuery, values);
    console.log('Favorito creado');
  } catch (error) {
    console.log(error);
  }
};

const destroyFavorito = async (peluqueriaId, usuarioId) => {
  console.log('peluqueria id: ', peluqueriaId);
  console.log('usuario id: ', usuarioId);
  try {
    const sqlQuery =
      'DELETE FROM favoritos WHERE usuario_id = $1 and peluqueria_id = $2';
    const values = [usuarioId, peluqueriaId];
    await pool.query(sqlQuery, values);
    console.log('Favorito eliminado');
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getFavoritoById,
  getFavoritosByUsuarioId,
  createFavorito,
  destroyFavorito,
};
