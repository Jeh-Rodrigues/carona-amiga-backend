const express = require('express');
const router = express.Router();
const Passageiro = require('../models/passageiro');
const { authenticateToken } = require('./auth');

// Rota para listar todos os passageiros
router.get('/passageiros', authenticateToken, async (req, res) => {
  try {
    const passageiros = await Passageiro.find();
    res.json(passageiros);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Rota para criar um novo passageiro
router.post('/passageiros', authenticateToken, async (req, res) => {
  const passageiro = new Passageiro(req.body);
  try {
    const novoPassageiro = await passageiro.save();
    res.status(201).json(novoPassageiro);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Rota para atualizar um passageiro
router.put('/passageiros/:id', authenticateToken, async (req, res) => {
  try {
    const passageiro = await Passageiro.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!passageiro) {
      return res.status(404).json({ message: 'Passageiro não encontrado' });
    }
    res.json(passageiro);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Rota para excluir um passageiro
router.delete('/passageiros/:id', authenticateToken, async (req, res) => {
  try {
    const passageiro = await Passageiro.findByIdAndDelete(req.params.id);
    if (!passageiro) {
      return res.status(404).json({ message: 'Passageiro não encontrado' });
    }
    res.json({ message: 'Passageiro excluído' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
