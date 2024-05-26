import { ProductCategory } from '@/core/domain/value-objects/ProductCategory'

import { Product } from '../../domain/entities/Product'

export interface IProductRepository {
  addProduct(product: Product): void
  editProduct(product: Product): void
  removeProduct(productId: number): void
  getProductsByIds(productIds: number[]): Promise<Product[]>
  listProducts(): Promise<Product[]>
  listProductsByCategory(category: ProductCategory): Promise<Product[]>
}
