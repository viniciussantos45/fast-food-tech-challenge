import { FastifySchema } from 'fastify'

export const createProductSchema: FastifySchema = {
  description: 'Create a new product',
  tags: ['products'],
  body: {
    type: 'object',
    required: ['name', 'category', 'price', 'description', 'images'],
    properties: {
      name: { type: 'string' },
      category: { type: 'string' },
      price: { type: 'number' },
      description: { type: 'string' },
      images: { type: 'array', items: { type: 'string' } }
    }
  },
  response: {
    201: {
      description: 'Product created successfully',
      type: 'object',
      properties: {
        id: { type: 'number' },
        name: { type: 'string' },
        category: { type: 'string' },
        price: { type: 'number' },
        description: { type: 'string' },
        images: { type: 'array', items: { type: 'string' } }
      }
    }
  }
}
