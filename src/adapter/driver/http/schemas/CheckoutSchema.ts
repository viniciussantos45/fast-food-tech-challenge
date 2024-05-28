import { FastifySchema } from 'fastify'

export const checkoutSchema: FastifySchema = {
  description: 'Checkout order',
  tags: ['checkout'],
  body: {
    type: 'object',
    required: ['orderId'],
    properties: { orderId: { type: 'number' } }
  },
  response: {
    201: {
      description: 'Checkout order',
      type: 'object',
      properties: { orderId: { type: 'number' } }
    }
  }
}
