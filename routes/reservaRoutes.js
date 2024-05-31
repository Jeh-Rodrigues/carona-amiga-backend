const express = require('express');
const router = express.Router();
const Reserva = require('../models/reserva');
const { authenticateToken } = require('./auth');

// Rota para listar todas as reservas
router.get('/reservas', async (req, res) => {
  try {
    const reservas = await Reserva.find();
    res.json(reservas);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Outras rotas para CRUD de reservas

// Criar uma nova reserva
router.post('/reservas', authenticateToken, async (req, res) => {
  try {
    const reserva = new Reserva(req.body);
    const novaReserva = await reserva.save();
    res.status(201).json(novaReserva);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Listar todas as reservas
router.get('/reservas', authenticateToken, async (req, res) => {
  try {
    const reservas = await Reserva.find();
    res.json(reservas);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Atualizar uma reserva
router.put('/reservas/:id', authenticateToken, async (req, res) => {
  try {
    const reserva = await Reserva.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!reserva) {
      return res.status(404).json({ message: 'Reserva não encontrada' });
    }
    res.json(reserva);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Excluir uma reserva
router.delete('/reservas/:id', authenticateToken, async (req, res) => {
  try {
    const reserva = await Reserva.findByIdAndDelete(req.params.id);
    if (!reserva) {
      return res.status(404).json({ message: 'Reserva não encontrada' });
    }
    res.json({ message: 'Reserva excluída' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;