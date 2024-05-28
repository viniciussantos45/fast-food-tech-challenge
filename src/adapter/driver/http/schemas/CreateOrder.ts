import { FastifySchema } from 'fastify'

export const createOrderSchema: FastifySchema = {
  description: 'Cria uma nova ordem',
  tags: ['pedido'],
  body: {
    type: 'object',
    required: ['customerId', 'combos'],
    properties: {
      customerId: {
        type: 'string',
        examples: ['06045337050'],
        description: 'Identificador único do cliente'
      },
      combos: {
        type: 'array',
        description: 'Lista de combos que o cliente está comprando',
        items: {
          type: 'object',
          required: ['productsIds'],
          properties: {
            productsIds: {
              type: 'array',
              items: { type: 'number' },
              description: 'IDs dos produtos inclusos no combo'
            }
          }
        }
      }
    }
  },
  response: {
    201: {
      description: 'Pedido cadastrado com sucesso',
      type: 'object',
      properties: {
        id: { type: 'number' },
        customer: {
          type: 'object',
          properties: {
            cpf: { type: 'string' },
            name: { type: 'string' }
          }
        },
        combos: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              products: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id: { type: 'number' },
                    name: { type: 'string' },
                    price: { type: 'number' }
                  }
                }
              }
            }
          }
        },
        status: { type: 'string' },
        statusPayment: { type: 'string' },
        createdAt: { type: 'string' }
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
