const Viaje = require("../models/Viaje");

const obtenerViajes = async (req, res) => {
  try {
    const viajes = await Viaje.find({
      deletedAt: null,
    }).populate("createdBy", "username");
    res.json(viajes);
  } catch (error) {
    console.error("Error al obtener viajes:", error);
    res.status(500).json({ message: "Error al obtener los viajes" });
  }
};

const obtenerViajesById = async (req, res) => {
  try {
    const { id } = req.params;
    const viaje = await Viaje.findById(id, { deletedAt: null }).populate(
      "createdBy",
      "username"
    );
    if (!viaje) {
      return res.status(404).json({ message: "Viaje no encontrado" });
    }
    res.json(viaje);
  } catch (error) {
    console.error("Error al obtener el viaje:", error);
    res.status(500).json({ message: "Error al obtener el viaje" });
  }
};

const crearViaje = async (req, res) => {
  try {
    const {
      camion,
      conductor,
      origen,
      destino,
      combustible,
      cantidad_litros,
      fecha_salida,
    } = req.body;
    if (
      !camion ||
      !conductor ||
      !origen ||
      !destino ||
      !combustible ||
      !cantidad_litros ||
      !fecha_salida
    ) {
      return res.status(400).json({ message: "Faltan campos obligatorios" });
    }
    const newViaje = new Viaje({
      camion,
      conductor,
      origen,
      destino,
      combustible,
      cantidad_litros,
      fecha_salida,
      estado: "En tránsito",
      createdBy: req.user._id,
    });
    await newViaje.save();
    res.status(201).json(newViaje);
  } catch (error) {
    console.error("Error al crear el viaje:", error);
    res.status(500).json({ message: "Error al crear el viaje" });
  }
};

const eliminarViaje = async (req, res) => {
  try {
    const { id } = req.params;
    const viaje = await Viaje.findById(id);
    if (!viaje) {
      return res.status(404).json({ message: "Viaje no encontrado" });
    }
    await Viaje.findByIdAndUpdate(id, { deletedAt: new Date() });
    res.json({ message: "Viaje eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar el viaje:", error);
    res.status(500).json({ message: "Error al eliminar el viaje" });
  }
};

const actualizarViaje = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      camion,
      conductor,
      origen,
      destino,
      combustible,
      cantidad_litros,
      fecha_salida,
      estado,
    } = req.body;

    const viaje = await Viaje.findById(id);
    if (!viaje) {
      return res.status(404).json({ message: "Viaje no encontrado" });
    }

    if (viaje.createdBy.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "No autorizado para actualizar este viaje" });
    }

    viaje.camion = camion || viaje.camion;
    viaje.conductor = conductor || viaje.conductor;
    viaje.origen = origen || viaje.origen;
    viaje.destino = destino || viaje.destino;
    viaje.combustible = combustible || viaje.combustible;
    viaje.cantidad_litros = cantidad_litros || viaje.cantidad_litros;
    viaje.fecha_salida = fecha_salida || viaje.fecha_salida;
    viaje.estado = estado || viaje.estado;

    await viaje.save();
    res.json(viaje);
  } catch (error) {
    console.error("Error al actualizar el viaje:", error);
    res.status(500).json({ message: "Error al actualizar el viaje" });
  }
};

module.exports = {
  obtenerViajes,
  obtenerViajesById,
  crearViaje,
  eliminarViaje,
  actualizarViaje,
};
