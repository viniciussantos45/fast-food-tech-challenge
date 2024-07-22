import { Product } from '@/core/domain/entities/Product'
import { IProductRepository } from '@/core/repositories/ProductRepository'

export class ProductRepositoryMemory implements IProductRepository {
  public products: Product[] = []

  public async addProduct(product: Product): Promise<Product | void> {
    const productExists = this.products.find((p) => p.getId() === product.getId())

    if (productExists) {
      return new Product(
        productExists.getId(),
        productExists.getName(),
        productExists.getCategory(),
        productExists.getPrice(),
        productExists.getDescription(),
        productExists.getImages()
      )
    }

    if (!product.getId()) {
      product.setId(this.products.length + 1)
    }

    this.products.push(product)
  }

  public async editProduct(product: Product): Promise<void> {
    const productIndex = this.products.findIndex((p) => p.getId() === product.getId())
    this.products[productIndex] = product
  }

  public async removeProduct(productId: number): Promise<void> {
    this.products = this.products.filter((p) => p.getId() !== productId)
  }

  public async getProductsByIds(productIds: number[]): Promise<Product[]> {
    return this.products.filter((product) => productIds.includes(product.getId() as number))
  }

  public async getProductById(productId: number): Promise<Product | undefined> {
    return this.products.find((product) => product.getId() === productId)
  }

  public async getProductsByCategory(category: string): Promise<Product[]> {
    return this.products.filter((product) => product.getCategory().getValue() === category)
  }
}
