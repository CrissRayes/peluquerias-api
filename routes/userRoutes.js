const express = require('express');
const router = express.Router();

const {
  postUsuario,
  loginUser,
  getUserInfo,
  putUsuario,
} = require('../controllers/userControllers');
const { checkUserPayload, authenticateToken } = require('../middlewares');

router.route('/registro').post(checkUserPayload, postUsuario);
router.route('/login').post(loginUser);
router
  .route('/usuario/:id')
  .get(authenticateToken, getUserInfo)
  .put(authenticateToken, putUsuario);

module.exports = router;
