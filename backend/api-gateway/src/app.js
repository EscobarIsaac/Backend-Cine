// api-gateway/src/app.js
const express = require('express');
const cors = require('cors');

const usuariosRouter = require('../../ms-usuarios/src/routes/usuario.routes');
const eventosRouter = require('../../ms-eventos/src/routes/eventos.route');
const entradasRouter = require('../../ms-entradas/src/routes/entrada.routes');
const asistenciaRouter = require('../../ms-asistencia/src/routes/asistencia.routes');
const notificacionesRouter = require('../../ms-notificaciones/src/routes/notification.routes');

const app = express();
app.use(cors());
app.use(express.json());

// Monta cada microservicio en su prefijo
app.use('/api/usuarios', usuariosRouter);
app.use('/api/eventos',  eventosRouter);
app.use('/api/entradas', entradasRouter);
app.use('/api/asistencia', asistenciaRouter);
app.use('/api/notificaciones', notificacionesRouter);

module.exports = app;
// api-gateway/src/app.js