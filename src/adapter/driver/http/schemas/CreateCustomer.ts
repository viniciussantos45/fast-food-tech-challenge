import { FastifySchema } from 'fastify'

// see https://ajv.js.org/packages/ajv-formats.html
export const createCustomerSchema: FastifySchema = {
  description: 'Create a new customer',
  tags: ['customer'],
  body: {
    type: 'object',
    required: ['cpf', 'name', 'email'],
    properties: {
      cpf: {
        type: 'string',
        format: 'regex',
        pattern: '^(?:\\d{11})$',
        errorMessage: {
          pattern: 'Invalid CPF format'
        }
      },
      email: { type: 'string', format: 'email' },
      name: { type: 'string' }
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
  }
}
