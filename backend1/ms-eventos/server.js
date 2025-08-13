// server.js (ms-eventos)
require('dotenv').config();
const app = require('./src/app');
const sequelize = require('./src/database/db');
const { connectRabbitMQ } = require('./src/messaging/rabbitmq');

const PORT = process.env.PORT || 3002;

async function start() {
  try {
    // 1) Conectar a la BD
    await sequelize.sync({ force: false });
    console.log('✅ Conectado a PostgreSQL');

    // 2) Conectar a RabbitMQ
    await connectRabbitMQ();

    // 3) Arrancar el servidor
    app.listen(PORT, () => console.log(`✅ ms-eventos en puerto ${PORT}`));
  } catch (err) {
    console.error('❌ Error al iniciar ms-eventos:', err);
  }
}

start();
