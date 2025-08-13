const express = require('express');
const entradaRoutes = require('./routes/entrada.routes');

const app = express();
app.use(express.json());
app.use('/api/entradas', entradaRoutes);

module.exports = app;
