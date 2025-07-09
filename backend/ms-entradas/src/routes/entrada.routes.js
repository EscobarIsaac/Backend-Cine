// ms-entradas/src/routes/entrada.routes.js
const express = require('express');
const { comprarEntrada, listarEntradas } = require('../controllers/entrada.controller');
const router = express.Router();

router.get ('/entradas', listarEntradas);
router.post('/entradas', comprarEntrada);

module.exports = router;
