import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'producer-service',
  brokers: ['host.docker.internal:9092']
});

const producer = kafka.producer();

async function produceMessages() {
  await producer.connect();

  setInterval(async () => {
    const message = `Message from Producer at ${new Date().toISOString()}`;
    await producer.send({
      topic: 'test-topic',
      messages: [{ value: message }],
    });
    console.log(`✅ Sent: ${message}`);
  }, 5000);
}

produceMessages().catch(console.error);
