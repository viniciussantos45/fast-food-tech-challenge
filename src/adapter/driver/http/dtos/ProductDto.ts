export class ProductCreateDto {
  name!: string
  category!: string
  price!: number
  description!: string
  images!: string[]
}

export class ProductEditDto {
  name?: string
  category?: string
  price?: number
  description?: string
  imagesUrl?: string[]
}
