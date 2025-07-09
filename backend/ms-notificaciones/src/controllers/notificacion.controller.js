// ms-notificaciones/src/controllers/notificacion.controller.js
const { sendMessage } = require('../messaging/rabbitmq');

exports.enviarNotificacion = async (req, res) => {
  const { mensaje, destino } = req.body;
  try {
    await sendMessage('notificaciones.cola', { mensaje, destino });
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
