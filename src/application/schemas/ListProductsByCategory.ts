import { ProductCategoryEnum } from '@/shared-kernel/value-objects/ProductCategory'

export const getProductsByCategorySchema = {
  description: 'Lista todos os produtos de uma categoria',
  tags: ['produtos'],
  params: {
    type: 'object',
    properties: {
      category: {
        type: 'string',
        description: 'Nome da categoria',
        enum: Object.values(ProductCategoryEnum)
      }
    }
  }
}
