const express = require('express');
const { login, register, getUser } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
const { validarLogin, validarRegistro } = require('../validators/userValidator');
const validarCampos = require('../middleware/validarCampos');
const router = express.Router();

router.post('/login',validarLogin, validarCampos, login);
router.post('/register', validarRegistro, validarCampos, register);
router.get('/getUser', authMiddleware, getUser);

module.exports = router;
