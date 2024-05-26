import { FastifyInstance } from 'fastify'

import { addProduct, listProducts } from '../controllers/ProductController'
import { createProductSchema } from '../schemas/CreateProduct'

export const productRoutes = (fastify: FastifyInstance) => {
  // POST /product
  fastify.post('/product', { schema: createProductSchema }, addProduct)
  fastify.post('/products', listProducts)
}
