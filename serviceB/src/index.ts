import { Kafka, logLevel } from 'kafkajs'

const kafka = new Kafka({
  clientId: 'consumer-service',
  brokers: ['host.docker.internal:9092'],
})

const consumer = kafka.consumer({ groupId: 'test-group' })

async function consumeMessages() {
  await consumer.connect()
  console.log('consumer connected!')
  await consumer.subscribe({ topic: 'test-topic', fromBeginning: true })
  console.log('consumer subscribed!')
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log(`📥 Received message: ${message.value?.toString()}`)
    },
  })
}

consumeMessages().catch(console.error)
