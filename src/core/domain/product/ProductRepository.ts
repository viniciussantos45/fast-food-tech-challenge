import { Product } from './Product';

export interface ProductRepository {
  addProduct(product: Product): void;
  editProduct(product: Product): void;
  removeProduct(productId: string): void;
}