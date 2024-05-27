import Fastify from 'fastify'

import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'

import { registerRoutes } from './adapter/driver/http/routes'

const server = Fastify({
  ajv: {
    customOptions: {
      allErrors: true
    },
    plugins: [require('ajv-errors')]
  },
  logger: true
})

const start = async () => {
  try {
    await server.register(fastifySwagger, {
      openapi: {
        openapi: '3.0.3',
        info: {
          title: 'Fast food API Documentation',
          description: 'API documentation for the fast food application',
          version: '0.1.0'
        },
        servers: [
          {
            url: 'http://localhost:3000',
            description: 'Development server'
          }
        ],
        tags: [
          { name: 'customer', description: 'Customer related end-points' },
          { name: 'products', description: 'Products related end-points' },
          { name: 'order', description: 'Order related end-points' }
        ],
        components: {
          securitySchemes: {
            apiKey: {
              type: 'apiKey',
              name: 'apiKey',
              in: 'header'
            }
          }
        },
        externalDocs: {
          url: 'https://swagger.io',
          description: 'Find more info here'
        }
      }
    })

    await server.register(fastifySwaggerUi, {
      routePrefix: '/documentation',
      uiConfig: {
        docExpansion: 'full',
        deepLinking: false
      },
      uiHooks: {
        onRequest: function (request, reply, next) {
          next()
        },
        preHandler: function (request, reply, next) {
          next()
        }
      },
      staticCSP: true,
      transformStaticCSP: (header) => header,
      transformSpecification: (swaggerObject, request, reply) => {
        return swaggerObject
      },
      transformSpecificationClone: true
    })

    registerRoutes(server)

    server.listen(
      {
        port: 3000,
        host: '0.0.0.0'
      },
      function (err, address) {
        if (err) {
          server.log.error(err)
          process.exit(1)
        }
      }
    )
  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
}

start()
