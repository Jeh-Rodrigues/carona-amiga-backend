const mongoose = require('mongoose');

const parceiroSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  telefone: {
    type: String,
    required: true
  },
  endereco: {
    type: String,
    required: true
  },
  dataCadastro: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Parceiro', parceiroSchema);
