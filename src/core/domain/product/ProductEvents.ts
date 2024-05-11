// File: /project-root/src/domain/product/ProductEvents.ts

import { Product } from "./Product";

// Event emitted when a product is registered
export class ProductRegistered {
  constructor(public readonly product: Product) {}
}

// Event emitted when a product is edited
export class ProductEdited {
  constructor(public readonly product: Product) {}
}

// Event emitted when a product is removed
export class ProductRemoved {
  constructor(public readonly productId: string) {}
}
