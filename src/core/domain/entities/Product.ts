// src/domain/product/Product.ts

export class Product {
  private id: string
  private category: string
  private price: number
  private description: string
  private images: string[]

  constructor(category: string, price: number, description: string, images: string[]) {
    this.id = Math.random().toString(36).substr(2, 9)
    this.category = category
    this.price = price
    this.description = description
    this.images = images
  }

  getId(): string {
    return this.id
  }

  setId(id: string): void {
    this.id = id
  }

  getCategory(): string {
    return this.category
  }

  setCategory(category: string): void {
    this.category = category
  }

  getPrice(): number {
    return this.price
  }

  setPrice(price: number): void {
    this.price = price
  }

  getDescription(): string {
    return this.description
  }

  setDescription(description: string): void {
    this.description = description
  }

  getImages(): string[] {
    return this.images
  }

  setImages(images: string[]): void {
    this.images = images
  }
}
