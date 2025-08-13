const express = require('express');
const router = express.Router();
const {
  crearPelicula,
  listarPeliculas
} = require('../controllers/evento.controller');
const { sendMessage } = require('../messaging/rabbitmq');

// ▶️ Ruta de prueba RabbitMQ
router.post('/test-rabbit', async (req, res) => {
  try {
    const msg = req.body.mensaje || '¡Mensaje de prueba desde ms-eventos!';
    await sendMessage('evento.cola', { mensaje: msg });
    res.json({ mensaje: `✅ Mensaje enviado a RabbitMQ: evento.cola` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error enviando mensaje' });
  }
});

// 🔨 CRUD Películas
router.post('/peliculas', crearPelicula);
router.get('/peliculas', listarPeliculas);

module.exports = router;
