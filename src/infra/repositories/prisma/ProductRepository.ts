import { Product } from '@/shared-kernel/entities/Product'
import { IProductRepository } from '@/shared-kernel/repositories/ProductRepository'
import { ProductCategory } from '@/shared-kernel/value-objects/ProductCategory'
import { ProductImage } from '@/shared-kernel/value-objects/ProductImage'
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

  async getProductById(productId: number): Promise<Product | undefined> {
    const product = await this.prisma.product.findUnique({
      where: {
        id: productId
      },
      include: {
        images: true
      }
    })

    if (!product) {
      return
    }

    return new Product(
      product.id,
      product.name,
      new ProductCategory(product.category),
      product.price.toNumber(),
      product.description,
      product.images.map((image) => new ProductImage(image.url))
    )
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    const products = await this.prisma.product.findMany({
      where: {
        category
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
}
