import { Kafka } from 'kafkajs'
import { Order } from './models/Order'

export async function printOrderAmount() {
  const kafka = new Kafka({
    clientId: 'consumer-order-amount',
    brokers: ['host.docker.internal:9092'],
  })

  const consumer = kafka.consumer({ groupId: 'order-amount-group' }) // ✅ Unique group ID
  await consumer.connect()
  await consumer.subscribe({ topic: 'order-created', fromBeginning: true })

  await consumer.run({
    eachMessage: async ({ message }) => {
      if (message.value) {
        const order = Order.fromJson(message.value.toString())
        console.log(`🆔 Order Amount: ${order.totalAmount}`)
      }
    },
  })
}
