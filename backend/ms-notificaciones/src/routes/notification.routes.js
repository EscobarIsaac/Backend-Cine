// ms-notificaciones/src/routes/notificacion.routes.js
const express = require('express');
const { enviarNotificacion } = require('../controllers/notificacion.controller');
const router = express.Router();

router.post('/enviar', enviarNotificacion);

module.exports = router;
