// ms-entradas/src/controllers/entrada.controller.js
const { Entrada } = require('../models/entrada.model');

exports.listarEntradas = async (_req, res) => {
  const lista = await Entrada.findAll();
  res.json(lista);
};

exports.comprarEntrada = async (req, res) => {
  try {
    const ent = await Entrada.create(req.body);
    res.status(201).json(ent);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
// ms-entradas/src/controllers/entradas.controller.js