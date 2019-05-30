const express = require("express");
const amqp = require("amqplib/callback_api");

const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);

io.on("connection", socket => {
  amqp.connect("amqp://localhost", (error0, connection) => {
    if (error0) {
      throw error0;
    }
    connection.createChannel((error1, channel) => {
      if (error1) {
        throw error1;
      }
      const queue = "message";

      channel.assertQueue(queue, {
        durable: false
      });

      channel.consume(
        queue,
        msgs => {
          const message = msgs.content.toString();
          const msg = JSON.parse(message);
          if (msg.priority >= 7) {
            socket.emit("message", msg);
          }
        },
        {
          noAck: true
        }
      );
    });
  });
});

module.exports = http;
