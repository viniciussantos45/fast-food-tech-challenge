import { Entity, Fail, Ok, Result } from 'types-ddd'
import { Product } from './product'

type OrderProps = {
  products: Product[]
}

export class Order extends Entity<OrderProps> {
  private constructor(props: OrderProps) {
    super(props)
  }

  public static create(props: OrderProps): Result<Order> {
    if (props.products.length === 0) {
      return Fail('Order must have at least one product')
    }

    return Ok<Order>(new Order(props))
  }
}
