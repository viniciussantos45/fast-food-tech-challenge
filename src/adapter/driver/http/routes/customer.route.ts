import { FastifyInstance } from 'fastify'
import { registerCustomer, updateCustomer } from '../controllers/customer.controller'

export const customerRoute = (fastify: FastifyInstance) => {
  fastify.post(
    '/customer',
    {
      schema: {
        description: 'Create a new customer',
        tags: ['customer'],
        body: {
          type: 'object',
          properties: {
            cpf: { type: 'string' },
            name: { type: 'string' },
            email: { type: 'string' }
          }
        },
        response: {
          201: {
            description: 'Customer created successfully',
            type: 'object',
            properties: {
              message: { type: 'string' }
            }
          }
        },
        security: [
          {
            apiKey: []
          }
        ]
      }
    },
    registerCustomer
  )

  fastify.put(
    '/customer',
    {
      schema: {
        description: 'Update a customer',
        tags: ['customer'],
        body: {
          type: 'object',
          properties: {
            cpf: { type: 'string' },
            name: { type: 'string' },
            email: { type: 'string' }
          }
        },
        response: {
          200: {
            description: 'Customer updated successfully',
            type: 'object',
            properties: {
              message: { type: 'string' }
            }
          }
        },
        security: [
          {
            apiKey: []
          }
        ]
      }
    },

    updateCustomer
  )
}
