const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middlewares');
const {
  postFavorito,
  deleteFavorito,
  getFavoritosUsuario,
} = require('../controllers/favoritoControllers');

router.route('/favoritos').get(authenticateToken, getFavoritosUsuario);

router
  .route('/peluquerias/:peluqueriaId/favoritos')
  .post(authenticateToken, postFavorito)
  .delete(authenticateToken, deleteFavorito);

module.exports = router;
