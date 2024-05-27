import { FastifySchema } from 'fastify'

export const createOrderSchema: FastifySchema = {
  description: 'Create a new order',
  tags: ['order'],
  body: {
    type: 'object',
    required: ['customerId', 'combos'],
    properties: {
      customerId: { type: 'string' },
      combos: {
        type: 'array', // Assuming combos is an array of Combo objects
        items: {
          type: 'object',
          properties: {
            productsIds: { type: 'array', items: { type: 'number' } }
          },
          required: ['productsIds']
        }
      }
    }
  },
  response: {
    201: {
      description: 'Order created successfully',
      type: 'object',
      properties: {
        id: { type: 'number' },
        customer: { type: 'string' },
        combos: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'number' },
              name: { type: 'string' }
            },
            required: ['id', 'name']
          }
        },
        statusPayment: { type: 'string' },
        status: { type: 'string' }
      }
    }
  }
}
