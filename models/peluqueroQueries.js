const pool = require('./db');

const getPeluqueroById = async (peluqueroId) => {
  const sqlQuery = 'SELECT * FROM peluqueros WHERE id = $1';
  const values = [peluqueroId];
  const { rows } = await pool.query(sqlQuery, values);
  return rows[0];
};

const createPeluquero = async (peluquero, peluqueriaId) => {
  const { nombre, apellidos, telefono, email } = peluquero;
  const sqlQuery =
    'INSERT INTO peluqueros VALUES (DEFAULT, $1, $2, $3, $4, $5)';
  const values = [peluqueriaId, nombre, apellidos, telefono, email];
  await pool.query(sqlQuery, values);
  console.log('Peluquero creado');
};

const updatePeluquero = async (peluqueroId, peluqueroUpdates, peluqueriaId) => {
  const { nombre, apellidos, telefono, email } = peluqueroUpdates;
  const sqlQuery =
    'UPDATE peluqueros SET nombre = $1, apellidos = $2, telefono = $3, email = $4 WHERE id = $5 AND peluqueria_id = $6';
  const values = [
    nombre,
    apellidos,
    telefono,
    email,
    peluqueroId,
    peluqueriaId,
  ];
  await pool.query(sqlQuery, values);
  console.log('Peluquero actualizado');
};

const destroyPeluquero = async (peluqueroId, peluqueriaId) => {
  const sqlQuery =
    'DELETE FROM peluqueros WHERE id = $1 AND peluqueria_id = $2';
  const values = [peluqueroId, peluqueriaId];
  await pool.query(sqlQuery, values);
  console.log('Peluquero eliminado');
};

const peluquerosPeluqueria = async (peluqueriaId) => {
  const sqlQuery = 'SELECT * FROM peluqueros WHERE peluqueria_id = $1';
  const values = [peluqueriaId];
  const { rows } = await pool.query(sqlQuery, values);
  return rows;
};

module.exports = {
  getPeluqueroById,
  createPeluquero,
  updatePeluquero,
  destroyPeluquero,
  peluquerosPeluqueria,
};
