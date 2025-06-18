const express = require('express');
const { obtenerViajes, obtenerViajesById, crearViaje, eliminarViaje, actualizarViaje } = require('../controllers/viajesController');
const authMiddleware = require('../middleware/authMiddleware');
const { validarId, validarViaje } = require('../validators/viajesValidator');
const validarCampos = require('../middleware/validarCampos');
const router = express.Router();

router.use(authMiddleware);

router.get('/', obtenerViajes);
router.get('/:id', validarId, validarCampos, obtenerViajesById);
router.post('/', validarViaje, validarCampos, crearViaje);
router.delete('/:id', validarId, eliminarViaje);
router.put('/:id', validarId, validarViaje, validarCampos, actualizarViaje);

module.exports = router;
