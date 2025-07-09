// ms-usuarios/server.js
require('dotenv').config();
const app = require('./src/app');
const sequelize = require('./src/database/db');

const PORT = process.env.PORT || 3001;

async function start() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => console.log(`✅ ms-usuarios en puerto ${PORT}`));
  } catch (err) {
    console.error('❌ Error al iniciar ms-usuarios:', err);
  }
}

start();
