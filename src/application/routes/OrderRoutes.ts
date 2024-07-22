import { FastifyInstance } from 'fastify'

import { createOrder, listOrders } from '../controllers/OrderController'
import { createOrderSchema } from '../schemas/CreateOrder'
import { listOrdersSchema } from '../schemas/ListOrders'

export const orderRoutes = (fastify: FastifyInstance) => {
  // POST /order
  fastify.post(
    '/order',
    {
      schema: createOrderSchema
    },
    createOrder
  )

  // GET /orders
  fastify.get(
    '/orders',
    {
      schema: listOrdersSchema
    },
    listOrders
  )
}
