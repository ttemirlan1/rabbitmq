// const express = require('express');
// const bodyParser = require('body-parser');
// const { createChannel } = require('./rabbit');

// const app = express();
// const port = 4000;

// app.use(bodyParser.json());

// app.post('/messages', async (req, res) => {
//   const { message } = req.body;
//   const channel = await createChannel();
//   const queue = 'messages';

//   await channel.assertQueue(queue);
//   await channel.sendToQueue(queue, Buffer.from(message));

//   res.json({ success: true });
// });

// app.listen(port, () => {
//   console.log(`Producer service listening at http://localhost:${port}`);
// });

const amqp = require('amqplib');

const sendMessage = async () => {
  const connection = await amqp.connect("amqp://localhost");
  const channel = await connection.createChannel();

  const queue = "my_queue";

  await channel.assertQueue(queue, { durable: false });

  const message = "Hello, Rabbit";
  channel.sendToQueue(queue, Buffer.from(message));

  console.log(`sent: ${message}`);

  setTimeout(()=> {
    connection.close();
    process.exit(0);
  }, 500);
};

sendMessage();