import { FastifySchema } from 'fastify'

// see https://ajv.js.org/packages/ajv-formats.html
export const createCustomerSchema: FastifySchema = {
  description: 'Cria um novo cliente',
  tags: ['cliente'],
  body: {
    type: 'object',
    required: ['cpf', 'name', 'email'],
    properties: {
      cpf: {
        type: 'string',
        format: 'regex',
        pattern: '^(?:\\d{11})$',
        examples: ['06045337050'],
        errorMessage: {
          pattern: 'Formato de CPF inválido. O formato esperado é XXX.XXX.XXX-XX.'
        }
      },
      email: {
        type: 'string',
        format: 'email',
        errorMessage: {
          format: 'Formato de e-mail inválido'
        }
      },
      name: {
        type: 'string',
        minLength: 2,
        examples: ['João da Silva'],
        errorMessage: {
          minLength: 'O nome deve ter pelo menos 2 caracteres'
        }
      }
    }
  },
  response: {
    201: {
      description: 'Cliente criado com sucesso',
      type: 'object',
      properties: {
        message: { type: 'string', default: 'Cliente criado com sucesso!' }
      }
    },
    400: {
      description: 'Dados inválidos fornecidos',
      type: 'object',
      properties: {
        error: { type: 'string', description: 'Descrição do erro' }
      }
    }
  }
}
