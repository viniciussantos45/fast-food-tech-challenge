import { ComboUseCase } from '@/core/domain/use-cases/ComboUseCase'
import { ComboRepositoryMemory } from '@/infra/repositories/memory/ComboRepository'
import { Product } from '@/shared-kernel/entities/Product'
import { ProductCategory, ProductCategoryEnum } from '@/shared-kernel/value-objects/ProductCategory'
import { ProductImage } from '@/shared-kernel/value-objects/ProductImage'

import { describe, expect, it } from 'vitest'

const comboRepositoryMemory = new ComboRepositoryMemory()
const comboUseCase = new ComboUseCase(comboRepositoryMemory)

describe('Combo', () => {
  it('should return the ID of the combo', async () => {
    const products = [
      new Product(1, 'Product 1', new ProductCategory(ProductCategoryEnum.SANDWICH), 10.99, 'Description 1', [
        new ProductImage('https://example.com/image.jpg')
      ]),
      new Product(2, 'Product 2', new ProductCategory(ProductCategoryEnum.DRINK), 5.99, 'Description 2', [
        new ProductImage('https://example.com/image.jpg')
      ]),
      new Product(3, 'Product 3', new ProductCategory(ProductCategoryEnum.ACCOMPANIMENT), 7.99, 'Description 3', [
        new ProductImage('https://example.com/image.jpg')
      ])
    ]

    const comboId = await comboUseCase.saveCombo(products)

    expect(comboId).toBeDefined()
  })
})
