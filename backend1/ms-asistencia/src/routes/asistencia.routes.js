// ms-asistencia/src/routes/asistencia.routes.js
const express = require('express');
const { verificarAsistencia } = require('../controllers/asistencia.controller');
const router = express.Router();

router.post('/verificar', verificarAsistencia);

module.exports = router;
