import { Product } from '../../domain/entities/Product'

export interface ProductRepository {
  addProduct(product: Product): void
  editProduct(product: Product): void
  removeProduct(productId: string): void
}
