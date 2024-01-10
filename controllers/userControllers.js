const jwt = require('jsonwebtoken');

const {
  checkEmail,
  createUsuario,
  checkCredentials,
  userInfo,
  updateUsuario,
} = require('../models/queries');

const getUserInfo = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userInfo(id);
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error al obtener usuario');
  }
};

const postUsuario = async (req, res) => {
  try {
    const usuario = req.body;
    const emailExists = await checkEmail(usuario.email);

    if (emailExists) {
      return res.status(400).json({ message: 'Email ya registrado' });
    }

    await createUsuario(usuario);
    res.status(201).send('Usuario creado');
  } catch (error) {
    console.log(error);
    res.status(500).send('Error al crear usuario');
  }
};

const loginUser = async (req, res, next) => {
  const { email, clave } = req.body;
  try {
    const user = await checkCredentials(email, clave);

    const tokenPayload = {
      id: user.id,
      email: user.email,
      nombre: user.nombre,
      imagen: user.imagen,
    };

    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
      expiresIn: '3h',
    });
    res.status(200).json({ token });
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
};

const putUsuario = async (req, res) => {
  try {
    const usuario = req.body;
    const { id } = req.params;

    console.log(usuario, id);

    await updateUsuario(usuario, id);
    res.status(200).send('Usuario actualizado');
  } catch (error) {
    console.log(error);
    res.status(500).send('Error al actualizar usuario');
  }
};

module.exports = {
  postUsuario,
  loginUser,
  getUserInfo,
  putUsuario,
};
