import { Order } from '@/core/domain/entities/Order'
import { IOrderRepository } from '@/core/repositories/OrderRepository'

export class OrderRepositoryMemory implements IOrderRepository {
  public orders: Order[] = []

  updateOrder(order: Order): Promise<Order> {
    const updatedOrder = this.orders.find((o) => o.getId() === order.getId())
    if (!updatedOrder) {
      throw new Error('Order not found')
    }
    updatedOrder.setStatus(order.getStatus())
    updatedOrder.setStatusPayment(order.getStatusPayment())
    return Promise.resolve(updatedOrder)
  }

  saveOrder(order: Order): Promise<Order> {
    const id = this.orders.length + 1
    order.setId(id)
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
