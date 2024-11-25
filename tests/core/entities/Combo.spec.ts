import { Combo } from '@/shared-kernel/entities/Combo'
import { Product } from '@/shared-kernel/entities/Product'
import { ProductCategory, ProductCategoryEnum } from '@/shared-kernel/value-objects/ProductCategory'
import { ProductImage } from '@/shared-kernel/value-objects/ProductImage'
import { describe, expect, it } from 'vitest'

describe('Combo Entity', () => {
  it('should add a product to a combo', () => {
    const combo = new Combo()
    const product = new Product(1, 'Product 1', new ProductCategory(ProductCategoryEnum.SANDWICH), 10.99, 'Description 1', [
      new ProductImage('https://example.com/image.jpg')
    ])

    combo.addProduct(product)

    expect(combo.getProducts()).toContain(product)
  })

  it('should remove a product from a combo', () => {
    const combo = new Combo()
    const product = new Product(1, 'Product 1', new ProductCategory(ProductCategoryEnum.SANDWICH), 10.99, 'Description 1', [
      new ProductImage('https://example.com/image.jpg')
    ])
    combo.addProduct(product)

    combo.removeProduct(product)

    expect(combo.getProducts()).not.toContain(product)
  })
})
