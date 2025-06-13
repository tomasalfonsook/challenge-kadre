const mongoose = require('mongoose');

const viajeSchema = new mongoose.Schema({
  camion: { type: String, required: true },
  conductor: { type: String, required: true },
  origen: { type: String, required: true },
  destino: { type: String, required: true },
  combustible: { type: String, required: true },
  cantidad_litros: { type: Number, required: true },
  fecha_salida: { type: Date, required: true },
  estado: { type: String, enum: ['En tránsito', 'Entregado', 'Cancelado'], default: 'En tránsito' },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  deletedAt: { type: Date, default: null },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Viaje', viajeSchema);
