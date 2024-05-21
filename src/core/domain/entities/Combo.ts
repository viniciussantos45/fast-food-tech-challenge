import { Product } from './Product'

export class Combo {
  private id: string
  private products: Product[]

  constructor(products: Product[] = []) {
    this.id = Math.random().toString(36).substr(2, 9)
    this.products = products
  }

  public getId(): string {
    return this.id
  }

  public addProduct(product: Product): void {
    this.products.push(product)
  }

  public removeProduct(product: Product): void {
    const index = this.products.findIndex((p) => p.getId() === product.getId())
    if (index !== -1) {
      this.products.splice(index, 1)
    }
  }
}
