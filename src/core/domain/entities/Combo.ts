import { Product } from './Product'

export class Combo {
  private id!: number | null
  private products: Product[]

  constructor(products: Product[] = []) {
    this.products = products
  }

  public getId(): number | null {
    return this.id
  }

  public getProductsIds(): number[] {
    return this.products.map((product) => product.getId()).filter((id) => id !== null) as number[]
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
