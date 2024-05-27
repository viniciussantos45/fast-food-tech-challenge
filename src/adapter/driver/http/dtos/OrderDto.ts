export class OrderCreateDto {
  customerId!: string
  combos!: {
    productsIds: number[]
  }[]
}
