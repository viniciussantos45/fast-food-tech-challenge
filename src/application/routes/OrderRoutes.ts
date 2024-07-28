import { FastifyInstance } from 'fastify'

import { createOrder, listOrders, statusPayment, updateOrderStatus, webhookPaymentStatus } from '../controllers/OrderController'
import { createOrderSchema } from '../schemas/CreateOrder'
import { listOrdersSchema } from '../schemas/ListOrders'
import { orderStatusPaymentSchema } from '../schemas/OrderStatusPayment'
import { updateOrderStatusSchema } from '../schemas/UpdateOrderStatus'
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

  // POST /order/:orderId/status
  fastify.post(
    '/order/:orderId/status',
    {
      schema: updateOrderStatusSchema
    },
    updateOrderStatus
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
