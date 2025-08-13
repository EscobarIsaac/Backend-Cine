const express = require('express');
const asistenciaRoutes = require('./routes/asistencia.routes');

const app = express();
app.use(express.json());
app.use('/api/asistencia', asistenciaRoutes);

module.exports = app;
