const express = require('express');
const { obtenerViajes, obtenerViajesById, crearViaje, eliminarViaje, actualizarViaje } = require('../controllers/viajesController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.use(authMiddleware);

router.get('/', obtenerViajes);
router.get('/:id', obtenerViajesById);
router.post('/', crearViaje);
router.delete('/:id', eliminarViaje);
router.put('/:id', actualizarViaje);

module.exports = router;
