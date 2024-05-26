import { FastifyReply, FastifyRequest } from 'fastify'

import { ProductRepository } from '@/adapter/driven/database/implementations/prisma/ProductRepository'
import { ProductService } from '@/core/application/services/ProductService'

import { ProductCreateDto } from '../dtos/ProductDto'

const productRepository = new ProductRepository()
const productService = new ProductService(productRepository)

export async function addProduct(request: FastifyRequest<{ Body: ProductCreateDto }>, reply: FastifyReply) {
  const { name, category, price, description, images } = request.body

  const product = await productService.addProduct({ name, category, price, description, imagesUrl: images })

  reply.status(201).send(product)
}
export async function listProducts(_request: FastifyRequest, reply: FastifyReply) {
  const product = await productService.listProducts()

  reply.status(201).send(product)
}
