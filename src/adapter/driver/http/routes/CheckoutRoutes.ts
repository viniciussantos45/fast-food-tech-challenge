import { FastifyInstance } from 'fastify'

import { checkoutOrder } from '../controllers/CheckoutController'
import { checkoutSchema } from '../schemas/CheckOutSchema'

export const checkOutRoutes = (fastify: FastifyInstance) => {
  fastify.post('/checkout', { schema: checkoutSchema }, checkoutOrder)
}
