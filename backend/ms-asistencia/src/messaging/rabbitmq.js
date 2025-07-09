// src/messaging/rabbitmq.js
const amqp = require('amqplib');

let channel;

async function connectRabbitMQ() {
  const url = process.env.RABBITMQ_URL || 'amqp://admin:admin@rabbitmq:5672';
  const connection = await amqp.connect(url);
  channel = await connection.createChannel();
  console.log(`✅ Conectado a RabbitMQ en ${url}`);
}

async function sendMessage(queue, message) {
  if (!channel) await connectRabbitMQ();
  await channel.assertQueue(queue, { durable: true });
  channel.sendToQueue(queue, Buffer.from(JSON.stringify({ mensaje: message })));
  console.log(`📤 Mensaje enviado a la cola [${queue}]:`, message);
}

module.exports = { connectRabbitMQ, sendMessage };
