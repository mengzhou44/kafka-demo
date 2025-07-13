import { printOrderId } from './print-order-id'
 

async function startConsumers() {
  await Promise.all([ printOrderId()])
}

startConsumers().catch(console.error)
