// api-gateway/server.js
require('dotenv').config();
const app = require('./src/app');

const PORT = process.env.GATEWAY_PORT || 3000;

app.listen(PORT, () => {
  console.log(`✅ api-gateway escuchando en puerto ${PORT}`);
});
