import { ProductRepositoryMemory } from '@/adapter/driven/database/implementations/memory/ProductRepository'
import { ProductUseCase } from '@/core/domain/use-cases/ProductUseCase'
import { ProductCategory, ProductCategoryEnum } from '@/core/domain/value-objects/ProductCategory'
import { beforeAll, describe, expect, it } from 'vitest'

let productRepositoryMemory: ProductRepositoryMemory
let productUseCase: ProductUseCase

describe('Product', () => {
  beforeAll(() => {
    productRepositoryMemory = new ProductRepositoryMemory()
    productUseCase = new ProductUseCase(productRepositoryMemory)
  })

  it('should add a product', async () => {
    const product = {
      name: 'Product',
      category: new ProductCategory(ProductCategoryEnum.SANDWICH),
      price: 10,
      description: 'Description',
      imagesUrl: ['http://qdqwdqdw', 'https://adsasdqwdqwd']
    }

    productUseCase.addProduct(product)

    expect(productRepositoryMemory.products).toHaveLength(1)
    expect(productRepositoryMemory.products[0].getName()).toBe('Product')
    expect(productRepositoryMemory.products[0].getCategory().getValue()).toBe(ProductCategoryEnum.SANDWICH)
    expect(productRepositoryMemory.products[0].getPrice()).toBe(10)
  })

  it('should not add a product with invalid image URL', async () => {
    const product = {
      name: 'Product',
      category: new ProductCategory(ProductCategoryEnum.SANDWICH),
      price: 10,
      description: 'Description',
      imagesUrl: ['qdqwdqdw', 'https://adsasdqwdqwd']
    }

    await expect(productUseCase.addProduct(product)).rejects.toThrowError('Invalid image URL')

    expect(productRepositoryMemory.products).toHaveLength(1)
  })

  // it('should edit a product', async () => {})

  // it('should remove a product', async () => {})
})
