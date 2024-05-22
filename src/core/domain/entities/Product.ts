// src/domain/product/Product.ts

import { ProductCategory } from '../value-objects/ProductCategory'
import { ProductImage } from '../value-objects/ProductImage'

export class Product {
  private id: number | null
  private name: string
  private category: ProductCategory
  private price: number
  private description: string
  private images: ProductImage[]

  constructor(
    id: number | null,
    name: string,
    category: ProductCategory,
    price: number,
    description: string,
    images: ProductImage[]
  ) {
    this.id = id
    this.name = name
    this.category = category
    this.price = price
    this.description = description
    this.images = images
  }

  getId(): number | null {
    return this.id
  }

  setId(id: number): void {
    this.id = id
  }

  getName(): string {
    return this.name
  }

  setName(name: string): void {
    this.name = name
  }

  getCategory(): ProductCategory {
    return this.category
  }

  setCategory(category: ProductCategory): void {
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

  getImages(): ProductImage[] {
    return this.images
  }

  setImages(images: ProductImage[]): void {
    this.images = images
  }
}
