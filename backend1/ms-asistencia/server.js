// ms-asistencia/server.js
require('dotenv').config();
const app = require('./src/app');
const sequelize = require('./src/database/db');

const PORT = process.env.PORT || 3005;

async function start() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => console.log(`✅ ms-asistencia en puerto ${PORT}`));
  } catch (err) {
    console.error('❌ Error al iniciar ms-asistencia:', err);
  }
}

start();
