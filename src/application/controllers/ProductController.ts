import { ProductUseCase } from '@/core/domain/use-cases/ProductUseCase'
import { ProductCategory } from '@/core/domain/value-objects/ProductCategory'
import { ProductRepository } from '@/infra/repositories/prisma/ProductRepository'
import { FastifyReply, FastifyRequest } from 'fastify'
import { ProductCreateDto, ProductEditDto } from '../dtos/ProductDto'

const productRepository = new ProductRepository()
const productUseCase = new ProductUseCase(productRepository)

export async function addProduct(request: FastifyRequest<{ Body: ProductCreateDto }>, reply: FastifyReply) {
  const { name, category: categoryPlainText, price, description, images } = request.body

  const category = new ProductCategory(categoryPlainText)

  const product = await productUseCase.addProduct({ name, category, price, description, imagesUrl: images })

  reply.status(201).send(product)
}

export async function editProduct(
  request: FastifyRequest<{ Body: ProductEditDto; Params: { id: string } }>,
  reply: FastifyReply
) {
  const data = request.body

  const productId = Number(request.params.id)

  await productUseCase.editProduct({ id: productId, ...data })

  reply.status(200).send()
}

export async function removeProduct(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
  const { id } = request.params

  await productUseCase.removeProduct(Number(id))

  reply.status(204).send()
}

export async function getProductsByCategory(request: FastifyRequest<{ Params: { category: string } }>, reply: FastifyReply) {
  const { category } = request.params

  const categoryValue = new ProductCategory(category)

  const products = await productUseCase.getProductsByCategory(categoryValue)

  reply.status(200).send(products)
}
