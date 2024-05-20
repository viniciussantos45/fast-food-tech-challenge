import { FastifyInstance } from 'fastify'
import { registerCustomer } from '../controllers/CustomerController'

import { createCustomerSchema } from '../schemas/CreateCustomer'

export const customerRoutes = (fastify: FastifyInstance) => {
  // POST /customer
  fastify.post(
    '/customer',
    {
      schema: createCustomerSchema
    },
    registerCustomer
  )
}
