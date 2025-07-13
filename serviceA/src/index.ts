import { Kafka, Partitioners } from 'kafkajs';
import { Order } from './models/Order';

const kafka = new Kafka({
  clientId: 'producer-service',
  brokers: ['host.docker.internal:9092']
});

const producer = kafka.producer({
  createPartitioner: Partitioners.LegacyPartitioner,
})

async function produceMessages() {
  await producer.connect();

  setInterval(async () => {

    const order = new Order(123, 'Alice', 99.99, new Date().toISOString());
    
    await producer.send({
      topic: 'order-created',
      messages: [{ value:  JSON.stringify(order) }],
    });
    console.log(`✅ Sent: ${order.orderId}`);
  }, 5000);
}

produceMessages().catch(console.error);
