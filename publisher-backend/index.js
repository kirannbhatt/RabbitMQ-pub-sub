const amqp = require("amqplib/callback_api");
const randomSentence = require("random-sentence");

amqp.connect("amqp://localhost", (error0, connection) => {
  if (error0) {
    throw error0;
  }
  connection.createChannel((error1, channel) => {
    if (error1) {
      throw error1;
    }

    let queue = "message";
    let message = "Test message";
    channel.assertQueue(queue, {
      durable: false
    });
    setInterval(() => {
      let message = {
        message: randomSentence({ words: 5 }),
        timestamp: new Date(),
        priority: Math.floor(Math.random() * 10)
      };
      channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
    }, 50);
  });
});
