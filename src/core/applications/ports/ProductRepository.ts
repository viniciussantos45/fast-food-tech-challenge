import { Product } from '../../domain/product/Product'

export interface ProductRepository {
  addProduct(product: Product): void
  editProduct(product: Product): void
  removeProduct(productId: string): void
}
