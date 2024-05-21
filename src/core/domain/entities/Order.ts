import { Combo } from './Combo'
import { Product } from './Product'

export class Order {
  private products: Product[]
  private combos: Combo[]

  constructor() {
    this.products = []
    this.combos = []
  }

  public addProduct(product: Product): void {
    this.products.push(product)
  }

  public addCombo(combo: Combo): void {
    this.combos.push(combo)
  }
}
