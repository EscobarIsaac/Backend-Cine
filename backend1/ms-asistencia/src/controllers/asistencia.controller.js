// ms-asistencia/src/controllers/asistencia.controller.js
const { Asistencia } = require('../models/asistencia.model');

exports.verificarAsistencia = async (req, res) => {
  try {
    const reg = await Asistencia.create(req.body);
    res.json({ ok: true, registro: reg });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
