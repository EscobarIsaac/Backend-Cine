// ms-entradas/server.js
require('dotenv').config();
const app = require('./src/app');
const sequelize = require('./src/database/db');

const PORT = process.env.PORT || 3003;

async function start() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => console.log(`✅ ms-entradas en puerto ${PORT}`));
  } catch (err) {
    console.error('❌ Error al iniciar ms-entradas:', err);
  }
}

start();
