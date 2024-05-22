import { ProductCategory } from '@/core/domain/value-objects/ProductCategory'

export class ProductCreateDto {
  name!: string
  category!: ProductCategory
  price!: number
  description!: string
  images!: string[]
}
