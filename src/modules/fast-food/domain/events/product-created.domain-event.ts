import { Product } from '../entities/product'

export class ProductCreatedEvent {
  constructor(public readonly product: Product) {}
}
