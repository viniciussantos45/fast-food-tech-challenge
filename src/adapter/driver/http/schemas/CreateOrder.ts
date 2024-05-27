import { FastifySchema } from 'fastify'

export const createOrderSchema: FastifySchema = {
  description: 'Create a new order',
  tags: ['order'],
  body: {
    type: 'object',
    required: ['customer', 'combos', 'statusPayment', 'status'],
    properties: {
      customer: { type: 'string' },
      combos: {
        type: 'array', // Assuming combos is an array of Combo objects
        items: {
          type: 'object',
          properties: {
            id: { type: 'number' },
            name: { type: 'string' }
          },
          required: ['id', 'name']
        }
      },
      statusPayment: { type: 'string' }, // Assuming statusPayment is a string
      status: { type: 'string' } // Assuming status is a string
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
