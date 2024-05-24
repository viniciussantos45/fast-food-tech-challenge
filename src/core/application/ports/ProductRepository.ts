import { Product } from '../../domain/entities/Product'

export interface IProductRepository {
  addProduct(product: Product): void
  editProduct(product: Product): void
  removeProduct(productId: number): void
  getProductsByIds(productIds: number[]): Promise<Product[]>
}
