import { Order } from '@/core/domain/entities/Order'

export interface IOrderRepository {
  saveOrder(order: Order): Promise<Order>
  getOrderById(orderId: number): Promise<Order>
  listOrders(): Promise<Order[]>
  removeOrder(orderId: number): Promise<void>
  updateOrderStatus(order: Order): Promise<Order>
}
