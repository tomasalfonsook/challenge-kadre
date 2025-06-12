const Viaje = require('../models/Viaje');

const obtenerViajes = async (req, res) => {
  const viajes = await Viaje.find({}).populate('createdBy', 'username');
  res.json(viajes);
};

const obtenerViajesById = async (req, res) => {
  const { id } = req.params;
  const viaje = await Viaje.findById(id).populate('createdBy', 'username');
  if (!viaje) {
    return res.status(404).json({ message: 'Viaje no encontrado' });
  }
  res.json(viaje);
};

const crearViaje = async (req, res) => {
  const { camion, conductor, origen, destino, combustible, cantidad_litros, fecha_salida } = req.body;
  if (!camion || !conductor || !origen || !destino || !combustible || !cantidad_litros || !fecha_salida) {
    return res.status(400).json({ message: 'Faltan campos obligatorios' });
  }
  const newViaje = new Viaje({
    camion,
    conductor,
    origen,
    destino,
    combustible,
    cantidad_litros,
    fecha_salida,
    createdBy: req.user._id,
  });
  await newViaje.save();
  res.status(201).json(newViaje);
};

const eliminarViaje = async (req, res) => {
  const { id } = req.params;
  const viaje = await Viaje.findById(id);
  if (!viaje) {
    return res.status(404).json({ message: 'Viaje no encontrado' });
  }
  if (viaje.createdBy.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: 'No autorizado para eliminar este viaje' });
  }
  await viaje.remove();
  res.json({ message: 'Viaje eliminado correctamente' });
};

const actualizarViaje = async (req, res) => {
  const { id } = req.params;
  const { camion, conductor, origen, destino, combustible, cantidad_litros, fecha_salida } = req.body;

  const viaje = await Viaje.findById(id);
  if (!viaje) {
    return res.status(404).json({ message: 'Viaje no encontrado' });
  }

  if (viaje.createdBy.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: 'No autorizado para actualizar este viaje' });
  }

  viaje.camion = camion || viaje.camion;
  viaje.conductor = conductor || viaje.conductor;
  viaje.origen = origen || viaje.origen;
  viaje.destino = destino || viaje.destino;
  viaje.combustible = combustible || viaje.combustible;
  viaje.cantidad_litros = cantidad_litros || viaje.cantidad_litros;
  viaje.fecha_salida = fecha_salida || viaje.fecha_salida;

  await viaje.save();
  res.json(viaje);
};

module.exports = { obtenerViajes, obtenerViajesById, crearViaje, eliminarViaje, actualizarViaje };
