import { Order } from '../../domain/entities/Order'

export interface IOrderRepository {
  saveOrder(order: Order): void
  getOrderById(orderId: string): Order | undefined
  removeOrder(orderId: string): void
}
