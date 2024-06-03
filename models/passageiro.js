const mongoose = require('mongoose');

const passageiroSchema = new mongoose.Schema({
  name: {
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
  cpf: {
    type: String,
    required: true
  },
  endereco: {
    type: String,
    required: true
  },
  numero: {
    type: String,
    required: true
  },
  cidade: {
    type: String,
    required: true
  },
  estado: {
    type: String,
    required: true
  },  
  dataCadastro: {
    type: Date,
    default: Date.now
  },
  senha: {
    type: String,
    required: true
  },
  confirmacao_senha: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Passageiro', passageiroSchema);
