// gateway/index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
app.use(cors());
app.use(express.json());

// Proxy a cada microservicio
app.use('/api/usuarios', createProxyMiddleware({ target: 'http://ms-usuarios:3001', changeOrigin: true }));
app.use('/api/eventos',  createProxyMiddleware({ target: 'http://ms-eventos:3002',  changeOrigin: true }));
app.use('/api/entradas', createProxyMiddleware({ target: 'http://ms-entradas:3003', changeOrigin: true }));
app.use('/api/notificaciones', createProxyMiddleware({ target: 'http://ms-notificaciones:3004', changeOrigin: true }));
app.use('/api/asistencia', createProxyMiddleware({ target: 'http://ms-asistencia:3005', changeOrigin: true }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ API Gateway en puerto ${PORT}`));
