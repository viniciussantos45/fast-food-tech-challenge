import { Product } from '../../domain/entities/Product'

export interface IProductRepository {
  addProduct(product: Product): void
  editProduct(product: Product): void
  removeProduct(productId: string): void
}
