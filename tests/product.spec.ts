import { ProductRepositoryMemory } from '@/adapter/driven/database/implementations/memory/ProductRepository'
import { ProductService } from '@/core/application/services/ProductService'
import { ProductCategory, ProductCategoryEnum } from '@/core/domain/value-objects/ProductCategory'
import { beforeAll, describe, expect, it } from 'vitest'

let productRepositoryMemory: ProductRepositoryMemory
let productService: ProductService

describe('Product', () => {
  beforeAll(() => {
    productRepositoryMemory = new ProductRepositoryMemory()
    productService = new ProductService(productRepositoryMemory)
  })

  it('should add a product', async () => {
    const product = {
      name: 'Product',
      category: new ProductCategory(ProductCategoryEnum.FOOD),
      price: 10,
      description: 'Description',
      imagesUrl: ['http://qdqwdqdw', 'https://adsasdqwdqwd']
    }

    productService.addProduct(product)

    expect(productRepositoryMemory.products).toHaveLength(1)
    expect(productRepositoryMemory.products[0].getName()).toBe('Product')
    expect(productRepositoryMemory.products[0].getCategory().getValue()).toBe(ProductCategoryEnum.FOOD)
    expect(productRepositoryMemory.products[0].getPrice()).toBe(10)
  })

  it('should not add a product with invalid image URL', async () => {
    const product = {
      name: 'Product',
      category: new ProductCategory(ProductCategoryEnum.FOOD),
      price: 10,
      description: 'Description',
      imagesUrl: ['qdqwdqdw', 'https://adsasdqwdqwd']
    }

    await expect(productService.addProduct(product)).rejects.toThrowError('Invalid image URL')

    expect(productRepositoryMemory.products).toHaveLength(1)
  })

  // it('should edit a product', async () => {})

  // it('should remove a product', async () => {})
})
