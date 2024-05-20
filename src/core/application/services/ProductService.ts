import { Product } from '../../domain/entities/Product'
import { IProductRepository } from '../ports/ProductRepository'

export class ProductService {
  private productRepository: IProductRepository

  constructor(productRepository: IProductRepository) {
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
