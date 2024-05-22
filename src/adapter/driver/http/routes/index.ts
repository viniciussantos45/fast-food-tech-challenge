import { FastifyInstance } from 'fastify'

import { customerRoutes } from './CustomerRoutes'
import { productRoutes } from './ProductRoutes'

export const registerRoutes = (fastify: FastifyInstance): void => {
  customerRoutes(fastify)
  productRoutes(fastify)
}
