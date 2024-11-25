import { Product } from '@/shared-kernel/entities/Product'
import { IProductRepository } from '@/shared-kernel/repositories/ProductRepository'
import { ProductCategory } from '@/shared-kernel/value-objects/ProductCategory'
import { ProductImage } from '@/shared-kernel/value-objects/ProductImage'

export class ProductUseCase {
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

  public async getProductsByCategory(category: ProductCategory): Promise<Product[]> {
    const products = await this.productRepository.getProductsByCategory(category.getValue())
    return products
  }
}
