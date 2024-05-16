import { Product } from '@/core/domain/product/Product'
import { ProductRepository } from '../ports/ProductRepository'

export class ProductService {
  constructor(private productRepository: ProductRepository) {}

  addProduct(product: Product): void {
    this.productRepository.addProduct(product)
  }

  editProduct(product: Product): void {
    this.productRepository.editProduct(product)
  }

  removeProduct(productId: string): void {
    this.productRepository.removeProduct(productId)
  }
}
