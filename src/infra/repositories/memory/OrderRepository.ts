import { Order } from '@/core/domain/entities/Order'
import { OrderStatus } from '@/core/domain/value-objects/OrderStatus'
import { IOrderRepository } from '@/core/repositories/OrderRepository'

export class OrderRepositoryMemory implements IOrderRepository {
  public orders: Order[] = []

  async listOrdersFilteredAndSorted(filters: { status: OrderStatus }, sorted: Array<'createdAt'>): Promise<Order[]> {
    const filteredOrders = this.orders.filter((order) => order.getStatus() === filters.status)
    const sortedOrders = filteredOrders.sort((a, b) => {
      if (sorted[0] === 'createdAt') {
        return a.getCreatedAt().getTime() - b.getCreatedAt().getTime()
      }
      return 0
    })

    return Promise.resolve(sortedOrders)
  }

  listOrdersGroupedByStatus(): Promise<Record<OrderStatus, Order[]>> {
    const initialGroupedOrders = Object.values(OrderStatus).reduce(
      (acc, status) => {
        acc[status] = []
        return acc
      },
      {} as Record<OrderStatus, Order[]>
    )

    const groupedOrders = this.orders.reduce((acc, order) => {
      const status = order.getStatus()
      acc[status].push(order)
      return acc
    }, initialGroupedOrders)

    return Promise.resolve(groupedOrders)
  }

  updateOrder(order: Order): Promise<Order> {
    const updatedOrder = this.orders.find((o) => o.getId() === order.getId())
    if (!updatedOrder) {
      throw new Error('Order not found')
    }
    updatedOrder.setStatus(order.getStatus())
    updatedOrder.setStatusPayment(order.getStatusPayment())

    this.orders = this.orders.map((o) => (o.getId() === order.getId() ? updatedOrder : o))

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

  addPaymentGatewayId(orderId: number, gatewayId: string): Promise<void> {
    const order = this.orders.find((order) => order.getId() === orderId)
    if (!order) {
      throw new Error('Order not found')
    }
    order.setPaymentGatewayId(gatewayId)

    return Promise.resolve()
  }
}
