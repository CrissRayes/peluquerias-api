const express = require('express');
const router = express.Router();
const {
  postPeluquero,
  putPeluquero,
  deletePeluquero,
  getPeluqueros,
} = require('../controllers/peluqueroControllers');

const { authenticateToken, verifyOwnership } = require('../middlewares');

router
  .route('/peluquerias/:peluqueriaId/peluqueros')
  .get(getPeluqueros)
  .post(authenticateToken, verifyOwnership, postPeluquero);

router
  .route('/peluquerias/:peluqueriaId/peluqueros/:peluqueroId')
  .put(authenticateToken, verifyOwnership, putPeluquero)
  .delete(authenticateToken, verifyOwnership, deletePeluquero);

module.exports = router;
