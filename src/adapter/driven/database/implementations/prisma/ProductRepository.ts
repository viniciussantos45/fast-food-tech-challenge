import { IProductRepository } from '@/core/application/ports/ProductRepository'
import { Product } from '@/core/domain/entities/Product'
import { PrismaClient } from '@prisma/client'

export class ProductRepository implements IProductRepository {
  private prisma: PrismaClient

  constructor() {
    this.prisma = new PrismaClient()
  }
  async addProduct(product: Product): Promise<void> {
    await this.prisma.product.create({
      data: {
        name: product.getName(),
        category: product.getCategory(),
        price: product.getPrice(),
        description: product.getDescription(),
        images: {
          create: product.getImages().map((image) => ({
            url: image.getURL()
          }))
        }
      }
    })
  }
  async editProduct(product: Product): Promise<void> {
    const productId = product.getId()

    if (!productId) {
      throw new Error('Product id is required')
    }

    await this.prisma.product.update({
      where: {
        id: productId
      },
      data: {
        name: product.getName(),
        category: product.getCategory(),
        price: product.getPrice(),
        description: product.getDescription(),
        images: {
          create: product.getImages().map((image) => ({
            url: image.getURL()
          }))
        }
      }
    })
  }
  async removeProduct(productId: number): Promise<void> {
    await this.prisma.product.delete({
      where: {
        id: productId
      }
    })
  }
}
