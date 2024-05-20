import { FastifyInstance } from 'fastify'

import { customerRoutes } from './CustomerRoutes'

export const registerRoutes = (fastify: FastifyInstance): void => {
  customerRoutes(fastify)
}
