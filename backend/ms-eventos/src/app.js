const express = require('express');
const cors = require('cors');
const eventosRouter = require('./routes/eventos.route');

const app = express();
app.use(cors());
app.use(express.json());

// Todas las rutas bajo /api/eventos
app.use('/api/eventos', eventosRouter);

module.exports = app;
