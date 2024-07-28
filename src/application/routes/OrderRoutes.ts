import { FastifyInstance } from 'fastify'

import { createOrder, listOrders, statusPayment, webhookPaymentStatus } from '../controllers/OrderController'
import { createOrderSchema } from '../schemas/CreateOrder'
import { listOrdersSchema } from '../schemas/ListOrders'
import { orderStatusPaymentSchema } from '../schemas/OrderStatusPayment'
import { webhookStatusPaymentOrderSchema } from '../schemas/WebHookStatusPaymentOrder'

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
  // GET /order/:orderId/status/payment
  fastify.get(
    '/order/:orderId/status/payment',
    {
      schema: orderStatusPaymentSchema
    },
    statusPayment
  )

  // POST /webhook/order/payment/status
  fastify.post(
    '/webhook/order/payment/status',
    {
      schema: webhookStatusPaymentOrderSchema
    },
    webhookPaymentStatus
  )
}
