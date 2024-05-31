const mongoose = require('mongoose');

const passageiroSchema = new mongoose.Schema({
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
  dataNascimento: {
    type: Date,
    required: true
  },
  dataCadastro: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Passageiro', passageiroSchema);
