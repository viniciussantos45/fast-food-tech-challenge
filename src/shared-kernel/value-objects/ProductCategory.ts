export enum ProductCategoryEnum {
  SANDWICH = 'sandwich',
  DRINK = 'drink',
  ACCOMPANIMENT = 'accompaniment',
  DESSERT = 'dessert'
}

export class ProductCategory {
  private value: string

  constructor(value: string) {
    if (!Object.values(ProductCategoryEnum).includes(value as ProductCategoryEnum)) {
      throw new Error('Invalid category')
    }

    this.value = value
  }

  getValue(): string {
    return this.value
  }
}
