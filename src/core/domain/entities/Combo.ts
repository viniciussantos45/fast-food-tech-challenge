import { Product } from './Product'

export class Combo {
  private id!: number
  private products: Product[]

  constructor(products: Product[] = []) {
    this.products = products
  }

  public getId(): number {
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
