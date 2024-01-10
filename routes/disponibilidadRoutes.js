const express = require('express');
const router = express.Router();
const { authenticateToken, verifyOwnership } = require('../middlewares');
const {
  postDisponibilidad,
  putDisponibilidad,
  deleteDisponibilidad,
  getDisponibilidadPeluqueria,
} = require('../controllers/disponibilidadControllers');

router
  .route('/peluquerias/:peluqueriaId/disponibilidad')
  .get(getDisponibilidadPeluqueria)
  .post(authenticateToken, verifyOwnership, postDisponibilidad);

router
  .route('/peluquerias/:peluqueriaId/disponibilidad/:disponibilidadId')
  .put(authenticateToken, verifyOwnership, putDisponibilidad)
  .delete(authenticateToken, verifyOwnership, deleteDisponibilidad);

module.exports = router;
