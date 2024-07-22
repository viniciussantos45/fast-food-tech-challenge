import { Product } from '../domain/entities/Product'

export interface IProductRepository {
  addProduct(product: Product): Promise<Product | void>
  editProduct(product: Product): Promise<void>
  removeProduct(productId: number): Promise<void>
  getProductsByIds(productIds: number[]): Promise<Product[]>
  getProductById(productId: number): Promise<Product | undefined>
  getProductsByCategory(category: string): Promise<Product[]>
}
