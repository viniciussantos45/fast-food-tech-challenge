import { FastifySchema } from 'fastify'

export const createProductSchema: FastifySchema = {
  description: 'Cria um novo produto',
  tags: ['produtos'],
  body: {
    type: 'object',
    required: ['name', 'category', 'price', 'description', 'images'],
    properties: {
      name: {
        type: 'string',
        minLength: 2,
        errorMessage: {
          minLength: 'O nome do produto deve ter pelo menos 2 caracteres.'
        }
      },
      category: {
        type: 'string',
        errorMessage: {
          type: 'O campo categoria deve ser uma string.'
        }
      },
      price: {
        type: 'number',
        minimum: 0.01,
        errorMessage: {
          minimum: 'O preço do produto deve ser maior que zero.'
        }
      },
      description: {
        type: 'string',
        minLength: 10,
        errorMessage: {
          minLength: 'A descrição deve ter pelo menos 10 caracteres.'
        }
      },
      images: {
        type: 'array',
        minItems: 1,
        items: {
          type: 'string',
          format: 'uri',
          errorMessage: {
            format: 'Cada imagem deve ser uma URL válida.'
          }
        },
        errorMessage: {
          minItems: 'Deve haver pelo menos uma imagem do produto.'
        }
      }
    }
  },
  response: {
    201: {
      description: 'Produto criado com sucesso',
      type: 'object',
      properties: {
        id: { type: 'number' },
        name: { type: 'string' },
        category: { type: 'string' },
        price: { type: 'number' },
        description: { type: 'string' },
        images: {
          type: 'array',
          items: { type: 'string' }
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
