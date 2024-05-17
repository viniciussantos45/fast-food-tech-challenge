import { Product } from '../../domain/entities/Product'
import { ProductRepository } from '../ports/ProductRepository'

export class ProductService {
  private productRepository: ProductRepository

  constructor(productRepository: ProductRepository) {
    this.productRepository = productRepository
  }

  public addProduct(product: Product): void {
    // Add product logic here
    this.productRepository.addProduct(product)
  }

  public editProduct(product: Product): void {
    // Edit product logic here
    this.productRepository.editProduct(product)
  }

  public removeProduct(productId: string): void {
    // Remove product logic here
    this.productRepository.removeProduct(productId)
  }
}