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

    this.productRepository.addProduct(product)
  }

  public editProduct(product: Product): void {
    // Edit product logic here
    this.productRepository.editProduct(product)
  }

  public removeProduct(productId: number): void {
    // Remove product logic here
    this.productRepository.removeProduct(productId)
  }

  public async getProductsByIds(productIds: number[]): Promise<Product[]> {
    const products = await this.productRepository.getProductsByIds(productIds)
    return products
  }
}
