const express = require('express');
const router = express.Router();

const {
  getPeluquerias,
  getPeluqueria,
  getPeluqueriasUsuario,
  postPeluqueria,
  putPeluqueria,
  deletePeluqueria,
} = require('../controllers/peluqueriaControllers');
const { authenticateToken, verifyOwnership } = require('../middlewares');

router
  .route('/peluquerias')
  .get(getPeluquerias)
  .post(authenticateToken, postPeluqueria)
  .get(authenticateToken, getPeluqueriasUsuario);

router
  .route('/peluquerias/:peluqueriaId')
  .get(getPeluqueria)
  .put(authenticateToken, verifyOwnership, putPeluqueria)
  .delete(authenticateToken, verifyOwnership, deletePeluqueria);

module.exports = router;
