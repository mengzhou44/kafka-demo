import { Kafka } from 'kafkajs'
import { Order } from './models/Order'

const kafka = new Kafka({
  clientId: 'consumer-service',
  brokers: ['host.docker.internal:9092'],
})

const consumer = kafka.consumer({ groupId: 'test-group' })

async function consumeMessages() {
  await consumer.connect()

  await consumer.subscribe({ topic: 'test-topic', fromBeginning: true })
 
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      if (message.value) {
        const rawValue = message.value.toString() // From Kafka
        const order = Order.fromJson(rawValue)
        console.log('📥 Received object', { order })
      } else {
        console.warn('⚠️ Received message with null value')
      }
    },
  })
}

consumeMessages().catch(console.error)
