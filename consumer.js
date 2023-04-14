// const express = require('express')
// const app = express()
// const { createChannel } = require('./rabbit');

// const queue = 'messages';

// const consume = async (channel) => {
//   await channel.assertQueue(queue);
//   channel.consume(queue, (msg) => {
//     console.log(`Received message: ${msg.content.toString()}`);
//   });
// };

// app.get('/', (req, res)=> {
//     createChannel()
//   .then(consume)
//   .catch((err) => console.error(err));
// })

// app.listen(4001, ()=> {
//     console.log('listening on port 4001')
// })

const amqp = require('amqplib');

const receiveMessage = async ()=>{
  const connection = await amqp.connect("amqp://localhost");
  const channel = await connection.createChannel();
  const queue = 'my_queue';

  await channel.assertQueue(queue, {durable: false});

  console.log('waiting for message...')

  channel.consume(
    queue,
    function (msg) {
      console.log(`Received ${msg.content.toString()}`);
    },
    { nuAch: true }
  );
};

receiveMessage();