import Fastify from 'fastify'

import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'

import { registerRoutes } from './adapter/driver/http/routes'

import ajvErrors from 'ajv-errors'

const server = Fastify({
  ajv: {
    customOptions: {
      allErrors: true
    },
    plugins: [ajvErrors]
  },
  logger: true
})

server.setErrorHandler((error, request, reply) => {
  const statusCode = error.statusCode || 500
  const message = error.message || 'Unexpected error'

  // Log do erro para diagnóstico
  server.log.error(error)

  // Resposta de erro padronizada
  reply.status(statusCode).send(
    JSON.stringify({
      // TODO: Utilizar o método de serialização do fastify, pois esta retornando objeto vazio quando validado o schema
      success: false,
      code: statusCode,
      message: message,
      errors: error.validation || undefined // AJV errors, se houver
    })
  )
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
          {
            name: 'cliente',
            description: 'Endpoints que lidam com informações cliente'
          },
          {
            name: 'produtos',
            description: 'Endpoints que lidam com informações de produtos'
          },
          {
            name: 'pedido',
            description: 'Endpoints que lidam com informações de pedidos'
          }
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
