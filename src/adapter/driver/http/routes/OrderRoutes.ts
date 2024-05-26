import { FastifyInstance } from 'fastify'

import { createOrder } from '../controllers/OrderController'
import { createOrderSchema } from '../schemas/CreateOrder'

export const orderRoutes = (fastify: FastifyInstance) => {
  // POST /product
  fastify.post(
    '/order',
    {
      schema: createOrderSchema
    },
    createOrder
  )
}
