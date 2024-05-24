import { IOrderRepository } from '@/core/application/ports/OrderRepository'
import { Order } from '@/core/domain/entities/Order'

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
}
