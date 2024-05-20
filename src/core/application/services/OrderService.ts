import { Order } from '../../domain/entities/Order'
import { OrderConfirmed, OrderCreated, OrderUpdated } from '../../domain/events/OrderEvents'
import { IOrderRepository } from '../ports/OrderRepository'

export class OrderService {
  private orderRepository: IOrderRepository

  constructor(orderRepository: IOrderRepository) {
    this.orderRepository = orderRepository
  }

  createOrder(): Order {
    const order = new Order()
    // Perform any additional logic or validations here
    const orderCreatedEvent = new OrderCreated(order)
    // Emit the order created event
    return order
  }

  updateOrder(order: Order): Order {
    // Perform any necessary updates to the order
    const orderUpdatedEvent = new OrderUpdated(order)
    // Emit the order updated event
    return order
  }

  confirmOrder(order: Order): Order {
    // Perform any necessary confirmation logic
    const orderConfirmedEvent = new OrderConfirmed(order)
    // Emit the order confirmed event
    return order
  }
}
