import { Order } from '../../domain/entities/Order'

export interface OrderRepository {
  saveOrder(order: Order): void
  getOrderById(orderId: string): Order | undefined
  removeOrder(orderId: string): void
}
