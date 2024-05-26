export enum ProductCategoryEnum {
  FOOD = 'Lanche',
  ACCOMPANIMENT = 'Acompanhamento',
  DRINK = 'Bebida',
  DESSERT = 'Sobremesa'
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
