const express = require('express');
const router = express.Router();
const Parceiro = require('../models/parceiro');

// Rota para listar todos os parceiros
router.get('/parceiros', async (req, res) => {
  try {
    const parceiros = await Parceiro.find();
    res.json(parceiros);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Outras rotas para CRUD de parceiros
router.post('/parceiros', async (req, res) => {
    const parceiro = new Parceiro(req.body);
    try {
      const novoParceiro = await parceiro.save();
      res.status(201).json(novoParceiro);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
  router.put('/parceiros/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const parceiro = await Parceiro.findByIdAndUpdate(id, req.body, { new: true });
      res.json(parceiro);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
  
  router.delete('/parceiros/:id', async (req, res) => {
    const { id } = req.params;
    try {
      await Parceiro.findByIdAndDelete(id);
      res.json({ message: 'Parceiro excluído com sucesso!' });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

  
  
module.exports = router;
