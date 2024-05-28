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
      description: 'Ordem criada com sucesso',
      type: 'object',
      properties: {
        id: { type: 'number', description: 'Identificador único da ordem' },
        customer: { type: 'string', description: 'Nome do cliente' },
        combos: {
          type: 'array',
          items: {
            type: 'object',
            required: ['id', 'name'],
            properties: {
              id: { type: 'number', description: 'Identificador único do combo' },
              name: { type: 'string', description: 'Nome do combo' }
            }
          }
        },
        statusPayment: {
          type: 'string',
          description: 'Status do pagamento',
          enum: ['pending', 'completed', 'failed'],
          default: 'pending'
        },
        status: {
          type: 'string',
          description: 'Status da ordem',
          enum: ['preparing', 'ready', 'delivered'],
          default: 'preparing'
        }
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
