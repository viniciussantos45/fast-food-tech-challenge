import { Order } from '@/core/domain/entities/Order'
import { OrderRepository } from '../ports/OrderRepository'

export class OrderService {
  constructor(private orderRepository: OrderRepository) {}

  createOrder(order: Order): void {
    this.orderRepository.saveOrder(order)
  }

  getOrderById(orderId: string): Order | undefined {
    return this.orderRepository.getOrderById(orderId)
  }

  removeOrder(orderId: string): void {
    this.orderRepository.removeOrder(orderId)
  }
}
