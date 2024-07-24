import { FastifyInstance } from 'fastify'
import { identifyCustomer, registerCustomer } from '../controllers/CustomerController'

import { createCustomerSchema } from '../schemas/CreateCustomer'
import { identifyCustomerSchema } from '../schemas/IdentifyCustomerSchema'

export const customerRoutes = (fastify: FastifyInstance) => {
  // POST /customer
  fastify.post(
    '/customer',
    {
      schema: createCustomerSchema
    },
    registerCustomer
  )

  // GET /customer/:cpf
  fastify.get(
    '/customer/:cpf',
    {
      schema: identifyCustomerSchema
    },
    identifyCustomer
  )
}
