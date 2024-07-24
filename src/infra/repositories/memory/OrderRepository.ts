import { Order } from '@/core/domain/entities/Order'
import { IOrderRepository } from '@/core/repositories/OrderRepository'

export class OrderRepositoryMemory implements IOrderRepository {
  public orders: Order[] = []

  saveOrder(order: Order): Promise<Order> {
    this.orders.push(order)
    return Promise.resolve(order)
  }
  getOrderById(orderId: number): Promise<Order> {
    const order = this.orders.find((order) => order.getId() === orderId)
    return Promise.resolve(order) as Promise<Order>
  }
  removeOrder(orderId: number): Promise<void> {
    this.orders = this.orders.filter((order) => order.getId() !== orderId)
    return Promise.resolve()
  }

  listOrders(): Promise<Order[]> {
    return Promise.resolve(this.orders)
  }
}
