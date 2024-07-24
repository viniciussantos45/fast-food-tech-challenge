import { Order } from '../domain/entities/Order'

export interface IOrderRepository {
  saveOrder(order: Order): Promise<Order>
  getOrderById(orderId: number): Promise<Order>
  removeOrder(orderId: number): Promise<void>
  listOrders(): Promise<Order[]>
}
