import { FastifyReply, FastifyRequest } from 'fastify'
import { ComboSaveDto } from '../dtos/ComboDto'
import { ComboRepository } from '@/adapter/driven/database/implementations/prisma/ComboRepository'
import { ComboService } from '@/core/application/services/ComboService'
import { Product } from '@/core/domain/entities/Product'
import { ProductImage } from '@/core/domain/value-objects/ProductImage'

const comboRepository = new ComboRepository()
const comboService = new ComboService(comboRepository)

export async function saveCombo(request: FastifyRequest<{ Body: ComboSaveDto }>, reply: FastifyReply) {
  const { name, category, price, description, images } = request.body
  const imagesVO = images.map((image) => new ProductImage(image))
  
  const product = new Product(null, name, category, price, description, imagesVO)
  const combo = comboService.saveCombo([product])

  reply.status(201).send(combo)
}
