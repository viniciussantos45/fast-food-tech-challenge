import { PrismaClient } from '@prisma/client'

import { IProductRepository } from '@/core/application/ports/ProductRepository'
import { Product } from '@/core/domain/entities/Product'
import { ProductCategory } from '@/core/domain/value-objects/ProductCategory'
import { ProductImage } from '@/core/domain/value-objects/ProductImage'

export class ProductRepository implements IProductRepository {
  private prisma: PrismaClient

  constructor() {
    this.prisma = new PrismaClient()
  }

  async addProduct(product: Product): Promise<void> {
    await this.prisma.product.create({
      data: {
        name: product.getName(),
        category: product.getCategory().getValue(),
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
        category: product.getCategory().getValue(),
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

  async getProductsByIds(productIds: number[]): Promise<Product[]> {
    const products = await this.prisma.product.findMany({
      where: {
        id: {
          in: productIds
        }
      },
      include: {
        images: true
      }
    })

    return products.map((product) => {
      return new Product(
        product.id,
        product.name,
        new ProductCategory(product.category),
        product.price.toNumber(),
        product.description,
        product.images.map((image) => new ProductImage(image.url))
      )
    })
  }

  async listProducts(): Promise<Product[]> {
    const listOfProducts = await this.prisma.product.findMany({
      include: {
        images: true
      }
    })

    return listOfProducts.map((product) => {
      return new Product(
        product.id,
        product.name,
        new ProductCategory(product.category),
        product.price.toNumber(),
        product.description,
        product.images.map((image) => new ProductImage(image.url))
      )
    })
  }

  async listProductsByCategory(category: ProductCategory): Promise<Product[]> {
    const listOfProducts = await this.prisma.product.findMany({
      where: {
        category: category.getValue()
      },
      include: {
        images: true
      }
    })

    return listOfProducts.map((product) => {
      return new Product(
        product.id,
        product.name,
        new ProductCategory(product.category),
        product.price.toNumber(),
        product.description,
        product.images.map((image) => new ProductImage(image.url))
      )
    })
  }
}
