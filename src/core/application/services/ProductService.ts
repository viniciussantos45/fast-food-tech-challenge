import { ProductCategory } from '@/core/domain/value-objects/ProductCategory'
import { ProductImage } from '@/core/domain/value-objects/ProductImage'
import { Product } from '../../domain/entities/Product'
import { IProductRepository } from '../ports/ProductRepository'

export class ProductService {
  private productRepository: IProductRepository

  constructor(productRepository: IProductRepository) {
    this.productRepository = productRepository
  }

  public async addProduct({
    name,
    category,
    description,
    imagesUrl,
    price
  }: {
    name: string
    category: ProductCategory
    description: string
    imagesUrl: string[]
    price: number
  }): Promise<void> {
    const images = imagesUrl.map((image) => new ProductImage(image))

    const product = new Product(null, name, category, price, description, images)

    await this.productRepository.addProduct(product)
  }

  public async editProduct({
    id,
    name,
    category,
    description,
    imagesUrl,
    price
  }: {
    id: number
    name?: string
    category?: string
    description?: string
    imagesUrl?: string[]
    price?: number
  }): Promise<void> {
    const product = await this.productRepository.getProductById(id)

    if (!product) {
      throw new Error('Product not found')
    }

    if (name) {
      product.setName(name)
    }

    if (category) {
      product.setCategory(new ProductCategory(category))
    }

    if (price) {
      product.setPrice(price)
    }

    if (description) {
      product.setDescription(description)
    }

    if (imagesUrl) {
      const images = imagesUrl.map((image) => new ProductImage(image))
      product.setImages(images)
    }

    await this.productRepository.editProduct(product)
  }

  public async removeProduct(productId: number): Promise<void> {
    // Remove product logic here
    await this.productRepository.removeProduct(productId)
  }

  public async getProductsByIds(productIds: number[]): Promise<Product[]> {
    const products = await this.productRepository.getProductsByIds(productIds)
    return products
  }
}
