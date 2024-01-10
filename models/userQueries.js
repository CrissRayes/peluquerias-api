const bcrypt = require('bcryptjs');
const pool = require('./db');

const checkEmail = async (email) => {
  try {
    const sqlQuery = 'SELECT * FROM usuarios WHERE email = $1';
    const values = [email];
    const { rows } = await pool.query(sqlQuery, values);
    return rows.length > 0;
  } catch (error) {
    console.log(error);
  }
};

const checkCredentials = async (email, clave) => {
  const sqlQuery = 'SELECT * FROM usuarios WHERE email = $1';
  const values = [email];
  try {
    const { rows } = await pool.query(sqlQuery, values);
    if (rows.length === 0) {
      throw new Error('El usuario no existe');
    }
    if (!clave) {
      throw new Error('Falta la clave');
    }

    const usuario = rows[0];
    const isValid = bcrypt.compareSync(clave, usuario.clave);

    if (!isValid) {
      throw new Error('La clave no es correcta');
    }
    const usuarioPayload = {
      id: usuario.id,
      email: usuario.email,
      nombre: usuario.nombre,
      imagen: usuario.url_img,
    };

    return usuarioPayload;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const createUsuario = async (usuario) => {
  try {
    const { email, nombre, apellidos, telefono, clave, url_img } = usuario;
    const hashedClave = bcrypt.hashSync(clave);
    const sqlQuery =
      'INSERT INTO usuarios VALUES ( DEFAULT, $1, $2, $3, $4, $5, $6)';
    const values = [email, nombre, apellidos, telefono, hashedClave, url_img];
    await pool.query(sqlQuery, values);
    console.log('Usuario creado');
  } catch (error) {
    console.log(error);
  }
};

const userInfo = async (id) => {
  try {
    const sqlQuery =
      'SELECT id, email, nombre, apellidos, telefono, url_img FROM usuarios WHERE id = $1';
    const values = [id];
    const { rows } = await pool.query(sqlQuery, values);
    return rows[0];
  } catch (error) {
    console.log(error);
  }
};

const updateUsuario = async (usuario) => {
  try {
    const { nombre, apellidos, telefono, url_img } = usuario;
    const sqlQuery =
      'UPDATE usuarios SET nombre = $1, apellidos = $2, telefono = $3, url_img = $4 WHERE id = $5';
    const values = [nombre, apellidos, telefono, url_img, usuario.id];
    await pool.query(sqlQuery, values);
    console.log('Usuario actualizado');
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  checkEmail,
  checkCredentials,
  createUsuario,
  userInfo,
  updateUsuario,
};
