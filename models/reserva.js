const mongoose = require('mongoose');

const reservaSchema = new mongoose.Schema({
  passageiro: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Passageiro',
    required: true
  },
  dataReserva: {
    type: Date,
    required: true
  },
  assento: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Reserva', reservaSchema);
