export class ProductImage {
  private value: string

  constructor(value: string) {
    if (!this.isValidURL(value)) {
      throw new Error('Invalid image URL')
    }
    this.value = value
  }

  public getURL(): string {
    return this.value
  }

  isValidURL(url: string): boolean {
    return url.startsWith('http://') || url.startsWith('https://')
  }
}
