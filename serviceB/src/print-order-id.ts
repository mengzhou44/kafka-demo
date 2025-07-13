import { Kafka } from 'kafkajs'
import { Order } from './models/Order'

export async function printOrderId() {
  const kafka = new Kafka({
    clientId: 'consumer-order-id',
    brokers: ['host.docker.internal:9092'],
  })

  const consumer = kafka.consumer({ groupId: 'order-id-group' }) // ✅ Unique group ID
  await consumer.connect()
  await consumer.subscribe({ topic: 'order-created', fromBeginning: true })

  await consumer.run({
    autoCommit: false,
    eachMessage: async ({ topic, partition, message }) => {
      try {
        const success = await processMessage(message)
        if (success) {
          await consumer.commitOffsets([
            {
              topic,
              partition,
              offset: (parseInt(message.offset) + 1).toString(),
            },
          ])
        } else {
          console.error('❌ Message processing failed after retries.')
        }
      } catch (err) {
        console.error('❌ Failed to process message:', err)
      }
    },
  })
}

const processMessage = async (message: any, retries = 3) => {
  while (retries--) {
    try {
      const order = Order.fromJson(message.value.toString())
      console.log(`🆔 Order ID: ${order.orderId}`)
      return true
    } catch (err) {
      console.warn(`⚠️ Retry failed (${3 - retries}):`, err)
      await new Promise((res) => setTimeout(res, 1000)) // simple backoff
    }
  }
  return false
}
